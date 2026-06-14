using System.Diagnostics;
using Serilog.Context;

namespace Backend.Monitoring;

public class TracingMiddleware(RequestDelegate next, ILogger<TracingMiddleware> logger)
{
    // Header name used by Traefik / common load balancers for distributed tracing.
    private const string TraceHeader = "X-Request-ID";

    public async Task InvokeAsync(HttpContext context)
    {
        // 1. Resolve or create traceId
        var traceId = context.Request.Headers[TraceHeader].FirstOrDefault()
             ?? Activity.Current?.Id
             ?? context.TraceIdentifier;

        // Echo traceId back so callers can correlate client-side errors with logs.
        context.Response.Headers[TraceHeader] = traceId;

        // 2. Resolve userId (empty string if unauthenticated)
        var userId = context.User?.FindFirst("sub")?.Value
                  ?? context.User?.Identity?.Name
                  ?? "anonymous";

        // Normalise endpoint — use route template to keep Prometheus cardinality low.
        var endpoint = GetEndpointTemplate(context);

        var sw = Stopwatch.StartNew();

        // Push to Serilog
        using (LogContext.PushProperty("traceId", traceId))
        using (LogContext.PushProperty("userId",  userId))
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                sw.Stop();
                AppMetrics.UnhandledExceptions
                    .WithLabels(ex.GetType().Name)
                    .Inc();

                logger.LogError(ex,
                    "Unhandled exception on {Method} {Endpoint} after {DurationMs} ms",
                    context.Request.Method,
                    endpoint,
                    sw.ElapsedMilliseconds);

                throw;
            }
            finally
            {
                sw.Stop();
                var status = context.Response.StatusCode.ToString();

                // 3. Record Prometheus metrics
                AppMetrics.HttpRequests
                    .WithLabels(context.Request.Method, endpoint, status)
                    .Inc();

                AppMetrics.HttpDuration
                    .WithLabels(context.Request.Method, endpoint)
                    .Observe(sw.Elapsed.TotalSeconds);

                // 4. Emit structured request log
                var statusCode = context.Response.StatusCode;
                var logLevel = statusCode >= 500 ? LogLevel.Error
                             : statusCode >= 400 ? LogLevel.Warning
                             : LogLevel.Information;

                logger.Log(logLevel,
                    "{Method} {Endpoint} → {StatusCode} in {DurationMs} ms",
                    context.Request.Method,
                    endpoint,
                    statusCode,
                    sw.ElapsedMilliseconds);
            }
        }
    }


    private static string GetEndpointTemplate(HttpContext context)
    {
        var endpoint = context.GetEndpoint();
        if (endpoint is RouteEndpoint routeEndpoint)
            return "/" + routeEndpoint.RoutePattern.RawText?.TrimStart('/');

        return context.Request.Path.Value ?? "/";
    }
}