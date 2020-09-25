using GifagramPOC.Data;
using GifagramPOC.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GifagramPOC.Repositories
{
    public class UserProfileRepository
    {
        private readonly ApplicationDbContext _context;

        public UserProfileRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<UserProfile> GetById(int id)
        {
            return await _context.UserProfile.FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<UserProfile> GetByFbUid(string fbuid)
        {
            return await _context.UserProfile.FirstOrDefaultAsync(u => u.FirebaseId == fbuid);
        }
    }
}
