import React from "react";
import { ETATS } from "../../../data/etats";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

/**
 * Barre de Tri / Filtre affichée au-dessus de la liste des tâches.
 *
 * Props :
 *  - folders           : liste des dossiers disponibles
 *  - sortField         : champ de tri actuel ("date_echeance" | "date_creation" | "title")
 *  - sortOrder         : "asc" | "desc"
 *  - onSortChange      : callback(field)
 *  - selectedFolders   : Set d'IDs de dossiers sélectionnés
 *  - onToggleFolder    : callback(folderId)
 *  - selectedEtats     : Set d'états sélectionnés
 *  - onToggleEtat      : callback(etat)
 *  - enCoursFilter     : boolean (filtre "En cours" actif)
 *  - onToggleEnCours   : callback()
 */
export default function TaskFilters({
    folders,
    sortField,
    sortOrder,
    onSortChange,
    selectedFolders,
    onToggleFolder,
    selectedEtats,
    onToggleEtat,
    enCoursFilter,
    onToggleEnCours,
}) {
    const sortOptions = [
        { field: "date_creation", label: "Date création" },
        { field: "date_echeance", label: "Date échéance" },
        { field: "title", label: "Nom" },
    ];

    const SortIcon = ({ field }) => {
        if (sortField !== field) return <ArrowUpDown size={14} />;
        return sortOrder === "asc" ? (
            <ArrowUp size={14} />
        ) : (
            <ArrowDown size={14} />
        );
    };

    return (
        <div className="task-filters-bar">
            {/* ── Tri ── */}
            <div className="filter-section">
                <span className="filter-section-label">Tri</span>
                <div className="filter-chips">
                    {sortOptions.map((opt) => (
                        <button
                            key={opt.field}
                            className={`sort-btn ${sortField === opt.field ? "active" : ""}`}
                            onClick={() => onSortChange(opt.field)}
                            title={`Trier par ${opt.label}`}
                        >
                            <SortIcon field={opt.field} />
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Filtre Dossiers ── */}
            {folders.length > 0 && (
                <div className="filter-section">
                    <span className="filter-section-label">Dossiers</span>
                    <div className="filter-chips">
                        {folders.map((folder) => (
                            <button
                                key={folder.id}
                                className={`filter-chip ${selectedFolders.has(folder.id) ? "active" : ""}`}
                                onClick={() => onToggleFolder(folder.id)}
                                style={
                                    selectedFolders.has(folder.id)
                                        ? {
                                              backgroundColor:
                                                  folder.color || "#0052cc",
                                              color: "white",
                                              borderColor:
                                                  folder.color || "#0052cc",
                                          }
                                        : {}
                                }
                            >
                                {folder.title}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* ── Filtre États ── */}
            <div className="filter-section">
                <span className="filter-section-label">États</span>
                <div className="filter-chips">
                    {Object.values(ETATS).map((etat) => (
                        <button
                            key={etat}
                            className={`filter-chip ${selectedEtats.has(etat) ? "active" : ""}`}
                            onClick={() => onToggleEtat(etat)}
                            disabled={enCoursFilter}
                        >
                            {etat}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Filtre En cours ── */}
            <div className="filter-section">
                <span className="filter-section-label">Filtre rapide</span>
                <div className="filter-chips">
                    <button
                        className={`filter-chip en-cours-chip ${enCoursFilter ? "active" : ""}`}
                        onClick={onToggleEnCours}
                    >
                        En cours
                    </button>
                </div>
            </div>
        </div>
    );
}
