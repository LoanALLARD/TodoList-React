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
    // Mode d'affichage actuel
    const [viewMode, setViewMode] = useState("tasks");

    // Définition des différents etats
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

    // Etats pour les modales de création
    const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
    const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] =
        useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

    // Gestion du bouton d'ajout dans le footer
    const handleFooterAddClick = () => {
        if (viewMode === "tasks") {
            setTaskToEdit(null);
            setIsCreateTaskModalOpen(true);
        } else {
            setIsCreateFolderModalOpen(true);
        }
    };

    // Permet de gérer le clic sur le bouton d'édition d'une tâche
    const handleEditTaskClick = (task) => {
        const associatedFolderIds = relations
            .filter((rel) => rel.tache === task.id)
            .map((rel) => rel.dossier);

        setTaskToEdit({ ...task, folders: associatedFolderIds });
        setIsCreateTaskModalOpen(true);
    };

    // Permet pour gérer la création ou la modification d'une tâche
    const handleSaveTask = (newTaskData, selectedFolders = []) => {
        if (taskToEdit) {
            // Metter à jour la tâche existante
            const updatedTasks = tasks.map((t) =>
                t.id === taskToEdit.id ? { ...t, ...newTaskData } : t,
            );

            // Refaire la relation pour cette tâche
            const otherRelations = relations.filter(
                (rel) => rel.tache !== taskToEdit.id,
            );
            const newRelations = selectedFolders.map((folderId) => ({
                id:
                    Date.now().toString() +
                    Math.random().toString(36).substring(2, 9),
                tache: taskToEdit.id,
                dossier: folderId,
            }));

            setTasks(updatedTasks);
            setRelations([...otherRelations, ...newRelations]);
        } else {
            // Créer une nouvelle tâche
            const taskId = Date.now().toString();
            const newTask = {
                id: taskId,
                ...newTaskData,
            };

            // Crée la relation pour le dossier choisi
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
        }

        // Fermer la modale et réinitialise l'état d'édition
        setIsCreateTaskModalOpen(false);
        setTaskToEdit(null);
    };

    // Permet pour gérer la création d'un dossier
    const handleCreateFolder = (newFolderData) => {
        const newFolder = {
            id: Date.now().toString(),
            ...newFolderData,
        };
        setFolders([...folders, newFolder]);
        setIsCreateFolderModalOpen(false);
    };

    return (
        // Structure principale de l'application
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
                    onEditTask={handleEditTaskClick}
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
                onClose={() => {
                    setIsCreateTaskModalOpen(false);
                    setTaskToEdit(null);
                }}
                title={taskToEdit ? "Modifier la tâche" : "Nouvelle tâche"}
            >
                <TaskForm
                    onSubmit={handleSaveTask}
                    folders={folders}
                    isEditing={!!taskToEdit}
                    initialData={taskToEdit}
                />
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
