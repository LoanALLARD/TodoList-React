import { useState } from "react";
import "./App.css";
import TaskForm from "./Components/Forms/TaskForm/TaskForm";
import TaskList from "./TasksList";
import FoldersList from "./FoldersList";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

import Backup from "./data/backup.json";

function App() {
    const [viewMode, setViewMode] = useState("tasks");

    return (
        <div className="App">
            {/* Header */}
            <Header />

            <div
                className="view-toggle"
                style={{ textAlign: "center", margin: "20px" }}
            >
                <button
                    onClick={() => setViewMode("tasks")}
                    style={{
                        padding: "10px 20px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        backgroundColor:
                            viewMode === "tasks" ? "#0052cc" : "#f4f5f7",
                        color: viewMode === "tasks" ? "#fff" : "#172b4d",
                        border: "1px solid #dfe1e6",
                        borderRadius: "4px 0 0 4px",
                    }}
                >
                    Vue Tâches
                </button>
                <button
                    onClick={() => setViewMode("folders")}
                    style={{
                        padding: "10px 20px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        backgroundColor:
                            viewMode === "folders" ? "#0052cc" : "#f4f5f7",
                        color: viewMode === "folders" ? "#fff" : "#172b4d",
                        border: "1px solid #dfe1e6",
                        borderRadius: "0 4px 4px 0",
                        marginLeft: "-1px",
                    }}
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
