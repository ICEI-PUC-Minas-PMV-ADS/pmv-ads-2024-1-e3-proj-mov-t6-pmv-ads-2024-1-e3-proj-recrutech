namespace Recrutech_api.Model
{
    public class Period : DeletableItem
    {
        public DateTimeOffset? StartDate { get; set; }
        public DateTimeOffset? EndDate { get; set; }
    }
}
