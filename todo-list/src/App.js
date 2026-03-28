import { useState } from "react";
import "./App.css";
import TaskForm from "./Components/Forms/TaskForm/TaskForm";
import TaskList from "./Components/Lists/TasksList/TasksList";
import FoldersList from "./Components/Lists/FoldersList/FoldersList";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

import Backup from "./data/backup.json";

function App() {
    const [viewMode, setViewMode] = useState("tasks");

    return (
        <div className="App">
            {/* Header */}
            <Header />

            <div className="view-toggle">
                <button
                    onClick={() => setViewMode("tasks")}
                    className={`view-toggle-btn left ${viewMode === "tasks" ? "active" : ""}`}
                >
                    Vue Tâches
                </button>
                <button
                    onClick={() => setViewMode("folders")}
                    className={`view-toggle-btn right ${viewMode === "folders" ? "active" : ""}`}
                >
                    Vue Dossiers
                </button>
            </div>

            {viewMode === "tasks" ? (
                /* Liste des tâches */
                !Backup.taches || Backup.taches.length === 0 ? (
                    <p>Aucune tâche à afficher.</p>
                ) : (
                    <TaskList tasks={Backup.taches} />
                )
            ) : (
                /* Liste des dossiers */
                <FoldersList initialFolders={Backup.dossiers} />
            )}

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default App;
