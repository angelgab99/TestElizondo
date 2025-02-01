using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ElizondoPrueba.Models;

namespace ElizondoPrueba.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TareaController : ControllerBase
    {
        private readonly ElizondoCrudTestContext dbContext;

        public TareaController(ElizondoCrudTestContext _dbContext)
        {
            dbContext = _dbContext;
        }
        [HttpGet]
        [Route("getTasks")]
        public async Task<IActionResult> Get()
        {
            var tareas = await dbContext.Tareas.ToListAsync();
            return StatusCode(StatusCodes.Status200OK, tareas);
        }

        [HttpGet]
        [Route("get/{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            var tarea = await dbContext.Tareas.FirstOrDefaultAsync(e => e.IdTarea == id);
            return StatusCode(StatusCodes.Status200OK, tarea);
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Post([FromBody] Tarea objeto)
        {
            await dbContext.Tareas.AddAsync(objeto);
            await dbContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok" });
        }
        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> update([FromBody] Tarea objeto)
        {
            dbContext.Tareas.Update(objeto);
            await dbContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok" });
        }

        [HttpDelete]
        [Route("delete/{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var tarea = await dbContext.Tareas.FirstOrDefaultAsync(e => e.IdTarea == id);
            dbContext.Tareas.Remove(tarea);
            await dbContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok" });
        }
    }
}
