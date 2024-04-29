namespace Recrutech_api.Helpers
{
    public static class CollectionExtensions
    {
        public static IQueryable<T> If<T>(this IQueryable<T> items, bool state,
            Func<IQueryable<T>, IQueryable<T>> func) =>
            state ? func(items) : items;
    }
}
