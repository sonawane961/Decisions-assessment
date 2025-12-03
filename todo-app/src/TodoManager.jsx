// TodoManager.jsx
import React, { useEffect, useState, useCallback } from "react";
import styles from "./styles/TodoManager.module.scss";
import Icon from "./component/Icon/Icon";
import ConfirmationPopup from "./component/ConfirmationPopup/ConfirmationPopup";
import apiService from "../services/apiService";

const categories = ["Personal", "Work"];
const priorities = ["Low", "Medium", "High"];

export default function TodoManager() {
  const [todos, setTodos] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [search, setSearch] = useState("");

  const [openPopup, setOpenPopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    category: "Personal",
  });

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      priority: "Medium",
      category: "Personal",
    });
    setEditId(null);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const fetchTodos = useCallback(async () => {
    try {
      const list = await apiService.getTodos("todo");
      setTodos(list || []);
    } catch (error) {
      console.error("ERROR FETCHING TODOS:", error);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAddTodo = async (e) => {
    e.preventDefault();

    try {
      await apiService.createTodo(form);
      resetForm();
      fetchTodos();
    } catch (error) {
      console.error("CREATE TODO ERROR:", error);
    }
  };

  const handleUpdateTodo = async (e) => {
    e.preventDefault();

    try {
      await apiService.updateTodo(editId, form);
      resetForm();
      fetchTodos();
    } catch (error) {
      console.error("ERROR UPDATING TODO:", error);
    }
  };

  const handleEdit = (todo) => {
    setForm({
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
      category: todo.category,
    });
    setEditId(todo.id);
    window.scrollTo(0, 0);
  };

  const handleDeleteRequest = (id) => {
    setDeleteId(id);
    setOpenPopup(true);
  };

  const handleConfirmDelete = async () => {
    setOpenPopup(false);

    try {
      await apiService.deleteTodo(deleteId);
      fetchTodos();
    } catch (error) {
      console.error("ERROR DELETING TODO:", error);
    }

    setDeleteId(null);
  };

  const toggleComplete = async (todo) => {
    const updatedData = { ...todo, isCompleted: !todo.isCompleted };

    try {
      await apiService.updateTodo(todo.id, updatedData);
      fetchTodos();
    } catch (error) {
      console.error("ERROR UPDATING COMPLETION:", error);
    }
  };

  const filteredTodos = todos.filter((t) => {
    if (filterCategory !== "All" && t.category !== filterCategory) return false;
    if (filterPriority !== "All" && t.priority !== filterPriority) return false;

    const keyword = search.toLowerCase();
    return (
      t.title.toLowerCase().includes(keyword) ||
      t.description.toLowerCase().includes(keyword)
    );
  });

  return (
    <>
      <section className={styles.todoSection}>
        <div className={styles.content}>
          <div className={styles.formCard}>
            <h2 className={styles.title}>Todo Manager</h2>
            <p className={styles.subtitle}>
              Organize your tasks with priorities and categories
            </p>

            <form
              onSubmit={editId ? handleUpdateTodo : handleAddTodo}
              autoComplete="off"
            >
              <label>Title *</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter todo title"
                required
              />

              <label>Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter todo description"
              />

              <div className={styles.row}>
                <div className={styles.col}>
                  <label>Priority</label>
                  <select
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                  >
                    {priorities.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.col}>
                  <label>Category</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                  >
                    {categories.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button className={styles.addBtn}>
                {editId ? "Update Todo" : "Add Todo"}
              </button>
            </form>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.topControls}>
              <input
                className={styles.search}
                placeholder="Search todos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <div className={styles.filterBox}>
                <div className={styles.filterItem}>
                  <label>Filter by Category</label>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    <option value="All">All</option>
                    {categories.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.filterItem}>
                  <label>Filter by Priority</label>
                  <select
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                  >
                    <option value="All">All</option>
                    {priorities.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.list}>
              {filteredTodos.length === 0 ? (
                <div className={styles.empty}>No todos found.</div>
              ) : (
                filteredTodos.map((todo) => (
                  <div
                    key={todo.id}
                    className={`${styles.todoCard} ${
                      todo.isCompleted ? styles.completed : ""
                    }`}
                  >
                    <div className={styles.left}>
                      <input
                        type="checkbox"
                        checked={todo.isCompleted}
                        onChange={() => toggleComplete(todo)}
                        className={styles.checkbox}
                      />

                      <div>
                        <h3>{todo.title}</h3>
                        <p>{todo.description}</p>

                        <div className={styles.tags}>
                          <span className={styles.priorityTag}>
                            {todo.priority} Priority
                          </span>
                          <span className={styles.categoryTag}>
                            {todo.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.actions}>
                      <button onClick={() => handleEdit(todo)}>
                        <Icon iconName="EditIcon" />
                      </button>

                      <button onClick={() => handleDeleteRequest(todo.id)}>
                        <Icon iconName="TrashIcon" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      <ConfirmationPopup
        open={openPopup}
        message="Are you sure you want to delete this item?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setOpenPopup(false)}
      />
    </>
  );
}
