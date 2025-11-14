const API_URL = process.env.REACT_APP_API_URL;

// Example: fetch all todos
export const fetchTodos = async () => {
  try {
    const response = await fetch(`${API_URL}/test-db`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    return null;
  }
};

// Example: create a new todo
export const createTodo = async (todo) => {
  try {
    const response = await fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });
    return await response.json();
  } catch (error) {
    console.error("Error creating todo:", error);
    return null;
  }
};