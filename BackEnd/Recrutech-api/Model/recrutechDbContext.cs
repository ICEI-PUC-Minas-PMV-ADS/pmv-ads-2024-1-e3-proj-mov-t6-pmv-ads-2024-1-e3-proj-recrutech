using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace Recrutech_api.Model
{
    public class recrutechDbContext : DbContext
    {
        public recrutechDbContext()
        {
        }

        public recrutechDbContext(DbContextOptions<recrutechDbContext> options)
            : base(options)
        {
        }
        public virtual DbSet<Curriculum> Cvs { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;
        public virtual DbSet<Vacancy> Vacancies { get; set; } = null!;
        public virtual DbSet<Address> Addresses { get; set; } = null!;
        public virtual DbSet<Recommendation> Recomendations { get; set; } = null!;
        public virtual DbSet<UserRecommendation> UserRecomendations { get; set; } = null!;
        public virtual DbSet<Course> Courses { get; set; } = null!;
        public virtual DbSet<Experience> Experiences { get; set; } = null!;


    }
}
