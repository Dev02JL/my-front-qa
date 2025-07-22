import { render, screen, fireEvent, waitFor } from '@testing-library/vue'
import App from '../app/app.vue'

// Mock fetch globalement
global.fetch = jest.fn()

describe('App.vue - Tests d\'Intégration', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  describe('Saisie de données → appel de la fonction login (mock)', () => {
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

      render(App)
      
      const emailInput = screen.getByPlaceholderText('Adresse email')
      const passwordInput = screen.getByPlaceholderText('Mot de passe')
      const loginButton = screen.getByRole('button', { name: /se connecter/i })
      
      // Remplir les champs
      await fireEvent.update(emailInput, 'test@example.com')
      await fireEvent.update(passwordInput, 'password123')
      
      // Soumettre le formulaire
      await fireEvent.click(loginButton)
      
      // Vérifier que fetch a été appelé avec les bonnes données
      expect(fetch).toHaveBeenCalledWith('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password123'
        })
      })
    })

    test('devrait appeler l\'API login lors de la soumission du formulaire', async () => {
      // Mock de la réponse API
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          message: 'Connexion réussie',
          token: 'fake-token',
          user: { email: 'test@example.com' }
        })
      })

      render(App)
      
      const form = screen.getByRole('form')
      const emailInput = screen.getByPlaceholderText('Adresse email')
      const passwordInput = screen.getByPlaceholderText('Mot de passe')
      
      // Remplir les champs
      await fireEvent.update(emailInput, 'test@example.com')
      await fireEvent.update(passwordInput, 'password123')
      
      // Soumettre le formulaire
      await fireEvent.submit(form)
      
      // Vérifier que fetch a été appelé
      expect(fetch).toHaveBeenCalledTimes(1)
    })
  })

  describe('Affichage des messages selon la réponse API (mockée)', () => {
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

      render(App)
      
      const emailInput = screen.getByPlaceholderText('Adresse email')
      const passwordInput = screen.getByPlaceholderText('Mot de passe')
      const loginButton = screen.getByRole('button', { name: /se connecter/i })
      
      // Remplir et soumettre
      await fireEvent.update(emailInput, 'test@example.com')
      await fireEvent.update(passwordInput, 'password123')
      await fireEvent.click(loginButton)
      
      // Attendre l'affichage du message
      await waitFor(() => {
        expect(screen.getByText('Bienvenue test@example.com !')).toBeInTheDocument()
      })
      
      // Vérifier que le message est en vert (succès)
      const messageElement = screen.getByText('Bienvenue test@example.com !')
      expect(messageElement.closest('div')).toHaveClass('bg-green-50')
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

      render(App)
      
      const emailInput = screen.getByPlaceholderText('Adresse email')
      const passwordInput = screen.getByPlaceholderText('Mot de passe')
      const loginButton = screen.getByRole('button', { name: /se connecter/i })
      
      // Remplir et soumettre
      await fireEvent.update(emailInput, 'test@example.com')
      await fireEvent.update(passwordInput, 'wrongpassword')
      await fireEvent.click(loginButton)
      
      // Attendre l'affichage du message d'erreur
      await waitFor(() => {
        expect(screen.getByText('Mot de passe incorrect')).toBeInTheDocument()
      })
      
      // Vérifier que le message est en rouge (erreur)
      const messageElement = screen.getByText('Mot de passe incorrect')
      expect(messageElement.closest('div')).toHaveClass('bg-red-50')
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

      render(App)
      
      const emailInput = screen.getByPlaceholderText('Adresse email')
      const passwordInput = screen.getByPlaceholderText('Mot de passe')
      const loginButton = screen.getByRole('button', { name: /se connecter/i })
      
      // Remplir et soumettre
      await fireEvent.update(emailInput, 'unknown@example.com')
      await fireEvent.update(passwordInput, 'password123')
      await fireEvent.click(loginButton)
      
      // Attendre l'affichage du message d'erreur
      await waitFor(() => {
        expect(screen.getByText('Utilisateur non trouvé')).toBeInTheDocument()
      })
      
      // Vérifier que le message est en rouge (erreur)
      const messageElement = screen.getByText('Utilisateur non trouvé')
      expect(messageElement.closest('div')).toHaveClass('bg-red-50')
    })

    test('devrait afficher un message d\'erreur réseau en cas d\'échec de fetch', async () => {
      // Mock d'une erreur réseau
      fetch.mockRejectedValueOnce(new Error('Network error'))

      render(App)
      
      const emailInput = screen.getByPlaceholderText('Adresse email')
      const passwordInput = screen.getByPlaceholderText('Mot de passe')
      const loginButton = screen.getByRole('button', { name: /se connecter/i })
      
      // Remplir et soumettre
      await fireEvent.update(emailInput, 'test@example.com')
      await fireEvent.update(passwordInput, 'password123')
      await fireEvent.click(loginButton)
      
      // Attendre l'affichage du message d'erreur réseau
      await waitFor(() => {
        expect(screen.getByText('Erreur de connexion au serveur')).toBeInTheDocument()
      })
      
      // Vérifier que le message est en rouge (erreur)
      const messageElement = screen.getByText('Erreur de connexion au serveur')
      expect(messageElement.closest('div')).toHaveClass('bg-red-50')
    })
  })
}) 