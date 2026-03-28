import React, { useState } from "react";
import "../TasksList.css";
import { ETATS, ETAT_TERMINE } from "../../../data/etats";
import { ChevronRight, ChevronDown, Edit } from "lucide-react";

export default function TaskList({ tasks, folders, relations, onEditTask }) {
    // Etats pour les filtres d'affichage
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("NON_TERMINEES");
    const [expandedTasks, setExpandedTasks] = useState(new Set());

    // Permet de basculer en mode affichage complet
    const toggleExpand = (taskId) => {
        setExpandedTasks((prev) => {
            const next = new Set(prev);
            if (next.has(taskId)) next.delete(taskId);
            else next.add(taskId);
            return next;
        });
    };

    // Récupération des dossiers associés aux tâches
    const getTaskFolders = (taskId) => {
        const relatedFolderIds = relations
            .filter((rel) => rel.tache === taskId)
            .map((rel) => rel.dossier);

        return folders.filter((d) => relatedFolderIds.includes(d.id));
    };

    // Filtrage des tâches en fonction de la saisie
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

    // Tri des cartes par date d'échéance décroissante
    filteredTasks.sort((a, b) => {
        if (!a.date_echeance) return 1;
        if (!b.date_echeance) return -1;
        return new Date(b.date_echeance) - new Date(a.date_echeance);
    });

    return (
        // Affichage des tâches sous forme de cartes
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
                        const isExpanded = expandedTasks.has(task.id);

                        return (
                            <div key={task.id} className="item-card">
                                <div className="card-header">
                                    <div
                                        className="card-title-group"
                                        style={{
                                            display: "flex",
                                            gap: "10px",
                                            alignItems: "center",
                                        }}
                                    >
                                        <button
                                            onClick={() =>
                                                toggleExpand(task.id)
                                            }
                                            style={{
                                                background: "none",
                                                border: "none",
                                                cursor: "pointer",
                                                display: "flex",
                                                alignItems: "center",
                                                padding: "0",
                                            }}
                                        >
                                            {isExpanded ? (
                                                <ChevronDown size={20} />
                                            ) : (
                                                <ChevronRight size={20} />
                                            )}
                                        </button>
                                        <h3
                                            className="card-title"
                                            title={task.title}
                                        >
                                            {task.title}
                                        </h3>
                                    </div>
                                    <span className="card-id">#{task.id}</span>
                                </div>

                                {isExpanded && task.description && (
                                    <div className="task-description">
                                        <p
                                            style={{
                                                fontSize: "14px",
                                                color: "#42526e",
                                                margin: "0",
                                                fontStyle: "italic",
                                                wordBreak: "break-word",
                                                whiteSpace: "pre-wrap",
                                            }}
                                        >
                                            {task.description}
                                        </p>
                                    </div>
                                )}

                                <div className="card-badges">
                                    <span
                                        className="app-task-status"
                                        data-status={task.etat}
                                    >
                                        {task.etat || "À FAIRE"}
                                    </span>
                                </div>

                                <div className="app-task-folders">
                                    {(isExpanded
                                        ? taskFolders
                                        : taskFolders.slice(0, 2)
                                    ).map((folder) => (
                                        <span
                                            key={folder.id}
                                            className="app-folder-tag"
                                            style={{
                                                backgroundColor:
                                                    folder.color || "#ccc",
                                            }}
                                        >
                                            {folder.title}
                                        </span>
                                    ))}
                                    {!isExpanded && taskFolders.length > 2 && (
                                        <span className="app-folder-more">
                                            +{taskFolders.length - 2}
                                        </span>
                                    )}
                                </div>

                                <div className="card-details">
                                    {isExpanded && (
                                        <div className="detail-row">
                                            <span className="detail-label">
                                                Création:
                                            </span>
                                            <span>
                                                {task.date_creation
                                                    ? new Date(
                                                          task.date_creation,
                                                      ).toLocaleDateString()
                                                    : "-"}
                                            </span>
                                        </div>
                                    )}
                                    <div className="detail-row highlight-date">
                                        <span className="detail-label">
                                            Échéance:
                                        </span>
                                        <span>
                                            {task.date_echeance
                                                ? new Date(
                                                      task.date_echeance,
                                                  ).toLocaleDateString()
                                                : "-"}
                                        </span>
                                    </div>
                                </div>

                                <div
                                    className="card-footer"
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <div className="app-task-assignee">
                                        {task.equipiers &&
                                        task.equipiers.length > 0 ? (
                                            <>
                                                <div
                                                    className="app-avatar"
                                                    title={task.equipiers
                                                        .map((e) => e.name)
                                                        .join(", ")}
                                                >
                                                    {task.equipiers[0].name
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </div>
                                                <span className="assignee-name">
                                                    {task.equipiers[0].name}
                                                    {task.equipiers.length >
                                                        1 &&
                                                        ` (+${task.equipiers.length - 1})`}
                                                </span>
                                            </>
                                        ) : (
                                            <span className="no-assignee">
                                                Non assigné
                                            </span>
                                        )}
                                    </div>
                                    {isExpanded && (
                                        <button
                                            onClick={() => onEditTask(task)}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "5px",
                                                background: "#f4f5f7",
                                                border: "1px solid #dfe1e6",
                                                padding: "5px 10px",
                                                borderRadius: "4px",
                                                cursor: "pointer",
                                                fontSize: "13px",
                                                fontWeight: "600",
                                                color: "#172b4d",
                                            }}
                                        >
                                            <Edit size={14} />
                                            Modifier
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
