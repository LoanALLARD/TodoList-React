import React, { useState } from "react";
import "../TasksList.css";
import { ETAT_TERMINE } from "../../../data/etats";
import { ChevronRight, ChevronDown, Edit } from "lucide-react";
import TaskFilters from "./TaskFilters";

export default function TaskList({ tasks, folders, relations, onEditTask }) {
    // Etats pour la recherche texte et le déploiement
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedTasks, setExpandedTasks] = useState(new Set());

    // ── Tri ──
    const [sortField, setSortField] = useState("date_echeance");
    const [sortOrder, setSortOrder] = useState("desc");

    // ── Filtres ──
    const [selectedFolders, setSelectedFolders] = useState(new Set());
    const [selectedEtats, setSelectedEtats] = useState(new Set());
    const [enCoursFilter, setEnCoursFilter] = useState(true);

    // Permet de basculer en mode affichage complet
    const toggleExpand = (taskId) => {
        setExpandedTasks((prev) => {
            const next = new Set(prev);
            if (next.has(taskId)) next.delete(taskId);
            else next.add(taskId);
            return next;
        });
    };

    // ── Callbacks Tri / Filtre ──
    const handleSortChange = (field) => {
        if (field === sortField) {
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortField(field);
            setSortOrder(field === "title" ? "asc" : "desc");
        }
    };

    const handleToggleFolder = (folderId) => {
        setSelectedFolders((prev) => {
            const next = new Set(prev);
            if (next.has(folderId)) next.delete(folderId);
            else next.add(folderId);
            return next;
        });
    };

    const handleToggleEtat = (etat) => {
        setSelectedEtats((prev) => {
            const next = new Set(prev);
            if (next.has(etat)) next.delete(etat);
            else next.add(etat);
            return next;
        });
    };

    const handleToggleEnCours = () => {
        setEnCoursFilter((prev) => !prev);
    };

    // Récupération des dossiers associés aux tâches
    const getTaskFolders = (taskId) => {
        const relatedFolderIds = relations
            .filter((rel) => rel.tache === taskId)
            .map((rel) => rel.dossier);

        return folders.filter((d) => relatedFolderIds.includes(d.id));
    };

    // ── Filtrage des tâches ──
    let filteredTasks = tasks.filter((task) => {
        // Recherche texte
        const titleMatch = task.title ? task.title.toLowerCase() : "";
        const idMatch = task.id ? task.id.toString() : "";
        const searchTarget = searchTerm.toLowerCase();
        const matchSearch =
            titleMatch.includes(searchTarget) || idMatch.includes(searchTarget);

        // Filtre "En cours" (prioritaire)
        let matchStatus = true;
        if (enCoursFilter) {
            matchStatus = !ETAT_TERMINE.includes(task.etat);
        } else if (selectedEtats.size > 0) {
            matchStatus = selectedEtats.has(task.etat);
        }

        // Filtre par dossiers
        let matchFolders = true;
        if (selectedFolders.size > 0) {
            const taskFolderIds = relations
                .filter((rel) => rel.tache === task.id)
                .map((rel) => rel.dossier);
            matchFolders = taskFolderIds.some((fid) =>
                selectedFolders.has(fid),
            );
        }

        return matchSearch && matchStatus && matchFolders;
    });

    // ── Tri dynamique ──
    filteredTasks.sort((a, b) => {
        let valA, valB;

        if (sortField === "title") {
            valA = (a.title || "").toLowerCase();
            valB = (b.title || "").toLowerCase();
            const cmp = valA.localeCompare(valB, "fr");
            return sortOrder === "asc" ? cmp : -cmp;
        }

        valA = a[sortField] ? new Date(a[sortField]) : null;
        valB = b[sortField] ? new Date(b[sortField]) : null;

        if (!valA && !valB) return 0;
        if (!valA) return 1;
        if (!valB) return -1;

        const cmp = valA - valB;
        return sortOrder === "asc" ? cmp : -cmp;
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
            </div>

            <TaskFilters
                folders={folders}
                sortField={sortField}
                sortOrder={sortOrder}
                onSortChange={handleSortChange}
                selectedFolders={selectedFolders}
                onToggleFolder={handleToggleFolder}
                selectedEtats={selectedEtats}
                onToggleEtat={handleToggleEtat}
                enCoursFilter={enCoursFilter}
                onToggleEnCours={handleToggleEnCours}
            />

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
