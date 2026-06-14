using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace backend.Infrastructure.Exceptions;

public class GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger) : IExceptionHandler
{
	public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
	{
		logger.LogError(exception, "Exception occurred: {Message}", exception.Message);

		// Customize the response based on the exception type
		var problemDetails = new ProblemDetails
		{
			Status = StatusCodes.Status500InternalServerError, // Default to 500 for unhandled exceptions
			Title = "Server Error",
			Detail = exception.Message
		};

		// Handle specific exception types
		if (exception is KeyNotFoundException)
		{
    		problemDetails.Status = StatusCodes.Status404NotFound; //
    		problemDetails.Title = "Not Found";
		}

		else if (exception is BadHttpRequestException badRequestEx)
    	{
        	problemDetails.Status = badRequestEx.StatusCode;
        	problemDetails.Title = "Bad Request";
    	}

		// If you use FluentValidation and it throws a ValidationException
		else if (exception is FluentValidation.ValidationException fluentException)
		{
			problemDetails.Status = StatusCodes.Status400BadRequest;
			problemDetails.Title = "Validation Error";
			// React wants dictionary of errors in the format { "fieldName": ["error1", "error2"] }
			problemDetails.Extensions["errors"] = fluentException.Errors
				.GroupBy(e => e.PropertyName)
				.ToDictionary(
					g => g.Key,
					g => g.Select(x => x.ErrorMessage).ToArray()
				);
		}

		httpContext.Response.StatusCode = problemDetails.Status.Value;

		await httpContext.Response.WriteAsJsonAsync(problemDetails, cancellationToken);

		return true;
	}
}