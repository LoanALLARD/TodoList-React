import { useState } from "react";
import "./App.css";
import TaskForm from "./Components/Forms/TaskForm";
import TaskList from "./TasksList";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

import Backup from "./data/backup.json";

function App() {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="App">
            <Header />
            <button onClick={() => setShowForm(!showForm)}>
                Créer une tâche
            </button>
            {showForm && (
                <TaskForm
                    onSubmit={(task) =>
                        console.log("Nouvelle tâche ajoutée:", task)
                    }
                />
            )}
            <TaskList tasks={Backup.taches} />
            <Footer />
        </div>
    );
}

export default App;
