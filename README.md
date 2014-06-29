EpsiSearchEngine
================

###I Technologies
* AngularJS (Client)
* NodeJS (Serveur)
* Base NoSQL: 
* MongoDB
* Redis (intermédiaire entre fichiers et MongoDB)
* Python/RQ (Job runners qui insert les fichiers pdf dans Redis)

###II Organisation
* Un dossier sur le serveur contient les mémoires au format PDF.
* Des jobs sont stockés dans Redis (via RQ) et chaque job indexe un fichier PDF dans la base mongoDB.
* Le serveur contient les méthodes relatives à la recherche (/search/:query).
* Le client affiche une barre de recherche ainsi que les résultats de la recherche effectuée (avec système d’auto-complétion, de “mémoire de recherche” avec des poids pour chaque document)


###III Fonctionnement

* Script init :
    * démarre le serveur, mongoDB, redis, RQ
    * clone le dossier github
    * lance les job runners
    * remplit mongoDB avec les pdf du dossier

* Côté serveur :
    * Enregistrement des PDFs (pour un nouveau PDF) :
        * Ajout d’un job dans RQ
        * Lorsque le job est traité:
    * extraction du contenu du PDF
    * extraction des métadonnées avec TIKA
        * Enregistrement dans mongoDB du texte est des métadonnées

* Requête de recherche :
    * Parsing de la requête (gestion des bangs)
    * recherche dans mongo index full-text.

* Auto-complétion :
    * enregistre les mots d’une requête dans Redis
    * charge la liste des mots dans le client

* Côté client :
    * Recherche
        * barre de recherche classique + bang
        * affichage des résultats, extrait du PDF + lien de téléchargement.
    * Upload de PDF
