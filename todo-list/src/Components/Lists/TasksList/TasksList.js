import React, { useState } from "react";
import "../TasksList.css";
import { ETATS, ETAT_TERMINE } from "../../../data/etats";
import Backup from "../../../data/backup.json";

export default function TaskList({ tasks }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("NON_TERMINEES");

    const getTaskFolders = (taskId) => {
        const relatedFolderIds = Backup.relations
            .filter((rel) => rel.tache === taskId)
            .map((rel) => rel.dossier);

        return Backup.dossiers.filter((d) => relatedFolderIds.includes(d.id));
    };

    let filteredTasks = tasks.filter((task) => {
        const titleMatch = task.title ? task.title.toLowerCase() : "";
        const idMatch = task.id ? task.id.toString() : "";
        const searchTarget = searchTerm.toLowerCase();

        const matchSearch =
            titleMatch.includes(searchTarget) || idMatch.includes(searchTarget);

        let matchStatus = true;
        if (statusFilter === "NON_TERMINEES") {
            matchStatus = !ETAT_TERMINE.includes(task.etat);
        } else if (statusFilter !== "") {
            matchStatus = task.etat === statusFilter;
        }

        return matchSearch && matchStatus;
    });

    filteredTasks.sort((a, b) => {
        if (!a.date_echeance) return 1;
        if (!b.date_echeance) return -1;
        return new Date(b.date_echeance) - new Date(a.date_echeance);
    });

    return (
        <div className="app-list-container">
            <h2 className="app-list-title">Liste des tâches</h2>

            <div className="app-filters-header">
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
            </div>

            {filteredTasks.length === 0 ? (
                <p>Aucune tâche à afficher.</p>
            ) : (
                <div className="cards-grid">
                    {filteredTasks.map((task) => {
                        const taskFolders = getTaskFolders(task.id);
                        return (
                            <div key={task.id} className="item-card">
                                <div className="card-header">
                                    <h3 className="card-title" title={task.title}>
                                        {task.title}
                                    </h3>
                                    <span className="card-id">#{task.id}</span>
                                </div>

                                <div className="card-badges">
                                    <span className="app-task-status" data-status={task.etat}>
                                        {task.etat || "À FAIRE"}
                                    </span>
                                </div>
                                
                                <div className="app-task-folders">
                                    {taskFolders.slice(0, 2).map((folder) => (
                                        <span
                                            key={folder.id}
                                            className="app-folder-tag"
                                            style={{ backgroundColor: folder.color || "#ccc" }}
                                        >
                                            {folder.title}
                                        </span>
                                    ))}
                                    {taskFolders.length > 2 && (
                                        <span className="app-folder-more">
                                            +{taskFolders.length - 2}
                                        </span>
                                    )}
                                </div>

                                <div className="card-details">
                                    <div className="detail-row">
                                        <span className="detail-label">Création:</span>
                                        <span>{task.date_creation ? new Date(task.date_creation).toLocaleDateString() : "-"}</span>
                                    </div>
                                    <div className="detail-row highlight-date">
                                        <span className="detail-label">Échéance:</span>
                                        <span>{task.date_echeance ? new Date(task.date_echeance).toLocaleDateString() : "-"}</span>
                                    </div>
                                </div>

                                <div className="card-footer">
                                    <div className="app-task-assignee">
                                        {task.equipiers && task.equipiers.length > 0 ? (
                                            <>
                                                <div className="app-avatar" title={task.equipiers.map(e => e.name).join(", ")}>
                                                    {task.equipiers[0].name.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="assignee-name">
                                                    {task.equipiers[0].name}
                                                    {task.equipiers.length > 1 && ` (+${task.equipiers.length - 1})`}
                                                </span>
                                            </>
                                        ) : (
                                            <span className="no-assignee">Non assigné</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
