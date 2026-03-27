import { useState } from "react";
import "./App.css";
import TaskForm from "./Components/Forms/TaskForm";
import TaskList from "./TasksList";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

import Backup from "./data/backup.json";

function App() {
    return (
        <div className="App">
            {/* Header */}
            <Header />

            {/* Liste des tâches */}
            {!Backup.taches || Backup.taches.length === 0 ? (
                <p>Aucune tâche à afficher.</p>
            ) : (
                <TaskList tasks={Backup.taches} />
            )}

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default App;
