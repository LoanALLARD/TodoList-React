import logo from "./logo.svg";
import "./App.css";
import TaskForm from "./forms/TaskForm";

function App() {
    return (
        <div className="App">
            <TaskForm
                onSubmit={(task) =>
                    console.log("Nouvelle tâche ajoutée:", task)
                }
            />
        </div>
    );
}

export default App;
