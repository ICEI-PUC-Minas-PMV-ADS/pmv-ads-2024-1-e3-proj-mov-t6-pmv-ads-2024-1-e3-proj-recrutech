using System.Text.Json.Serialization;

namespace Recrutech_api.Model
{
    public class Vacancy
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Remuneration { get; set; }
        public string? Enterprise { get; set; }
        public string? Location { get; set; }
        public string? Content { get; set; }
        public string[]? Requirements { get; set; }
        public string[]? Benefits { get; set; }
        public string? Link { get; set; }
        public EContract? Contract { get; set; }

        [JsonIgnore]
        public int? UserId { get; set; }
        [JsonIgnore]
        public User? User { get; set; }

        [JsonIgnore]
        public ICollection<Curriculum>? Cvs { get; set; }
    }

    public enum EContract
    {
        InOffice ,
        Remote ,
        Hibryd 
    }
}
