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
    const [relations, setRelations] = useState(Backup.relations);

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
            setRelations([]);
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

    const handleCreateTask = (newTaskData, selectedFolders = []) => {
        const taskId = Date.now().toString();
        const newTask = {
            id: taskId,
            ...newTaskData,
        };

        // Add new relations
        const newRelations = selectedFolders.map((folderId) => ({
            id:
                Date.now().toString() +
                Math.random().toString(36).substring(2, 9),
            tache: taskId,
            dossier: folderId,
        }));

        setTasks([...tasks, newTask]);
        if (newRelations.length > 0) {
            setRelations([...relations, ...newRelations]);
        }

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
                <TaskList
                    tasks={tasks}
                    folders={folders}
                    relations={relations}
                />
            ) : (
                <FoldersList
                    folders={folders}
                    relations={relations}
                    setFolders={setFolders}
                />
            )}

            <Footer onAddClick={handleFooterAddClick} />

            <Modal
                isOpen={isCreateTaskModalOpen}
                onClose={() => setIsCreateTaskModalOpen(false)}
                title="Nouvelle tâche"
            >
                <TaskForm onSubmit={handleCreateTask} folders={folders} />
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
