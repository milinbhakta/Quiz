using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace quiz_backend.Models
{
    public class Question
    {
        public int Id { get; set; }
        public string Ques { get; set; }

        public string CorrectAnswer { get; set; }
        public string Answer1 { get; set; }
        public string Answer2 { get; set; }
        public string Answer3 { get; set; }

        public int QuizId { get; set; }

    }
}
