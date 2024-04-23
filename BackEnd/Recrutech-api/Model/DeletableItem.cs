using System.Text.Json.Serialization;

namespace Recrutech_api.Model
{
    public class DeletableItem
    {
        [JsonIgnore]
        public bool IsActive { get; set; } = true;
    }
}
