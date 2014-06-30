EpsiSearchEngine
================

#Insctructions

* [Télécharger la VM VirtualBox](http://bit.ly/V15dJJ)
* Login: root/root
* Lancer le script d'initialisation: `/var/init.sh`
* Récupérer l'adresse ip du serveur avec `ifconfig`
* Aller sur l'addresse http://{ip}/client

##I. Technologies
* **AngularJS** (Client)
* **NodeJS** (Serveur HTTP)
* **MongoDB** (Contient les fichiers pdfs indexés)
* **Redis** (Utilisé pour les jobs et l'autocomplétion)
* **Python/RQ** (Job runners qui indexent les fichiers pdf dans MongoDB (se base sur Redis))

##II. Organisation
* Un dossier sur le serveur contient les mémoires au format PDF.
* Des jobs sont stockés dans Redis (via RQ) et chaque job indexe un fichier PDF dans la base mongoDB.
* Le serveur HTTP contient les méthodes relatives à la recherche (/search/:query).
* Le client affiche une barre de recherche ainsi que les résultats de la recherche effectuée (avec système d’auto-complétion, et possibilité d'uploader un fichier PDF)


##III. Fonctionnement
* **MongoDB**:
   * Contient les metadatas ainsi que le contenu des pdfs
   * Index FullText sur le contenu pour faciliter la recherche
* **Python/RQ**
   * Possibilité de créer des jobs
   * Un job lit un fichier PDF et extrait ses informations (Tika) et l'insère dans MongoDB
* **Redis**
   * Contient la liste des jobs RQ
   * Contient un historique des recherches avec leur score (Sorted Set)
* **NodeJS** (Reçoit les requêtes HTTP)
   * `/search/:query` : Effectue une recherche sur MongoDB et retourne le résultat
   * `/upload` : Upload un fichier PDF et crée un job avec RQ pour l'indexer plus tard
   * `/autocomplete` : Récupère la liste des recherches les plus effectués rangés par score
* **AngularJS** (Client)
   * Barre de recherche (avec autocomplétion)
   * Formulaire d'upload
   * Affichage des résultats de la recherche (avec le début du contenu du mémoire)
   * Possibilité de télécharger le mémoire (exposé sur Apache)

##IV. Bonus

### Bangs

Nous avons utilisé la notion de bang similaire à DuckDuckGo. Les bangs disponibles sont affichés sur le client.

Exemple: `Maxime !a` effectue une recherche par auteur et va retourner les pdfs écrits par Maxime.

### Autocomplétion

A chaque recherche effectuée, on incrémente le score de la recherche. Lorsque le client se connecte, il récupère la liste des recherche précédentes rangés par score.

Ainsi, lorsque le client tape une recherche, il aura comme proposition les recherches précédentes les plus effectuées et donc les plus intéressantes.

### Upload

Notre système de traitement des fichiers PDF par job nous permet d'en ajouter facilement (ici par upload).

Les workers de job (rqworker) peuvent être sur des machines différentes et optimiser la vitesse de traitement des pdfs (scalabitilité horizontale)
