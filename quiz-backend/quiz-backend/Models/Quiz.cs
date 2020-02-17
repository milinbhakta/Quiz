using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace quiz_backend.Models
{
    public class Quiz
    {
        public int Id { get; set; }
        public string Title { get; set; }

        public string OwnerId { get; set; }
    }
}
