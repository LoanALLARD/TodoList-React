import React, { useState } from "react";
import "./TasksList.css";
import FolderForm from "./Components/Forms/FolderForm/FolderForm";
import Modal from "./Components/Modals/Modal";
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
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h2>Liste des dossiers</h2>
            </div>

            <div
                className="jira-filters-header"
                style={{ justifyContent: "flex-end" }}
            >
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
                        <div style={{ flex: "0 0 50px" }}>ID</div>
                        <div style={{ flex: "1" }}>Intitulé</div>
                        <div style={{ flex: "2" }}>Description</div>
                        <div style={{ flex: "1" }}>Couleur</div>
                        <div style={{ flex: "0 0 100px", textAlign: "right" }}>
                            Actions
                        </div>
                    </li>

                    {folders.map((folder) => (
                        <li key={folder.id} className="jira-task-item">
                            <div
                                style={{
                                    flex: "0 0 50px",
                                    fontWeight: "bold",
                                    color: "#5e6c84",
                                }}
                            >
                                {folder.id}
                            </div>
                            <div
                                style={{ flex: "1" }}
                                className="jira-task-title"
                                title={folder.title}
                            >
                                {folder.title}
                            </div>
                            <div style={{ flex: "2", color: "#172b4d" }}>
                                {folder.description || "-"}
                            </div>
                            <div
                                style={{
                                    flex: "1",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                }}
                            >
                                {folder.color && (
                                    <div
                                        style={{
                                            width: "16px",
                                            height: "16px",
                                            borderRadius: "50%",
                                            backgroundColor: folder.color,
                                            border: "1px solid #ccc",
                                        }}
                                    ></div>
                                )}
                                <span>{folder.color || "-"}</span>
                            </div>
                            <div
                                style={{
                                    flex: "0 0 100px",
                                    textAlign: "right",
                                }}
                            >
                                <button
                                    onClick={() => handleEditMenu(folder)}
                                    style={{
                                        marginRight: "10px",
                                        cursor: "pointer",
                                        background: "none",
                                        border: "none",
                                    }}
                                    title="Modifier"
                                >
                                    <Pencil size={15} />
                                </button>
                                <button
                                    onClick={() => handleDelete(folder.id)}
                                    style={{
                                        cursor: "pointer",
                                        background: "none",
                                        border: "none",
                                    }}
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
