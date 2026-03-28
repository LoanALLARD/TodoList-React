import { ETATS } from "../../../data/etats";
import "../forms.css";

export default function TaskForm({ onSubmit }) {
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const task = formData.get("task");
        const description = formData.get("description");
        const creationDate = Date.now();
        const dueDate = formData.get("dueDate");
        const assignees = formData.getAll("assignees");
        const status = formData.get("status");
        onSubmit({
            title: task,
            description: description || "",
            date_creation: new Date().toISOString().split("T")[0],
            date_echeance: dueDate,
            etat: status,
            equipiers: assignees.map((name) => ({ name })),
        });
        event.target.reset();
    };

    return (
        <form onSubmit={handleSubmit} className="modal-form">
            <div className="form-group">
                <label className="form-label">Intitulé de la tâche</label>
                <input
                    type="text"
                    name="task"
                    className="form-input"
                    placeholder="Intitulé..."
                    required
                />
            </div>

            <div className="form-group">
                <label className="form-label">Description de la tâche</label>
                <textarea
                    name="description"
                    className="form-textarea"
                    placeholder="Description..."
                    required
                />
            </div>

            <div className="form-group">
                <label className="form-label">Date d'échéance</label>
                <input
                    type="date"
                    name="dueDate"
                    className="form-input"
                    required
                />
            </div>

            <div className="form-group">
                <label className="form-label">Liste des équipiers</label>
                <select
                    name="assignees"
                    className="form-select"
                    multiple
                    required
                >
                    <option value="user1">Utilisateur 1</option>
                    <option value="user2">Utilisateur 2</option>
                    <option value="user3">Utilisateur 3</option>
                </select>
            </div>

            <div className="form-group">
                <label className="form-label">Statut de la tâche</label>
                <select name="status" className="form-select" required>
                    {ETATS &&
                        Object.values(ETATS).map((etat) => (
                            <option key={etat} value={etat}>
                                {etat}
                            </option>
                        ))}
                </select>
            </div>

            <button type="submit" className="form-submit-btn">
                Valider la création
            </button>
        </form>
    );
}
