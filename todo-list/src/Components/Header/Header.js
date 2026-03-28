import { ETATS } from "../../data/etats";
import "./header.css";

export default function Header({ tasks, onReset }) {
    const totalTasks = tasks.length;
    const pendingTasks = tasks.filter(
        (t) => t.etat !== "Réussi" && t.etat !== "Terminé",
    ).length;

    // Répartition
    const stats = {};
    Object.values(ETATS).forEach((etat) => {
        stats[etat] = 0;
    });

    tasks.forEach((t) => {
        if (stats[t.etat] !== undefined) {
            stats[t.etat]++;
        } else if (!t.etat) {
            stats[ETATS.NOUVEAU]++;
        }
    });

    // Colors mapping
    const COLORS = {
        [ETATS.NOUVEAU]: "#0052cc",
        [ETATS.EN_COURS]: "#ff991f",
        [ETATS.REUSSI]: "#00875a",
        [ETATS.EN_ATTENTE]: "#5e6c84",
        [ETATS.ABANDONNE]: "#de350b",
    };

    let currentAngle = 0;
    const segments = Object.values(ETATS)
        .map((etat) => {
            const count = stats[etat];
            const percentage = totalTasks > 0 ? (count / totalTasks) * 360 : 0;
            const segment = `${COLORS[etat]} ${currentAngle}deg ${currentAngle + Math.max(0.1, percentage)}deg`;
            currentAngle += percentage;
            return segment;
        })
        .join(", ");

    const pieStyle = {
        background: `conic-gradient(${segments})`,
        width: "150px",
        height: "150px",
        borderRadius: "50%",
    };

    return (
        <header className="header-container">
            <div className="header-top-row">
                <h1 className="header-title">Tableau de bord</h1>
                <button className="reset-button" onClick={onReset}>
                    Repartir de zéro
                </button>
            </div>
            <div className="header-layout">
                <div className="header-cards">
                    <div className="header-card">
                        <span className="card-title">Toutes les tâches</span>
                        <span className="card-value">{totalTasks}</span>
                    </div>
                    <div className="header-card">
                        <span className="card-title">Tâches non terminées</span>
                        <span className="card-value warning">
                            {pendingTasks}
                        </span>
                    </div>
                </div>

                <div className="chart-container header-card">
                    <h2 className="card-title">Répartition par État</h2>
                    <div className="chart-wrapper">
                        <div className="pie-chart" style={pieStyle}></div>
                        <div className="chart-legend">
                            {Object.values(ETATS).map((etat) => (
                                <div key={etat} className="legend-item">
                                    <span
                                        className="legend-color"
                                        style={{
                                            backgroundColor: COLORS[etat],
                                        }}
                                    ></span>
                                    <span className="legend-label">
                                        {etat} : {stats[etat]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
