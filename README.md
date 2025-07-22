# QANuxt - Interface Frontend

## 🎯 Description

Interface frontend Nuxt.js pour l'application de login, connectée à l'API backend.

## 🚀 Fonctionnalités

- ✅ **Formulaire de login** avec email et mot de passe
- ✅ **Appel API** `/login` (locale)
- ✅ **Gestion des états** : succès, erreurs (401, 404)
- ✅ **Interface responsive** avec Tailwind CSS
- ✅ **Messages d'alerte** pour les succès et erreurs

## 📋 Prérequis

1. **Backend API** doit être démarré sur `http://localhost:3000`
2. **Node.js** et **npm** installés

## 🛠️ Installation

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

## 🌐 Utilisation

1. **Démarrer le backend** (dans le répertoire QA) :
   ```bash
   cd ../QA
   npm start
   ```

2. **Démarrer le frontend** (dans ce répertoire) :
   ```bash
   npm run dev
   ```

3. **Accéder à l'application** : `http://localhost:3001`

## 🎨 Interface

### Formulaire de Login
- **Champs requis** : Email et mot de passe
- **Validation** : Email format valide
- **Bouton** : "Se connecter" avec état de chargement

### Messages d'État
- **Succès** : Message "Bienvenue [email] !" en vert
- **Erreur 401** : "Mot de passe incorrect" en rouge
- **Erreur 404** : "Utilisateur non trouvé" en rouge
- **Erreur réseau** : "Erreur de connexion au serveur" en rouge

## 🔧 Configuration

### Variables d'environnement
- `API_BASE` : URL de l'API (défaut: `http://localhost:3000`)

### Structure des fichiers
```
QANuxt/
├── app/
│   └── app.vue          # Page principale
├── components/
│   ├── IconCheckCircle.vue
│   └── IconExclamationTriangle.vue
├── assets/
│   └── css/
│       └── main.css     # Styles Tailwind
└── nuxt.config.ts       # Configuration Nuxt
```

## 🧪 Tests

L'interface est conçue pour fonctionner avec l'API backend testée dans le répertoire QA.

### Cas de test supportés
- ✅ Login réussi → Message de bienvenue
- ✅ Mauvais mot de passe → Erreur 401
- ✅ Utilisateur inconnu → Erreur 404
- ✅ Champs manquants → Validation côté client

## 🚀 Déploiement

```bash
# Build pour production
npm run build

# Prévisualiser le build
npm run preview
```

---
*Interface créée pour l'application QA - 21 juillet 2025*
