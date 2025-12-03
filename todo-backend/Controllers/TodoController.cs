using Microsoft.AspNetCore.Mvc;
using TodoApi.Models;
using TodoApi.Services;

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        private readonly TodoService _todoService;

        public TodoController(TodoService todoService)
        {
            _todoService = todoService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() =>
            Ok(await _todoService.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var todo = await _todoService.GetByIdAsync(id);
            return todo == null ? NotFound(new { message = "Todo not found" }) : Ok(todo);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Todo todo)
        {
            await _todoService.CreateAsync(todo);
            return Ok(new { message = "Todo created", todo });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] Todo updated)
        {
            var exists = await _todoService.GetByIdAsync(id);
            if (exists == null)
                return NotFound(new { message = "Todo not found" });

            updated.Id = id;
            await _todoService.UpdateAsync(id, updated);
            return Ok(new { message = "Todo updated", updated });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var exists = await _todoService.GetByIdAsync(id);
            if (exists == null)
                return NotFound(new { message = "Todo not found" });

            await _todoService.DeleteAsync(id);
            return Ok(new { message = "Todo deleted" });
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string keyword) =>
            Ok(await _todoService.SearchAsync(keyword));

        [HttpGet("category/{category}")]
        public async Task<IActionResult> Category(string category) =>
            Ok(await _todoService.GetByCategoryAsync(category));

        [HttpGet("priority/{priority}")]
        public async Task<IActionResult> Priority(string priority) =>
            Ok(await _todoService.GetByPriorityAsync(priority));
    }
}
