using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GifagramPOC.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }
        public int PostingId { get; set; }
        public Posting Posting { get; set; }
    }
}
