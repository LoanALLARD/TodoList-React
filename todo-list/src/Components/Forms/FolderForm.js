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
        <form onSubmit={handleSubmit}>
            <p>Intitulé du dossier</p>
            <input
                type="text"
                id="intitule"
                name="intitule"
                placeholder="Intitulé..."
                defaultValue={initialData?.title || ""}
                required
            />
            <p>Description du dossier</p>
            <input
                type="text"
                id="description"
                name="description"
                placeholder="Description..."
                defaultValue={initialData?.description || ""}
            />
            <p>Couleur du dossier</p>
            <input
                type="color"
                name="color"
                defaultValue={initialData?.color || "#000000"}
            />
            <br />
            <br />
            <button type="submit">
                {initialData ? "Modifier" : "Créer le dossier"}
            </button>
        </form>
    );
}
