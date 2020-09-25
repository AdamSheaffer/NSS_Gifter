using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GifagramPOC.Data;
using GifagramPOC.Models;
using GifagramPOC.Utils;

namespace GifagramPOC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<UserProfile>> GetUser(string fbuid)
        {
            var userProfile = await _context.UserProfile.FirstOrDefaultAsync(u => u.FirebaseId == fbuid);

            if (userProfile == null)
            {
                return NotFound();
            }

            return Ok(userProfile);
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserProfile>> GetUserProfile(int id)
        {
            var userProfile = await _context.UserProfile.FindAsync(id);

            if (userProfile == null)
            {
                return NotFound();
            }

            return Ok(userProfile);
        }

        [HttpPost]
        public async Task<ActionResult<UserProfile>> PostUserProfile(UserProfile userProfile)
        {
            userProfile.ImageUrl = GravatarUtils.GetGravatarUrl(userProfile.Email);
            userProfile.DateCreated = DateTime.Now;

            _context.UserProfile.Add(userProfile);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserProfile", new { id = userProfile.Id }, userProfile);
        }
    }
}
