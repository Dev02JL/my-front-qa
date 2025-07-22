import { render, screen, fireEvent, waitFor } from '@testing-library/vue'
import { createTestingPinia } from '@pinia/testing'
import App from '../app/app.vue'

// Mock fetch globalement
global.fetch = jest.fn()

describe('App.vue - Tests Unitaires', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  describe('Présence des champs', () => {
    test('devrait afficher le champ email', () => {
      render(App)
      
      const emailInput = screen.getByPlaceholderText('Adresse email')
      expect(emailInput).toBeInTheDocument()
      expect(emailInput).toHaveAttribute('type', 'email')
      expect(emailInput).toHaveAttribute('required')
    })

    test('devrait afficher le champ mot de passe', () => {
      render(App)
      
      const passwordInput = screen.getByPlaceholderText('Mot de passe')
      expect(passwordInput).toBeInTheDocument()
      expect(passwordInput).toHaveAttribute('type', 'password')
      expect(passwordInput).toHaveAttribute('required')
    })

    test('devrait afficher le bouton de connexion', () => {
      render(App)
      
      const loginButton = screen.getByRole('button', { name: /se connecter/i })
      expect(loginButton).toBeInTheDocument()
      expect(loginButton).toHaveAttribute('type', 'submit')
    })

    test('devrait afficher le titre de la page', () => {
      render(App)
      
      const title = screen.getByText('Connexion')
      expect(title).toBeInTheDocument()
    })
  })

  describe('Réaction au clic / changement', () => {
    test('devrait mettre à jour la valeur du champ email', async () => {
      render(App)
      
      const emailInput = screen.getByPlaceholderText('Adresse email')
      await fireEvent.update(emailInput, 'test@example.com')
      
      expect(emailInput.value).toBe('test@example.com')
    })

    test('devrait mettre à jour la valeur du champ mot de passe', async () => {
      render(App)
      
      const passwordInput = screen.getByPlaceholderText('Mot de passe')
      await fireEvent.update(passwordInput, 'password123')
      
      expect(passwordInput.value).toBe('password123')
    })

    test('devrait désactiver le bouton pendant le chargement', async () => {
      render(App)
      
      const loginButton = screen.getByRole('button', { name: /se connecter/i })
      const emailInput = screen.getByPlaceholderText('Adresse email')
      const passwordInput = screen.getByPlaceholderText('Mot de passe')
      
      // Remplir les champs
      await fireEvent.update(emailInput, 'test@example.com')
      await fireEvent.update(passwordInput, 'password123')
      
      // Soumettre le formulaire
      await fireEvent.click(loginButton)
      
      // Vérifier que le bouton est désactivé pendant le chargement
      expect(loginButton).toBeDisabled()
      expect(loginButton).toHaveTextContent('Connexion...')
    })
  })
}) 