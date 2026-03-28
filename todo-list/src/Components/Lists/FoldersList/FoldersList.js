import React, { useState } from "react";
import "../TasksList.css";
import "../FoldersList.css";
import FolderForm from "../../Forms/FolderForm/FolderForm";
import Modal from "../../Modals/Modal";
import { Trash2, Pencil } from "lucide-react";

export default function FoldersList({ initialFolders }) {
    const [folders, setFolders] = useState(initialFolders || []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingFolder, setEditingFolder] = useState(null);

    const handleCreateMenu = () => {
        setEditingFolder(null);
        setIsModalOpen(true);
    };

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
        } else {
            const newId =
                folders.length > 0
                    ? Math.max(...folders.map((f) => f.id)) + 1
                    : 201;
            setFolders([...folders, { id: newId, ...folderData }]);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="jira-task-list-container">
            <div className="jira-list-title">
                <h2>Liste des dossiers</h2>
            </div>

            <div className="jira-filters-header folders-filters">
                <button onClick={handleCreateMenu} className="create-task-btn">
                    Créer un dossier
                </button>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={
                    editingFolder ? "Modifier le dossier" : "Nouveau dossier"
                }
            >
                <FolderForm
                    onSubmit={handleSubmit}
                    initialData={editingFolder}
                />
            </Modal>

            {folders.length === 0 ? (
                <p>Aucun dossier à afficher.</p>
            ) : (
                <ul className="jira-task-list">
                    <li className="jira-task-item jira-task-header">
                        <div className="jira-folder-col-id">ID</div>
                        <div className="jira-folder-col-title">Intitulé</div>
                        <div className="jira-folder-col-desc">Description</div>
                        <div className="jira-folder-col-color">Couleur</div>
                        <div className="jira-folder-col-actions">Actions</div>
                    </li>

                    {folders.map((folder) => (
                        <li key={folder.id} className="jira-task-item">
                            <div className="jira-folder-col-id">
                                {folder.id}
                            </div>
                            <div
                                className="jira-task-title jira-folder-col-title"
                                title={folder.title}
                            >
                                {folder.title}
                            </div>
                            <div className="jira-folder-col-desc">
                                {folder.description || "-"}
                            </div>
                            <div className="jira-folder-col-color">
                                {folder.color && (
                                    <div
                                        className="jira-folder-color-circle"
                                        style={{
                                            backgroundColor: folder.color,
                                        }}
                                    ></div>
                                )}
                                <span>{folder.color || "-"}</span>
                            </div>
                            <div className="jira-folder-col-actions">
                                <button
                                    onClick={() => handleEditMenu(folder)}
                                    className="jira-folder-action-btn"
                                    title="Modifier"
                                >
                                    <Pencil size={15} />
                                </button>
                                <button
                                    onClick={() => handleDelete(folder.id)}
                                    className="jira-folder-action-btn"
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
