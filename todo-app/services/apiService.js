class ApiService {
  constructor() {
    this.baseURL = "http://localhost:5268/api";
  }

  async request(endpoint, method = "GET", body = null) {
    const config = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "API Error");
      }

      return data;
    } catch (error) {
      console.error("API ERROR:", error);
      throw error;
    }
  }

  createTodo(todoData) {
    return this.request("/todo", "POST", todoData);
  }

  getTodos(query = "") {
    return this.request(`/${query}`, "GET");
  }

  updateTodo(id, updatedData) {
    return this.request(`/todo/${id}`, "PUT", updatedData);
  }

  deleteTodo(id) {
    return this.request(`/todo/${id}`, "DELETE");
  }
}

const apiService = new ApiService();
export default apiService;
