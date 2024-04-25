using System.Text.Json.Serialization;

namespace Recrutech_api.Model
{
    public class User : DeletableItem
    {
        public int Id { get; set; }
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
        public bool? IsRecruiter { get; set; }
        public long? AddressId { get; set; }
        public Curriculum? Curriculum { get; set; }
        public Address? Address { get; set; }
        public List<Vacancy>? VacanciesOwner { get; set; }
        public List<UserRecommendation>? UserRecommendations { get; set; }

    }
}


