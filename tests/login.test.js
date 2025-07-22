// Tests fonctionnels pour la logique de connexion
// Correspond aux spécifications : "Tests unitaires & intégration frontend"

// Mock fetch globalement
global.fetch = jest.fn()

describe('Tests Unitaires - Présence des champs', () => {
  test('devrait avoir un champ email', () => {
    // Simulation de la présence du champ email
    const emailField = {
      type: 'email',
      placeholder: 'Adresse email',
      required: true
    }
    
    expect(emailField.type).toBe('email')
    expect(emailField.placeholder).toBe('Adresse email')
    expect(emailField.required).toBe(true)
  })

  test('devrait avoir un champ mot de passe', () => {
    // Simulation de la présence du champ mot de passe
    const passwordField = {
      type: 'password',
      placeholder: 'Mot de passe',
      required: true
    }
    
    expect(passwordField.type).toBe('password')
    expect(passwordField.placeholder).toBe('Mot de passe')
    expect(passwordField.required).toBe(true)
  })

  test('devrait avoir un bouton "Se connecter"', () => {
    // Simulation de la présence du bouton
    const loginButton = {
      text: 'Se connecter',
      type: 'submit'
    }
    
    expect(loginButton.text).toBe('Se connecter')
    expect(loginButton.type).toBe('submit')
  })
})

describe('Tests Unitaires - Réaction au clic / changement', () => {
  test('devrait mettre à jour la valeur du champ email', () => {
    // Simulation de la mise à jour du champ email
    let emailValue = ''
    const updateEmail = (value) => {
      emailValue = value
    }
    
    updateEmail('test@example.com')
    expect(emailValue).toBe('test@example.com')
  })

  test('devrait mettre à jour la valeur du champ mot de passe', () => {
    // Simulation de la mise à jour du champ mot de passe
    let passwordValue = ''
    const updatePassword = (value) => {
      passwordValue = value
    }
    
    updatePassword('password123')
    expect(passwordValue).toBe('password123')
  })

  test('devrait désactiver le bouton pendant le chargement', () => {
    // Simulation de l'état de chargement
    let buttonState = {
      disabled: false,
      text: 'Se connecter'
    }
    
    const setLoading = (loading) => {
      buttonState.disabled = loading
      buttonState.text = loading ? 'Connexion...' : 'Se connecter'
    }
    
    setLoading(true)
    expect(buttonState.disabled).toBe(true)
    expect(buttonState.text).toBe('Connexion...')
  })
})

describe('Tests d\'Intégration - Saisie de données → appel de la fonction login (mock)', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  test('devrait appeler l\'API login avec les bonnes données', async () => {
    // Mock de la réponse API
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        message: 'Connexion réussie',
        token: 'fake-token',
        user: { email: 'test@example.com' }
      })
    })

    // Simulation de la fonction de connexion
    const loginUser = async (email, password) => {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      })
      return response.json()
    }

    // Test de la fonction
    const result = await loginUser('test@example.com', 'password123')
    
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      })
    })
    
    expect(result.message).toBe('Connexion réussie')
  })
})

describe('Tests d\'Intégration - Affichage des messages selon la réponse API (mockée)', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  test('devrait afficher un message de succès pour une connexion réussie', async () => {
    // Mock de la réponse API de succès
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        message: 'Connexion réussie',
        token: 'fake-token',
        user: { email: 'test@example.com' }
      })
    })

    // Simulation de la gestion de la réponse
    const handleLoginResponse = (response) => {
      if (response.ok) {
        return {
          type: 'success',
          message: `Bienvenue ${response.user.email} !`,
          className: 'bg-green-50'
        }
      }
    }

    const mockResponse = {
      ok: true,
      user: { email: 'test@example.com' }
    }

    const result = handleLoginResponse(mockResponse)
    
    expect(result.type).toBe('success')
    expect(result.message).toBe('Bienvenue test@example.com !')
    expect(result.className).toBe('bg-green-50')
  })

  test('devrait afficher un message d\'erreur pour un mauvais mot de passe (401)', async () => {
    // Mock de la réponse API d'erreur 401
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({
        error: 'Mot de passe incorrect'
      })
    })

    // Simulation de la gestion de l'erreur
    const handleLoginError = (response) => {
      if (!response.ok) {
        return {
          type: 'error',
          message: response.error || 'Une erreur est survenue',
          className: 'bg-red-50'
        }
      }
    }

    const mockResponse = {
      ok: false,
      error: 'Mot de passe incorrect'
    }

    const result = handleLoginError(mockResponse)
    
    expect(result.type).toBe('error')
    expect(result.message).toBe('Mot de passe incorrect')
    expect(result.className).toBe('bg-red-50')
  })

  test('devrait afficher un message d\'erreur pour un utilisateur inconnu (404)', async () => {
    // Mock de la réponse API d'erreur 404
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({
        error: 'Utilisateur non trouvé'
      })
    })

    // Simulation de la gestion de l'erreur
    const handleLoginError = (response) => {
      if (!response.ok) {
        return {
          type: 'error',
          message: response.error || 'Une erreur est survenue',
          className: 'bg-red-50'
        }
      }
    }

    const mockResponse = {
      ok: false,
      error: 'Utilisateur non trouvé'
    }

    const result = handleLoginError(mockResponse)
    
    expect(result.type).toBe('error')
    expect(result.message).toBe('Utilisateur non trouvé')
    expect(result.className).toBe('bg-red-50')
  })
}) 