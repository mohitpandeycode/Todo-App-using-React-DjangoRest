import React, { useState } from "react";
import '../App.css'; // Import your CSS file
import Tasks from "./Tasks"; // Import the Tasks component

const TodoAdd = () => {
  const [newTask, setNewTask] = useState(""); // State for new task description
  const url = "http://127.0.0.1:8000/task/"; // Endpoint for adding tasks

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    if (!newTask.trim()) {
      alert("Please enter a task name."); // Inform user about empty task
      return; // Exit without sending request
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: newTask }), // Send the new task name (use 'name' key)
      });

      if (response.ok) {
        // Task successfully added
        setNewTask(""); // Clear the input field
        console.log("Task added successfully!"); // Or: Display success message

        // Refresh the page to display the updated task list
        window.location.reload(); // Force a full page reload

        // **Optional:** Consider alternative approaches for complex scenarios:
        // - Use a state management library (Redux, Context API) to update state
        //   across components without full page reloads.
        // - Implement optimistic UI updates (display new task immediately) and
        //   handle potential discrepancies upon server response.
      } else {
        console.error('Error adding task:', response.statusText); // Handle backend errors
        alert(`Error adding task: ${response.statusText}`); // Inform user about backend errors
      }
    } catch (error) {
      console.error(error); // Handle network or other errors
      alert("An error occurred while adding the task."); // Inform user about generic errors
    }
  };

  return (
    <div className="frame">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task..."
        />
        <button type="submit">Add</button>
      </form>
      <Tasks url={url} />  {/* Pass the endpoint URL to Tasks component */}
    </div>
  );
};

export default TodoAdd;
