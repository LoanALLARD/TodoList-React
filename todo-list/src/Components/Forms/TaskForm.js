import { ETATS } from "../../data/etats";

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
            task,
            description,
            creationDate,
            dueDate,
            assignees,
            status,
        });
        event.target.reset();
    };

    return (
        <form onSubmit={handleSubmit}>
            <p>Intutilé de la tâche</p>
            <input type="text" name="task" placeholder="Intitulé..." required />
            <p>Description de la tâche</p>
            <input
                type="text"
                name="description"
                placeholder="Description..."
                required
            />
            <p>Date d'échéance</p>
            <input type="date" name="dueDate" required />

            <p>Liste des équipiers</p>
            <select name="assignees" multiple required>
                <option value="user1">Utilisateur 1</option>
                <option value="user2">Utilisateur 2</option>
                <option value="user3">Utilisateur 3</option>
            </select>

            <p>Statut de la tâche</p>
            <select name="status" required>
                {ETATS &&
                    Object.values(ETATS).map((etat) => (
                        <option key={etat} value={etat}>
                            {etat}
                        </option>
                    ))}
            </select>
            <button type="submit">Valider la création</button>
        </form>
    );
}
