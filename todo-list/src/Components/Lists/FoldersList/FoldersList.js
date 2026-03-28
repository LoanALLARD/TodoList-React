import React, { useState } from "react";
import "../FoldersList.css";

export default function FoldersList({ folders, relations }) {
    const [searchTerm, setSearchTerm] = useState("");

    let filteredFolders = folders.filter((folder) => {
        const titleMatch = folder.title ? folder.title.toLowerCase() : "";
        const idMatch = folder.id ? folder.id.toString() : "";
        const searchTarget = searchTerm.toLowerCase();
        return (
            titleMatch.includes(searchTarget) || idMatch.includes(searchTarget)
        );
    });

    const getFolderTasksCount = (folderId) => {
        return relations.filter((rel) => rel.dossier === folderId).length;
    };

    return (
        <div className="app-list-container">
            <h2 className="app-list-title">Liste des dossiers</h2>

            <div className="app-filters-header">
                <input
                    type="text"
                    placeholder="Filtrer par nom ou ID..."
                    className="filter-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {filteredFolders.length === 0 ? (
                <p>Aucun dossier à afficher.</p>
            ) : (
                <div className="cards-grid">
                    {filteredFolders.map((folder) => (
                        <div
                            key={folder.id}
                            className="item-card folder-card"
                            style={{
                                borderTop: `4px solid ${folder.color || "#0366d6"}`,
                            }}
                        >
                            <div className="card-header">
                                <h3 className="card-title" title={folder.title}>
                                    {folder.title}
                                </h3>
                                <span className="card-id">#{folder.id}</span>
                            </div>

                            <div className="card-details folder-details">
                                <div className="detail-row">
                                    <span className="detail-label">
                                        Nombre de tâches:
                                    </span>
                                    <span className="folder-count">
                                        {getFolderTasksCount(folder.id)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
