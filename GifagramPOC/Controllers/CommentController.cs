using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using GifagramPOC.Data;
using GifagramPOC.Models;
using GifagramPOC.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GifagramPOC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly CommentRepository _commentRepository;
        private readonly UserProfileRepository _userRepository;

        public CommentController(ApplicationDbContext context)
        {
            _commentRepository = new CommentRepository(context);
            _userRepository = new UserProfileRepository(context);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post(Comment comment)
        {
            var user = await GetCurrentUserAsync();

            comment.UserProfileId = user.Id;
            _commentRepository.AddComment(comment);

            return Ok(comment);
        }

        public async Task<UserProfile> GetCurrentUserAsync()
        {
            var fbuid = User.FindFirstValue("user_id");
            return await _userRepository.GetByFbUid(fbuid);
        }
    }
}
