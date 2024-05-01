using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NPOI.OpenXmlFormats.Encryption;
using Recrutech_api.Interfaces;
using Recrutech_api.Model;

namespace Recrutech_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CvController : ControllerBase
    {
        private readonly recrutechDbContext _context; 
        private readonly IGenericUpdateService _GenericUpdateService;

        public CvController(recrutechDbContext context, IGenericUpdateService GenericUpdateService)
        {
            _context = context;
            _GenericUpdateService = GenericUpdateService;
        }

        [HttpGet("GetCvByUserId/{userId}")]
        public async Task<ActionResult<IEnumerable<Curriculum>>> GetCvByUserId(int? userId)
        {
          if (userId == null) return NotFound("Por favor, forneça um ID de usuário válido");
          if (await _context.GetAllUsers.FirstOrDefaultAsync(x => x.Id == userId) == null) return NotFound("Usuário não encontrado na base de dados");
          Curriculum cv = await _context.GetAllCvs.Where(x => x.UserId == userId).FirstOrDefaultAsync();
          if (cv == null) return Ok("Usuário não possui curriculo cadastrado");
           return Ok(cv);
        }

        [HttpGet("GetCvsByVacancyId/{vacancyId}")]
        public async Task<ActionResult<IEnumerable<List<Curriculum>>>> GetCvsByVacancyId(int? vacancyId)
        {
            if (vacancyId == null) return NotFound("Por favor, forneça um ID de vagas válido");
            if (await _context.GetAllVacancies.FirstOrDefaultAsync(x => x.Id == vacancyId) == null) return NotFound("Vaga não encontrada na base de dados");
            List<Curriculum> cvList = await _context.GetAllCvs.Where(x => x.Vacancies.Any(x => x.Id == vacancyId )).ToListAsync();
            if (cvList == null) return Ok("Vaga não possui curriculos cadastrados");

            return Ok(cvList);
        }

        // POST: api/Cv
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("CreateCv")]
        public async Task<ActionResult<Curriculum>> CreateCv([FromBody]Curriculum curriculum)
        {

            User user = await _context.GetAllUsers.FirstOrDefaultAsync(x => x.Id == curriculum.UserId);
            if (user == null) return BadRequest("Usuário não existe na base de dados");
            else if (user.Curriculum != null) return BadRequest("Usuário ja possui curriculo cadastrado");
            curriculum.User = user; 
            _context.Cvs.Add(curriculum);
            await _context.SaveChangesAsync();

            return Ok(curriculum);
        }

        [HttpPatch("UpdateCv/{cvId}")]
        public async Task<IActionResult> UpdateCv(int cvId, [FromBody] JsonPatchDocument<Curriculum> updateCv)
        {
            Curriculum cvContext = await _context.GetAllCvs.FirstOrDefaultAsync(x => x.Id == cvId);
            await _GenericUpdateService.UpdateObject(updateCv, cvContext, cvId, ModelState);
            return Ok(cvContext);
        }
    }
}
