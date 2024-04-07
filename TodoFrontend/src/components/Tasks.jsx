import { useState, useEffect } from "react";
import '../App.css'

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false); // Track deletion state
  const url = "http://127.0.0.1:8000/task";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error(error); // Handle any errors during fetching
        // Consider displaying an error message to the user
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (taskId) => {
    setIsDeleting(true); // Show a loading indicator or feedback

    try {
      const response = await fetch(`${url}/${taskId}`, { method: 'DELETE' });
      if (response.ok) {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
      } else {
        // Handle deletion errors appropriately
        console.error('Error deleting task:', response.statusText);
        // Display an error message to the user
      }
    } catch (error) {
      console.error(error);
      // Handle network or other errors
      // Display an error message to the user
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <h1>Tasks</h1>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <p key={task.id}>
            {task.task}
            <button onClick={() => handleDelete(task.id)} disabled={isDeleting}>
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </p>
        ))
      ) : (
        <p>No tasks found.</p>
      )}
    </div>
  );
};

export default Tasks;
