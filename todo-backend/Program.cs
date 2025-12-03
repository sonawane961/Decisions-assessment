using Microsoft.Extensions.Options;
using TodoApi.Models;
using TodoApi.Services;
using TodoApi.Middlewares;

var builder = WebApplication.CreateBuilder(args);

// ---- Bind MongoDB Settings ----
builder.Services.Configure<TodoDatabaseSettings>(
    builder.Configuration.GetSection("TodoDatabase"));

// ---- Add Services ----
builder.Services.AddSingleton<TodoService>();

// ---- CORS ----
// Recommended: restrict to your React dev server origin for security.
// Change the URL below if your frontend runs on a different origin.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173") // <-- React dev server
              .AllowAnyMethod()
              .AllowAnyHeader();
        // .AllowCredentials(); // enable only if you need cookies/auth with credentials
    });

    // If you want a very permissive policy (not recommended for production), use:
    // options.AddPolicy("AllowAll", p => p.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

// ---- Add Controllers & Swagger ----
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// ---- Global Exception Middleware ----
app.UseMiddleware<GlobalExceptionHandler>();

// ---- Enable CORS (must be before UseAuthorization / MapControllers) ----
app.UseCors("AllowFrontend");


// ---- Swagger UI (only in Development by default) ----
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
