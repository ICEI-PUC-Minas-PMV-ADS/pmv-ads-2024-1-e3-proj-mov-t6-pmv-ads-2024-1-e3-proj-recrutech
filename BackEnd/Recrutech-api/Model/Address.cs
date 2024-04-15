using System.Text.Json.Serialization;

namespace Recrutech_api.Model
{
    public class Address
    {
        [JsonIgnore]
        public int Id { get; set; }
        public string? Cep { get; set; }
        public string? Logradouro { get; set; }
        public string? Complemento { get; set; }
        public string? Bairro { get; set; }
        public string? Localidade { get; set; }
        public string? UF { get; set; }
        public string? Ibge { get; set; }
        public string? Gia { get; set; }
        public string? Siafi { get; set; }
        [JsonIgnore]
        public int? UserId { get; set; }
        [JsonIgnore]
        public User? User { get; set; }

    }
}
