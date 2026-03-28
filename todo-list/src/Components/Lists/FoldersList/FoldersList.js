import React, { useState } from "react";
import "../TasksList.css";
import "../FoldersList.css";
import FolderForm from "../../Forms/FolderForm/FolderForm";
import Modal from "../../Modals/Modal";
import { Trash2, Pencil } from "lucide-react";

export default function FoldersList({ folders, setFolders }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingFolder, setEditingFolder] = useState(null);

    const handleEditMenu = (folder) => {
        setEditingFolder(folder);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce dossier ?")) {
            setFolders(folders.filter((f) => f.id !== id));
        }
    };

    const handleSubmit = (folderData) => {
        if (editingFolder) {
            setFolders(
                folders.map((f) =>
                    f.id === editingFolder.id ? { ...f, ...folderData } : f,
                ),
            );
        }
        setIsModalOpen(false);
    };

    return (
        <div className="app-task-list-container">
            <div className="app-list-title">
                <h2>Liste des dossiers</h2>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Modifier le dossier"
            >
                <FolderForm
                    onSubmit={handleSubmit}
                    initialData={editingFolder}
                />
            </Modal>

            {folders.length === 0 ? (
                <p>Aucun dossier à afficher.</p>
            ) : (
                <ul className="app-task-list">
                    <li className="app-task-item app-task-header">
                        <div className="app-folder-col-id">ID</div>
                        <div className="app-folder-col-title">Intitulé</div>
                        <div className="app-folder-col-desc">Description</div>
                        <div className="app-folder-col-color">Couleur</div>
                        <div className="app-folder-col-actions">Actions</div>
                    </li>

                    {folders.map((folder) => (
                        <li key={folder.id} className="app-task-item">
                            <div className="app-folder-col-id">
                                {folder.id}
                            </div>
                            <div
                                className="app-task-title app-folder-col-title"
                                title={folder.title}
                            >
                                {folder.title}
                            </div>
                            <div className="app-folder-col-desc">
                                {folder.description || "-"}
                            </div>
                            <div className="app-folder-col-color">
                                {folder.color && (
                                    <div
                                        className="app-folder-color-circle"
                                        style={{
                                            backgroundColor: folder.color,
                                        }}
                                    ></div>
                                )}
                                <span>{folder.color || "-"}</span>
                            </div>
                            <div className="app-folder-col-actions">
                                <button
                                    onClick={() => handleEditMenu(folder)}
                                    className="app-folder-action-btn"
                                    title="Modifier"
                                >
                                    <Pencil size={15} />
                                </button>
                                <button
                                    onClick={() => handleDelete(folder.id)}
                                    className="app-folder-action-btn"
                                    title="Supprimer"
                                >
                                    <Trash2 size={15} />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
