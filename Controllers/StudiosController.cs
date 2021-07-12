using System.Collections.Generic;
using DVDMovie.Controllers.BindingTargets;
using DVDMovie.Models;
using Microsoft.AspNetCore.Mvc;

namespace DVDMovie.Controllers
{
    [Route("api/studios")]
    public class StudiosController : Controller
    {
        private DataContext dataContext;
        public StudiosController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        [HttpGet]
        public IEnumerable<Studio> GetStudios()
        {
            return dataContext.Studios;
        }

        public IActionResult CreateStudio([FromBody] StudioData stdata)
        {
            if(ModelState.IsValid)
            {
                Studio studio = stdata.Studio;
                dataContext.Add(studio);
                dataContext.SaveChanges();
                return Ok(studio.StudioId);
            }
            return BadRequest(ModelState);
        }
    }
}