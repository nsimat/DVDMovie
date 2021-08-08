using System.Collections.Generic;
using DVDMovie.Models.BindingTargets;
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

        [HttpPost]
        public IActionResult CreateStudio([FromBody] StudioData stData)
        {
            if (ModelState.IsValid)
            {
                Studio studio = stData.Studio;
                dataContext.Add(studio);
                dataContext.SaveChanges();
                return Ok(studio.StudioId);
            }
            return BadRequest(ModelState);
        }

        [HttpPut("{id}")]
        public IActionResult ReplaceStudio(long id, [FromBody] StudioData stData)
        {
            if (ModelState.IsValid)
            {
                Studio studio = stData.Studio;
                studio.StudioId = id;
                dataContext.Update(studio);
                dataContext.SaveChanges();
                return Ok();
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteStudio(long id)
        {
            dataContext.Studios.Remove(new Studio { StudioId = id });
            dataContext.SaveChanges();
            return Ok(id);
        }
    }
}