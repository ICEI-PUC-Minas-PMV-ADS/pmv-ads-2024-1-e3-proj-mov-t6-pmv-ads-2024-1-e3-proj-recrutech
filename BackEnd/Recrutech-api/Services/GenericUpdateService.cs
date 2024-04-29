using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Recrutech_api.Interfaces;
using Recrutech_api.Model;

namespace Recrutech_api.Implementations
{
    public class GenericUpdateService : IGenericUpdateService
    {
        private readonly recrutechDbContext _context;
        public GenericUpdateService(recrutechDbContext context)
        {
            _context = context;

        }
        public async Task<bool> UpdateObject<T>(JsonPatchDocument<T> jsonPatchObject, T contextObject, long id, Microsoft.AspNetCore.Mvc.ModelBinding.ModelStateDictionary modelState) where T : class
        {

            jsonPatchObject.ApplyTo(contextObject, modelState);
            _context.Entry(contextObject).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                throw new Exception();
            }

        }
      }
    }
