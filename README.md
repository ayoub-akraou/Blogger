# Blogger - Plateforme de Blogging Moderne

## 🌟 Présentation du projet

Blogger est une plateforme de blogging moderne développée comme une Single Page Application (SPA), offrant une expérience utilisateur fluide et réactive. Le projet permet aux utilisateurs de créer, gérer et interagir avec du contenu de blog, avec des fonctionnalités spécifiques selon leur rôle (utilisateur standard, auteur ou administrateur).

La plateforme met l'accent sur la performance, l'expérience utilisateur et la modularité, en séparant clairement le frontend et le backend via une API RESTful.

## 🏗️ Architecture

Blogger utilise une architecture moderne basée sur:

- **Frontend**: Application React.js (SPA) avec gestion d'état client
- **Backend**: API RESTful développée avec Laravel
- **Base de données**: MySQL pour le stockage des données
- **Authentification**: Sanctum pour la gestion des tokens et sessions

Cette architecture SPA offre plusieurs avantages par rapport aux applications traditionnelles avec rendu côté serveur (SSR):
- Navigation instantanée sans rechargement de page
- Réduction du trafic réseau (seules les données JSON sont échangées après le chargement initial)
- Interfaces utilisateur riches et interactives
- Séparation claire des préoccupations (frontend/backend)

## ✨ Fonctionnalités

### Pour tous les utilisateurs
- Parcourir les blogs publiés
- Rechercher des blogs par titre, contenu ou auteur
- Consulter les profils des auteurs
- Créer un compte et se connecter
- Consulter les statistiques globales

### Pour les auteurs
- Tableau de bord auteur personnalisé
- Création et gestion de blogs
- Publication/dépublication de blogs
- Ajout de catégories et tags aux blogs
- Suivi des statistiques de leurs blogs (vues, likes)

### Pour les administrateurs
- Tableau de bord d'administration complet
- Gestion des utilisateurs (approbation des auteurs, activation/suspension)
- Modération du contenu (activation/suspension des blogs)
- Gestion des catégories et tags
- Accès aux statistiques globales détaillées

### Fonctionnalités générales
- Système de likes/dislikes
- Commentaires sur les blogs
- Système de suivi d'auteurs (follow/unfollow)
- Catégorisation et tagging des blogs
- Statistiques et analytiques

## 🛠️ Technologies utilisées

### Frontend
- **React.js**: Bibliothèque JavaScript pour l'interface utilisateur
- **React Router**: Navigation entre les pages
- **Tailwind CSS**: Framework CSS pour le design
- **Chart.js**: Visualisation des données et statistiques
- **Vite**: Outil de build rapide

### Backend
- **Laravel**: Framework PHP pour l'API
- **Sanctum**: Authentification et protection des routes
- **Eloquent ORM**: Gestion des modèles et relations
- **MySQL**: Base de données relationnelle

### Outils de développement
- **Git & GitHub**: Gestion de version et collaboration
- **Postman**: Tests des endpoints API
- **VS Code**: Environnement de développement

## 🚀 Installation

### Prérequis
- PHP 8.1 ou supérieur
- Composer
- Node.js 16 ou supérieur
- MySQL 5.7 ou supérieur

### Installation du Backend

```bash
# Cloner le dépôt
git clone https://github.com/votre-username/blogger.git
cd blogger/backend

# Installer les dépendances
composer install

# Configurer l'environnement
cp .env.example .env
php artisan key:generate

# Configurer la base de données dans .env
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=blogger
# DB_USERNAME=root
# DB_PASSWORD=

# Migrer et peupler la base de données
php artisan migrate --seed

# Démarrer le serveur
php artisan serve
```

### Installation du Frontend

```bash
# Dans un nouveau terminal
cd blogger/frontend

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

L'application sera accessible à l'adresse http://localhost:5173 et l'API à http://localhost:8000.

## 📂 Structure du projet

### Structure du Backend (Laravel)

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/      # Contrôleurs de l'API
│   │   └── Middleware/       # Middleware d'authentification et autres
│   └── Models/               # Modèles Eloquent
├── config/                   # Configuration
├── database/
│   ├── migrations/           # Migrations de base de données
│   └── seeders/              # Seeders pour les données initiales
├── routes/
│   └── api.php               # Définition des routes API
└── ...
```

### Structure du Frontend (React)

```
frontend/
├── public/                   # Ressources statiques
├── src/
│   ├── api/                  # Services API
│   ├── components/           # Composants réutilisables
│   │   ├── UI/               # Composants d'interface utilisateur
│   │   └── layouts/          # Layouts et templates
│   ├── pages/                # Pages de l'application
│   └── App.jsx               # Composant racine
└── ...
```

## 📡 API Endpoints

### Authentification
- `POST /api/register` - Inscription
- `POST /api/login` - Connexion
- `POST /api/logout` - Déconnexion (authentifié)

### Utilisateurs
- `GET /api/users` - Liste des utilisateurs
- `GET /api/users/{user}` - Détails d'un utilisateur
- `PUT /api/users/{user}` - Mise à jour d'un utilisateur
- `DELETE /api/users/{user}` - Suppression d'un utilisateur
- `POST /api/users/{author}/follow` - Suivre un auteur
- `POST /api/users/{author}/unfollow` - Ne plus suivre un auteur

### Blogs
- `GET /api/blogs` - Liste des blogs
- `POST /api/blogs` - Créer un blog
- `GET /api/blogs/{blog}` - Détails d'un blog
- `PUT /api/blogs/{blog}` - Mettre à jour un blog
- `DELETE /api/blogs/{blog}` - Supprimer un blog
- `PATCH /api/blogs/{blog}/publish` - Publier un blog
- `PATCH /api/blogs/{blog}/unpublish` - Dépublier un blog
- `POST /api/blogs/{blog}/like` - Liker un blog
- `POST /api/blogs/{blog}/dislike` - Disliker un blog
- `GET /api/blogs/search` - Rechercher des blogs

### Catégories et Tags
- `GET /api/categories` - Liste des catégories
- `POST /api/categories` - Créer une catégorie
- `GET /api/tags` - Liste des tags
- `POST /api/tags` - Créer un tag

### Administration
- `PATCH /api/admin/approve-author/{user}` - Approuver un auteur
- `PATCH /api/admin/reject-author/{user}` - Rejeter un auteur
- `GET /api/admin/statistics` - Statistiques globales

## 👥 Rôles et permissions

### Utilisateur standard
- Peut consulter les blogs publiés
- Peut s'inscrire et se connecter
- Peut commenter les blogs
- Peut liker/disliker les blogs
- Peut suivre des auteurs
- Peut demander à devenir auteur

### Auteur
- Toutes les permissions d'un utilisateur standard
- Peut créer des blogs
- Peut gérer ses propres blogs
- Peut publier/dépublier ses blogs
- Peut voir les statistiques de ses blogs

### Administrateur
- Toutes les permissions d'un auteur
- Peut gérer tous les utilisateurs
- Peut approuver/rejeter les demandes d'auteur
- Peut activer/suspendre des utilisateurs
- Peut modérer tous les blogs
- Peut gérer les catégories et tags
- Peut accéder aux statistiques globales

---

© 2025 Blogger. Tous droits réservés.
