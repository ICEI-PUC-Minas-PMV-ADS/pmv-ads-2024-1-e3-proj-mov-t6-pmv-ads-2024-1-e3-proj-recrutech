using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Recrutech_api.Model;
using Recrutech_api.Interfaces;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cors;

namespace Recrutech_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly recrutechDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly IGenericUpdateService _GenericUpdateService;

        public UsersController(recrutechDbContext context, IConfiguration configuration, IGenericUpdateService GenericUpdateService)
        {
            _context = context;
            _configuration = configuration;
            _GenericUpdateService = GenericUpdateService;
        }

        // GET: api/Users
        [HttpGet("getAllUsers")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {

            return await _context.GetAllUsers.ToListAsync();
            
        }

        // GET: api/Users/5
        [HttpGet("getUser/{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            User user = await _context.GetAllUsers.FirstOrDefaultAsync(x=> x.Id == id);
            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("createUser")]
        public async Task<ActionResult<User>> CreateUser(CreateUserP user)
        {
            bool userAlreadyExist = await _context.GetAllUsers.FirstOrDefaultAsync(x => x.Email == user.User.Email) != null ? true : false;
            if (userAlreadyExist) return BadRequest("Já existe um usuário ativo associado a esse e-mail");

            user.User.Password = HashPassword(user.Password);
            _context.Users.Add(user.User);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.User.Id }, user.User);
        }

        [HttpPost("loginWithAuth")]
        public async Task<ActionResult<ReturnUser>> LoginReturnToken([FromBody] UserLoginRequest request)
        {
            if (string.IsNullOrEmpty(request?.Email) || string.IsNullOrEmpty(request.Senha))
            {
                return BadRequest("Preencha todos os campos");
            }
            
            User user = await _context.GetAllUsers.FirstOrDefaultAsync(x => x.Email == request.Email);
            if (user == null)
            {
                return BadRequest("Nome de usuário ou senha incorretos");
            }

            bool passwordOk = VerifyHashedPassword(user.Password, request.Senha);

            if (!passwordOk) return BadRequest("Senha incorreta");

            return new ReturnUser
            {
                UserId = user.Id,
                jwtToken = GenerateToken(user.Id, user.Email)
            };
        }


        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPatch("UpdateUserRegistration/{userId}")]
        public async Task<IActionResult> UpdateUserRegistration(int userId, [FromBody] JsonPatchDocument<User> updateUser)
        {
            User userContext = await _context.GetAllUsers.FirstOrDefaultAsync(x => x.Id == userId);
            await _GenericUpdateService.UpdateObject(updateUser, userContext, userId, ModelState);
            return Ok(userContext);
        }

        // DELETE: api/Users/5
        [HttpDelete("deleteUser/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            User user = await _context.GetAllUsers.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            user.IsActive = false;

            if (user.VacanciesOwner.Count != 0) user.VacanciesOwner.ForEach(x => x.IsActive = false);
            if (user.Curriculum != null) user.Curriculum.IsActive = false;

            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok("User deleted");
        }



        public class UserLoginRequest
        {
            public string? Email { get; set; }
            public string? Senha { get; set; }
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

            return new JwtSecurityTokenHandler().WriteToken(token);
          

        }

        public class ReturnUser
        {
            public string? jwtToken { get; set; }
            public long? UserId { get; set; }
        }

        public class CreateUserP
        {
            public User User { get; set; }
            public string Password { get; set; }
        }


        public static string HashPassword(string password)
            {
                byte[] salt;
                new RNGCryptoServiceProvider().GetBytes(salt = new byte[16]);

                var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000);
                byte[] hash = pbkdf2.GetBytes(20);

                byte[] hashBytes = new byte[36];
                Array.Copy(salt, 0, hashBytes, 0, 16);
                Array.Copy(hash, 0, hashBytes, 16, 20);

                return Convert.ToBase64String(hashBytes);
            }

        public static bool VerifyHashedPassword(string hashedPassword, string password)
            {
                byte[] hashBytes = Convert.FromBase64String(hashedPassword);

                byte[] salt = new byte[16];
                Array.Copy(hashBytes, 0, salt, 0, 16);

                var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000);
                byte[] hash = pbkdf2.GetBytes(20);

                for (int i = 0; i < 20; i++)
                {
                    if (hashBytes[i + 16] != hash[i])
                    {
                        return false;
                    }
                }

                return true;
            }
        
    }

    }

