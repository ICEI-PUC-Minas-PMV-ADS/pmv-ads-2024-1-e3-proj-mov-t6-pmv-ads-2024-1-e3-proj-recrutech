using System.Text.Json.Serialization;

namespace Recrutech_api.Model
{
    public class Curriculum : DeletableItem
    {
        public int Id { get; set; }
        public string? About { get; set; }
        public string[]? Tecnologies { get; set; }
        public string? Linkedin { get; set; }
        public string? Github { get; set; }
        public List<Course>? Course { get; set; }
        public List<Experience>? Experience { get; set; }

        public int? UserId { get; set; }
        public User? User { get; set; }

        public List<Vacancy>? Vacancies { get; set; }
    }
}
