using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GifagramPOC.Models
{
    public class Subscription
    {
        public int Id { get; set; }
        public string SubscriberId { get; set; }
        public UserProfile Subscriber { get; set; }
        public int ContentProviderId { get; set; }
        public UserProfile ContentProvider { get; set; }
    }
}
