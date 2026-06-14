using Prometheus;

namespace Backend.Monitoring;

public static class AppMetrics
{
    public static readonly Counter HttpRequests = Metrics
        .CreateCounter("http_requests_total",
            "Total number of HTTP requests.",
            new CounterConfiguration
            {
                LabelNames = new[] { "method", "endpoint", "status_code" }
            });

    public static readonly Histogram HttpDuration = Metrics
        .CreateHistogram("http_request_duration_seconds",
            "HTTP request duration in seconds.",
            new HistogramConfiguration
            {
                LabelNames = new[] { "method", "endpoint" },
                // Buckets tuned for a web API: 10 ms → 2 s
                Buckets = new[] { 0.010, 0.025, 0.050, 0.100, 0.250, 0.500, 1.0, 2.0 }
            });

    public static readonly Gauge ActiveAthletes = Metrics
        .CreateGauge("active_athletes_total",
            "Current number of active athletes in the platform.");

    public static readonly Gauge ActiveSponsorships = Metrics
        .CreateGauge("active_sponsorships_total",
            "Current number of active sponsorship relationships.");

    public static readonly Counter SponsorshipsCreated = Metrics
        .CreateCounter("sponsorships_created_total",
            "Total sponsorships created since the service started.");

    public static readonly Counter AthleteRegistrations = Metrics
        .CreateCounter("athlete_registrations_total",
            "Total athlete registrations since the service started.");

    public static readonly Counter UnhandledExceptions = Metrics
        .CreateCounter("unhandled_exceptions_total",
            "Total unhandled exceptions.",
            new CounterConfiguration
            {
                LabelNames = new[] { "exception_type" }
            });
}