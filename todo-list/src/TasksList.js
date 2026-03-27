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
                            Identifiant: {task.id} - Tâche: {task.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
