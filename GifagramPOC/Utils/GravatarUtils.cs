using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GifagramPOC.Utils
{
    public class GravatarUtils
    {
        public static string GetGravatarUrl(string email)
        {
            var emailHash = HashUtils.CreateMD5Hash(email.ToLower().Trim());

            return $"https://www.gravatar.com/avatar/{emailHash}".ToLower();
        }
    }
}
