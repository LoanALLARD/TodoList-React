# TodoList-React

## Informations sur le travail réalisé

### Header

- Utilisations de hook react pour les calculs de totaux
- Utilisation de CSS pour le graphique de répartition des tâches par état

### Listes

- Utilisation de lucid-react pour les icones qui apparaissent
- Les composants formulaires apparaissent tous dans une modale, qui est elle définie dans le composant `<Modal>`

## Consignes

Fonctionnalités retenues pour le Todo-List :

- ✅ Lorsque j'arrive sur l'application, je charge par défaut le backup (fichier JSON). En option, on me propose de repartir de zéro, avec une confirmation utilisateur demandée pour le reset (ex: Etes-vous sûr(e) ?).
- ✅ Par défaut, je suis en mode Tache et je vois toutes les Taches non terminées ("filtre actif par défaut" = tache.etat ne se trouve pas dans ETAT_TERMINE). Je vois les Taches en cours, avec les 2 premières catégories (mode simple), triées par date d'échéance décroissante.
- ✅ En option, je peux basculer sur la vue des Dossiers à l'aide d'un bouton de mon choix ; je gère ensuite les dossiers avec les méthodes CRUD standards.
- ❌ Juste au-dessus de la liste des Taches, si je suis en mode Tache (condition utile uniquement si option / par défaut sinon), j'ai accès aux élément de Tri / Filtre. Je peux trier par Date création, Date échéance, Nom. Je peux aussi filtrer par Dossiers (0, 1 ou n), Etats (0, 1 ou n), ou En cours (le "filtre actif par défaut") ; chaque action sur un élément du filtre en change son statut.
- ✅ En haut de la page (Header), je vois le Nb total de Taches (sans filtre), et le Nb non finis (cf "filtre par défaut"). En option, j'ai un camembert qui me donne la répartition exacte par Etat (dans la liste des Enums).
- ❌ En bas de page (Footer), j'ai un bouton "+" qui permet d'afficher dans une popup (composant Modal), le formulaire de création de Tache (Task). En option, je peux ajouter un Dossier (Folder).
- ❌ Chaque Tache affiche le titre, la date d'échéance ainsi que les 2 premiers dossier ("mode Simple"). Un triangle permet de basculer en "mode Complet", ce qui affiche tous les dossiers et la description. En option, un clic sur un dossier permet d'activer un filtre dessus.
- ❌ En mode Complet, je peux également ajouter un dossier ou basculer en mode édition afin de modifier les champs utiles (titre, description et date échéance)
- ❌ En option, les taches dont la date d'échéance est passée depuis une semaine ne sont plus affichées

## Proposition de WireFrame :

- Composants : App, Header, Footer, Todo, List, Filtre, Tri, Tache ...

## Précisions :

- Si on relance l'application, on perd nos modifications en cours => c'est normal !!
- Chaque composant est dans un fichier avec son nom ; si j'ai du CSS à part, je mets les 2 dans un dossier au nom du composant
