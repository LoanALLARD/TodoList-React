export default function FolderForm({ onSubmit }) {
    const handleSubmit = (event) => {
        event.preventDefault();
        const folderName = event.target.elements.folderName.value;
        onSubmit(folderName);
    };

    return (
        <form onSubmit={handleSubmit}>
            <p>Intitulé du dossier</p>
            <input
                type="text"
                id="intitule"
                name="intitule"
                placeholder="Intitulé..."
                required
            />
            <p>Description du dossier</p>
            <input
                type="text"
                id="description"
                name="description"
                placeholder="Description..."
            />
            <p>Couleur du dossier</p>

            <button type="submit">Créer le dossier</button>
        </form>
    );
}
