export default function TaskList({ tasks }) {
    return (
        <div>
            <h2>Liste des tâches</h2>
            {tasks.length === 0 ? (
                <p>Aucune tâche à afficher.</p>
            ) : (
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id}>
                            Identifiant: {task.id} - Tâche: {task.title}-
                            Statut: {task.status} - Date d'échéance:
                            {task.date_echeance} - Date de création:{" "}
                            {task.date_creation} - Status: {task.etat} - Assigné
                            à: {task.equipiers ? task.equipiers.map(e => e.name).join(", ") : "Personne"}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
