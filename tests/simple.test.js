describe('Tests simples', () => {
  test('devrait passer un test basique', () => {
    expect(1 + 1).toBe(2)
  })

  test('devrait tester les fonctions de base', () => {
    const add = (a, b) => a + b
    expect(add(2, 3)).toBe(5)
  })

  test('devrait tester les chaînes de caractères', () => {
    const message = 'Bienvenue'
    expect(message).toBe('Bienvenue')
  })
}) 