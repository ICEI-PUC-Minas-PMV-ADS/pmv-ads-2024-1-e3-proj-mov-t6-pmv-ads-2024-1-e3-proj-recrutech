using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Recrutech_api.Model;

namespace Recrutech_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly recrutechDbContext _context;
        private readonly IConfiguration _configuration;

        public UsersController(recrutechDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPatch("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {

            var userContext = await _context.Users.FindAsync(user.Id);

            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(userContext).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }

        [HttpPost("Login")]
        public async Task<ActionResult<User>> Login([FromBody] UserLoginRequest request)
        {
            if (string.IsNullOrEmpty(request?.Email) || string.IsNullOrEmpty(request.Senha))
            {
                return BadRequest("Preencha todos os campos");
            }

            User user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email && u.Password == request.Senha);
            if (user == null)
            {
                return BadRequest("Nome de usuário ou senha incorretos");
            }

            return Ok(user);
        }

        [HttpPost("LoginWithAuth")]
        public async Task<ActionResult<AuthToken>> LoginReturnToken([FromBody] UserLoginRequest request)
        {
            if (string.IsNullOrEmpty(request?.Email) || string.IsNullOrEmpty(request.Senha))
            {
                return BadRequest("Preencha todos os campos");
            }

            User user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email && u.Password == request.Senha);
            if (user == null)
            {
                return BadRequest("Nome de usuário ou senha incorretos");
            }

            return new AuthToken { Token = GenerateToken(user.Id, user.Email) };


        }

        public class UserLoginRequest
        {
            public string Email { get; set; }
            public string Senha { get; set; }
        }

        private string GenerateToken(long Id,string Email)
        {
            var claims = new[]
{
                new Claim("id",Id.ToString()),
                new Claim("email",Email),
                new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString())
            };

            var privateKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["jwt:secretKey"]));

            var credentials = new SigningCredentials(privateKey, SecurityAlgorithms.HmacSha256);

            var expiration = DateTime.UtcNow.AddMinutes(10);

            JwtSecurityToken token = new JwtSecurityToken(
                issuer: _configuration["jwt:issuer"],
                audience: _configuration["jwt:audience"],
                claims: claims,
                expires: expiration,
                signingCredentials: credentials
                );

            var t1 = new JwtSecurityTokenHandler().WriteToken(token);

            return t1;
        }
    }

    }

