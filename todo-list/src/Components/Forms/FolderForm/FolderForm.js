import "../forms.css";

export default function FolderForm({ onSubmit, initialData }) {
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const folderData = {
            title: formData.get("intitule"),
            description: formData.get("description"),
            color: formData.get("color"),
        };
        onSubmit(folderData);
    };

    return (
        <form onSubmit={handleSubmit} className="modal-form">
            <div className="form-group">
                <label className="form-label" htmlFor="intitule">
                    Intitulé du dossier
                </label>
                <input
                    type="text"
                    id="intitule"
                    name="intitule"
                    className="form-input"
                    placeholder="Intitulé..."
                    defaultValue={initialData?.title || ""}
                    required
                />
            </div>

            <div className="form-group">
                <label className="form-label" htmlFor="description">
                    Description du dossier
                </label>
                <textarea
                    id="description"
                    name="description"
                    className="form-textarea"
                    placeholder="Description..."
                    defaultValue={initialData?.description || ""}
                />
            </div>

            <div className="form-group">
                <label className="form-label">Couleur du dossier</label>
                <input
                    type="color"
                    name="color"
                    className="form-color-picker"
                    defaultValue={initialData?.color || "#000000"}
                />
            </div>

            <button type="submit" className="form-submit-btn">
                {initialData ? "Modifier" : "Créer le dossier"}
            </button>
        </form>
    );
}
