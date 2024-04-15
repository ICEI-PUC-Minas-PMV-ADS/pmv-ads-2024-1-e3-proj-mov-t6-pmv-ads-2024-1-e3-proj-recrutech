using System.Text.Json.Serialization;

namespace Recrutech_api.Model
{
    public class Curriculum
    {
        public int Id { get; set; }
        public string? About { get; set; }
        public string[]? Tecnologies { get; set; }
        public string? Linkedin { get; set; }
        public string? Github { get; set; }
        public ICollection<Course>? Course { get; set; }
        public ICollection<Experience>? Experience { get; set; }

        [JsonIgnore]
        public int? UserId { get; set; }
        [JsonIgnore]
        public User? User { get; set; }

        [JsonIgnore]
        public ICollection<Vacancy>? Vacancies { get; set; }
    }
}
