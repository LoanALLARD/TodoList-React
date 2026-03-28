import React, { useState } from "react";
import "./TasksList.css";
import TaskForm from "./Components/Forms/TaskForm/TaskForm";
import Modal from "./Components/Modals/Modal";
import { ETATS, ETAT_TERMINE } from "./data/etats";
import Backup from "./data/backup.json";

export default function TaskList({ tasks }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("NON_TERMINEES");
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

    // Fonction pour récupérer les dossiers d'une tâche
    const getTaskFolders = (taskId) => {
        const relatedFolderIds = Backup.relations
            .filter((rel) => rel.tache === taskId)
            .map((rel) => rel.dossier);

        return Backup.dossiers.filter((d) => relatedFolderIds.includes(d.id));
    };

    // Logique de filtrage (préparée pour l'avenir)
    let filteredTasks = tasks.filter((task) => {
        const matchSearch =
            task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.id.toString().includes(searchTerm);

        let matchStatus = true;
        if (statusFilter === "NON_TERMINEES") {
            matchStatus = !ETAT_TERMINE.includes(task.etat);
        } else if (statusFilter !== "") {
            matchStatus = task.etat === statusFilter;
        }

        return matchSearch && matchStatus;
    });

    // Tri par date d'échéance décroissante
    filteredTasks.sort((a, b) => {
        if (!a.date_echeance) return 1;
        if (!b.date_echeance) return -1;
        return new Date(b.date_echeance) - new Date(a.date_echeance);
    });

    return (
        <div className="jira-task-list-container">
            <h2
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                Liste des tâches
            </h2>

            {/* Zone d'en-tête / Filtres */}
            <div className="jira-filters-header">
                <input
                    type="text"
                    placeholder="Filtrer par nom ou ID..."
                    className="filter-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="filter-input"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="">Tous les statuts</option>
                    <option value="NON_TERMINEES">
                        Non terminées (Défaut)
                    </option>
                    {ETATS &&
                        Object.values(ETATS).map((etat) => (
                            <option key={etat} value={etat}>
                                {etat}
                            </option>
                        ))}
                </select>
                <button
                    onClick={() => setIsTaskModalOpen(true)}
                    className="create-task-btn"
                >
                    Créer une tâche
                </button>
                <Modal
                    isOpen={isTaskModalOpen}
                    onClose={() => setIsTaskModalOpen(false)}
                    title="Nouvelle tâche"
                >
                    <TaskForm
                        onSubmit={(task) => {
                            console.log("Nouvelle tâche ajoutée:", task);
                            setIsTaskModalOpen(false);
                        }}
                    />
                </Modal>
            </div>

            {filteredTasks.length === 0 ? (
                <p>Aucune tâche à afficher.</p>
            ) : (
                <ul className="jira-task-list">
                    {/* En-tête de la "table" */}
                    <li className="jira-task-item jira-task-header">
                        <div>ID</div>
                        <div>Description</div>
                        <div>Catégories</div>
                        <div>État</div>
                        <div>Création</div>
                        <div>Échéance</div>
                        <div>Assigné à</div>
                    </li>

                    {/* Lignes de tâches */}
                    {filteredTasks.map((task) => {
                        const taskFolders = getTaskFolders(task.id);
                        return (
                            <li key={task.id} className="jira-task-item">
                                <div className="jira-task-id">{task.id}</div>
                                <div
                                    className="jira-task-title"
                                    title={task.title}
                                >
                                    {task.title}
                                </div>
                                <div
                                    className="jira-task-folders"
                                    style={{
                                        display: "flex",
                                        gap: "5px",
                                        flexWrap: "wrap",
                                    }}
                                >
                                    {taskFolders.slice(0, 2).map((folder) => (
                                        <span
                                            key={folder.id}
                                            style={{
                                                backgroundColor:
                                                    folder.color || "#ccc",
                                                color: "white",
                                                padding: "2px 6px",
                                                borderRadius: "4px",
                                                fontSize: "12px",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {folder.title}
                                        </span>
                                    ))}
                                    {taskFolders.length > 2 && (
                                        <span
                                            style={{
                                                fontSize: "12px",
                                                color: "#5e6c84",
                                                padding: "2px",
                                            }}
                                        >
                                            +{taskFolders.length - 2}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <span
                                        className="jira-task-status"
                                        data-status={task.etat}
                                    >
                                        {task.etat || "À FAIRE"}
                                    </span>
                                </div>
                                <div className="jira-task-date">
                                    {task.date_creation
                                        ? new Date(
                                              task.date_creation,
                                          ).toLocaleDateString()
                                        : "-"}
                                </div>
                                <div className="jira-task-date">
                                    {task.date_echeance
                                        ? new Date(
                                              task.date_echeance,
                                          ).toLocaleDateString()
                                        : "-"}
                                </div>
                                <div className="jira-task-assignee">
                                    {task.equipiers &&
                                    task.equipiers.length > 0 ? (
                                        <>
                                            <div className="jira-avatar">
                                                {task.equipiers[0].name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>
                                            <span>
                                                {task.equipiers
                                                    .map((e) => e.name)
                                                    .join(", ")}
                                            </span>
                                        </>
                                    ) : (
                                        "Non assigné"
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
