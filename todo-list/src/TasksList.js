import React, { useState } from "react";
import "./TasksList.css";
import TaskForm from "./Components/Forms/TaskForm/TaskForm";
import Modal from "./Components/Modals/Modal";
import { ETATS } from "./data/etats";

export default function TaskList({ tasks }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

    // Logique de filtrage (préparée pour l'avenir)
    const filteredTasks = tasks.filter((task) => {
        const matchSearch =
            task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.id.toString().includes(searchTerm);
        const matchStatus = statusFilter === "" || task.etat === statusFilter;
        return matchSearch && matchStatus;
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
                        <div>État</div>
                        <div>Création</div>
                        <div>Échéance</div>
                        <div>Assigné à</div>
                    </li>

                    {/* Lignes de tâches */}
                    {filteredTasks.map((task) => (
                        <li key={task.id} className="jira-task-item">
                            <div className="jira-task-id">{task.id}</div>
                            <div className="jira-task-title" title={task.title}>
                                {task.title}
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
                                {task.date_echeance
                                    ? new Date(
                                          task.date_echeance,
                                      ).toLocaleDateString()
                                    : "-"}
                            </div>
                            <div className="jira-task-assignee">
                                {task.equipiers && task.equipiers.length > 0 ? (
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
                    ))}
                </ul>
            )}
        </div>
    );
}
