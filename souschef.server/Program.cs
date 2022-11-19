using SousChef.Data;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddEntityFrameworkNpgsql().AddDbContext<PostGresDBContext>(opt =>
        opt.UseNpgsql(builder.Configuration.GetConnectionString("DbConnection")));

builder.Services.AddIdentityCore<ApplicationUser>()
                .AddEntityFrameworkStores<PostGresDBContext>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    using(var scope = app.Services.CreateScope())
    {
        var salesContext = scope.ServiceProvider.GetRequiredService<PostGresDBContext>();
        salesContext.Database.Migrate();
        //salesContext.Seed();
    }
}


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();