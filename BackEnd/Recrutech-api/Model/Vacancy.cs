using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Recrutech_api.Model
{
    public class Vacancy : DeletableItem
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public float Remuneration { get; set; }
        public string? Enterprise { get; set; }
        public string? Location { get; set; }
        public string? Content { get; set; }
        public string[]? Requirements { get; set; }
        public string[]? Benefits { get; set; }
        public string? Link { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public EContract? Contract { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public ECargo? Cargo { get; set; }
        public int? UserId { get; set; }
        public User? User { get; set; }
        public List<Curriculum>? Cvs { get; set; }
    }

    public enum EContract
    {
        InOffice = 1,
        Remote ,
        Hibryd 
    }

    public enum ECargo
    {
        Estagio = 1,
        Junior ,
        Pleno ,
        Senior 
    }
}
