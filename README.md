# Projet QANuxt - Frontend Nuxt.js

Ce projet est une application frontend construite avec Nuxt.js, Vue.js et Tailwind CSS pour l'interface de connexion.

## 🚀 Fonctionnalités

- **Page de connexion** : Formulaire avec email et mot de passe
- **Interface moderne** : Design responsive avec Tailwind CSS
- **Gestion des états** : Messages de succès et d'erreur
- **Tests automatisés** : Jest + @testing-library/vue
- **Configuration CORS** : Communication avec le backend

## 📋 Prérequis

- Node.js (v18 ou supérieur)
- Backend QA en cours d'exécution (port 3001)
- Git

## 🛠️ Installation

```bash
# Cloner le repository
git clone <votre-repo-url>
cd QANuxt

# Installer les dépendances
npm install
```

## 🚀 Scripts disponibles

### Démarrer en mode développement
```bash
npm run dev
```

### Build pour production
```bash
npm run build
```

### Prévisualiser le build
```bash
npm run preview
```

### Lancer les tests
```bash
npm test
```

### Lancer les tests en mode watch
```bash
npm run test:watch
```

### Lancer les tests avec couverture
```bash
npm run test:coverage
```

## 🎯 Utilisation

### 1. Démarrer le backend
```bash
# Dans le dossier QA
cd ../QA
npm start
```

### 2. Démarrer le frontend
```bash
# Dans le dossier QANuxt
npm run dev
```

### 3. Accéder à l'application
- **Frontend** : http://localhost:3000
- **Backend** : http://localhost:3001

## 📝 Données de test

### Utilisateurs disponibles pour tester :

| Email | Mot de passe | Description |
|-------|-------------|-------------|
| `user1@example.com` | `password123` | Utilisateur standard |
| `user2@example.com` | `password456` | Utilisateur standard |
| `admin@test.com` | `admin789` | Administrateur |
| `demo@test.com` | `demo123` | Utilisateur démo |

### Créer les utilisateurs de test :
```bash
# Dans le dossier QA
npm run create-users
```

## 🧪 Tests

Le projet inclut des tests automatisés couvrant :

### Tests unitaires
- ✅ **Présence des champs** : Email, mot de passe, bouton
- ✅ **Réaction au clic/changement** : Interactions utilisateur
- ✅ **États de chargement** : Désactivation du bouton

### Tests d'intégration
- ✅ **Appel API** : Vérification des requêtes vers le backend
- ✅ **Messages de succès** : Affichage des messages de bienvenue
- ✅ **Messages d'erreur** : Gestion des erreurs 401, 404, réseau

### Lancer les tests
```bash
npm test
```

### Cas testés

| Test | Description | Résultat attendu |
|------|-------------|------------------|
| **Présence des champs** | Vérification des éléments UI | Champs email/password présents |
| **Réaction utilisateur** | Test des interactions | Mise à jour des valeurs |
| **Appel API** | Test de la communication backend | Requête POST vers /login |
| **Succès** | Connexion réussie | Message "Bienvenue [email] !" |
| **Erreur 401** | Mot de passe incorrect | Message d'erreur rouge |
| **Erreur 404** | Utilisateur inconnu | Message d'erreur rouge |
| **Erreur réseau** | Problème de connexion | Message d'erreur réseau |

## 🏗️ Architecture

```
QANuxt/
├── app/                  # Application principale
│   └── app.vue          # Page de connexion
├── assets/              # Ressources statiques
│   └── css/
├── components/          # Composants Vue
│   ├── IconCheckCircle.vue
│   └── IconExclamationTriangle.vue
├── tests/               # Tests automatisés
│   ├── login.test.js    # Tests fonctionnels
│   └── simple.test.js   # Tests de base
├── nuxt.config.ts       # Configuration Nuxt
├── jest.config.cjs      # Configuration Jest
├── jest.setup.js        # Setup Jest
└── package.json
```

## 🔧 Configuration

### Nuxt.js
- **Framework** : Nuxt 4.0.1
- **CSS** : Tailwind CSS
- **API** : Configuration pour backend sur port 3001

### Jest
- **Environnement** : jsdom
- **Librairie** : @testing-library/vue
- **Mock** : fetch pour les tests d'API

## 🎨 Interface utilisateur

### Composants
- **Formulaire de connexion** : Champs email/password
- **Bouton de connexion** : Avec état de chargement
- **Messages d'état** : Succès (vert) et erreur (rouge)
- **Icônes** : CheckCircle et ExclamationTriangle

### Design
- **Responsive** : Adaptation mobile/desktop
- **Accessibilité** : Labels et attributs appropriés
- **UX** : Feedback visuel immédiat

## 🔐 Sécurité

- **Validation côté client** : Champs requis
- **Communication sécurisée** : Configuration CORS
- **Gestion des erreurs** : Messages appropriés
- **Pas de stockage local** : Tokens non persistés

## 📝 TODO

- [ ] Ajouter la validation des emails côté client
- [ ] Implémenter la persistance des sessions
- [ ] Ajouter des animations de transition
- [ ] Créer des pages supplémentaires
- [ ] Améliorer l'accessibilité
- [ ] Ajouter des tests E2E

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.
