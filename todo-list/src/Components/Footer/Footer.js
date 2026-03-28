import React from "react";
import { Plus } from "lucide-react";
import "./footer.css";

export default function Footer({ onAddClick }) {
    return (
        <footer className="app-footer">
            <p>© 2024 Taskly. Tous droits réservés.</p>
            <button className="fab-button" onClick={onAddClick} title="Ajouter">
                <Plus size={24} />
            </button>
        </footer>
    );
}
