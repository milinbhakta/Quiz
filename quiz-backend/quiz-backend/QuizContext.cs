using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using quiz_backend.Models;

namespace quiz_backend
{
    public class QuizContext : DbContext
    {
        public QuizContext(DbContextOptions<QuizContext> options) : base(options) 
        {

        }

        public DbSet<Models.Question> Questions { get; set; }

        public DbSet<quiz_backend.Models.Quiz> Quiz { get; set; }
    }
}
