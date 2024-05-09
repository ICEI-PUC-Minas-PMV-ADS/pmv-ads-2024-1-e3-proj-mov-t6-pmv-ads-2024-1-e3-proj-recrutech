using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;
using Recrutech_api.Implementations;
using Recrutech_api.Interfaces;
using Recrutech_api.Model;
using System.Text.Json.Serialization;

namespace Recrutech_api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));

            builder.Services.AddEntityFrameworkNpgsql()
                     .AddDbContext<recrutechDbContext>(options =>
                       options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

            builder.Services.AddControllers(options =>
            {
                options.InputFormatters.Insert(0, MyJPIF.GetJsonPatchInputFormatter());

            }).AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;

            });

     
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddTransient<IGenericUpdateService, GenericUpdateService>();
            var app = builder.Build();

            app.UseCors(policy =>
            {
                policy.WithOrigins("http://localhost:8081")
                      .AllowAnyMethod()
                      .AllowAnyHeader();
            });


            app.UseSwagger();
                app.UseSwaggerUI();

                        if (app.Environment.IsDevelopment())
                    {
                        app.UseSwagger();
                        app.UseSwaggerUI();
                    };

            app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}