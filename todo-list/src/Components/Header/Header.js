import Backup from "../../data/backup";
import "./Header.css";

export default function Header() {
    const totalTasks = Backup.taches.length;
    const pendingTasks = Backup.taches.filter(
        (t) => t.etat !== "Réussi" && t.etat !== "Terminé",
    ).length;

    return (
        <header className="header-container">
            <h1 className="header-title">Tableau de bord</h1>
            <div className="header-cards">
                <div className="header-card">
                    <span className="card-title">Toutes les tâches</span>
                    <span className="card-value">{totalTasks}</span>
                </div>
                <div className="header-card">
                    <span className="card-title">Tâches non terminées</span>
                    <span className="card-value warning">{pendingTasks}</span>
                </div>
            </div>
        </header>
    );
}
