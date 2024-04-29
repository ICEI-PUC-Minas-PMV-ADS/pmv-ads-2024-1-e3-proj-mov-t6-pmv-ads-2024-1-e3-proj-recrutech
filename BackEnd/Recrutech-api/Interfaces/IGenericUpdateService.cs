using Microsoft.AspNetCore.JsonPatch;

namespace Recrutech_api.Interfaces
{
    public interface IGenericUpdateService
    {
        public Task<bool> UpdateObject<T>(JsonPatchDocument<T> jsonPatchObject, T contextObject, long id, Microsoft.AspNetCore.Mvc.ModelBinding.ModelStateDictionary modelState) where T : class;
    }
}
