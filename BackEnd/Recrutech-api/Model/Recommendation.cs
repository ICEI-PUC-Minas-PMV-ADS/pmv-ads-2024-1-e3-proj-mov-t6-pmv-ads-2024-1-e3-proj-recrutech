using System.Text.Json.Serialization;

namespace Recrutech_api.Model
{
    public class Recommendation : DeletableItem
    {
        public int Id { get; set; }
        public string? Description { get; set; }
        public List<UserRecommendation>? UserRecommendations { get; set; }
    }
}

