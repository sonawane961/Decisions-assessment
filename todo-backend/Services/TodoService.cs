using Microsoft.Extensions.Options;
using MongoDB.Driver;
using TodoApi.Models;

namespace TodoApi.Services
{
    public class TodoService
    {
        private readonly IMongoCollection<Todo> _todoCollection;

        public TodoService(IOptions<TodoDatabaseSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            var database = client.GetDatabase(settings.Value.DatabaseName);

            _todoCollection = database.GetCollection<Todo>(settings.Value.CollectionName);
        }

        public async Task<List<Todo>> GetAllAsync() =>
            await _todoCollection.Find(_ => true).ToListAsync();

        public async Task<Todo?> GetByIdAsync(string id) =>
            await _todoCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Todo todo) =>
            await _todoCollection.InsertOneAsync(todo);

        public async Task UpdateAsync(string id, Todo upTodo) =>
            await _todoCollection.ReplaceOneAsync(x => x.Id == id, upTodo);

        public async Task DeleteAsync(string id) =>
            await _todoCollection.DeleteOneAsync(x => x.Id == id);

        public async Task<List<Todo>> SearchAsync(string keyword)
        {
            keyword = keyword.ToLower();
            return await _todoCollection.Find(t =>
                t.Title.ToLower().Contains(keyword) ||
                t.Description.ToLower().Contains(keyword)
            ).ToListAsync();
        }

        public async Task<List<Todo>> GetByCategoryAsync(string category) =>
            await _todoCollection.Find(t => t.Category == category).ToListAsync();

        public async Task<List<Todo>> GetByPriorityAsync(string priority) =>
            await _todoCollection.Find(t => t.Priority == priority).ToListAsync();
    }
}
