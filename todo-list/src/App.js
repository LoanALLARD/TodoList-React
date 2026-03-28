import { useState } from "react";
import "./App.css";
import TaskList from "./Components/Lists/TasksList/TasksList";
import FoldersList from "./Components/Lists/FoldersList/FoldersList";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import TaskForm from "./Components/Forms/TaskForm/TaskForm";
import FolderForm from "./Components/Forms/FolderForm/FolderForm";
import Modal from "./Components/Modals/Modal";

import Backup from "./data/backup.json";

function App() {
    const [viewMode, setViewMode] = useState("tasks");

    const [tasks, setTasks] = useState(Backup.taches);
    const [folders, setFolders] = useState(Backup.dossiers);

    // Réinitialisation
    const handleReset = () => {
        if (
            // Confirmation de réinitialisation
            window.confirm(
                "Êtes-vous sûr(e) de vouloir tout effacer et repartir de zéro (vide) ?",
            )
        ) {
            // Réinitialisation des données
            setTasks([]);
            setFolders([]);
        }
    };

    const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
    const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] =
        useState(false);

    const handleFooterAddClick = () => {
        if (viewMode === "tasks") {
            setIsCreateTaskModalOpen(true);
        } else {
            setIsCreateFolderModalOpen(true);
        }
    };

    const handleCreateTask = (newTaskData) => {
        const newTask = {
            id: Date.now().toString(),
            ...newTaskData,
        };
        setTasks([...tasks, newTask]);
        setIsCreateTaskModalOpen(false);
    };

    const handleCreateFolder = (newFolderData) => {
        const newFolder = {
            id: Date.now().toString(),
            ...newFolderData,
        };
        setFolders([...folders, newFolder]);
        setIsCreateFolderModalOpen(false);
    };

    return (
        <div className="App">
            <Header tasks={tasks} onReset={handleReset} />

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
                <TaskList tasks={tasks} />
            ) : (
                <FoldersList folders={folders} setFolders={setFolders} />
            )}

            <Footer onAddClick={handleFooterAddClick} />

            <Modal
                isOpen={isCreateTaskModalOpen}
                onClose={() => setIsCreateTaskModalOpen(false)}
                title="Nouvelle tâche"
            >
                <TaskForm onSubmit={handleCreateTask} />
            </Modal>

            <Modal
                isOpen={isCreateFolderModalOpen}
                onClose={() => setIsCreateFolderModalOpen(false)}
                title="Nouveau dossier"
            >
                <FolderForm onSubmit={handleCreateFolder} />
            </Modal>
        </div>
    );
}

export default App;
