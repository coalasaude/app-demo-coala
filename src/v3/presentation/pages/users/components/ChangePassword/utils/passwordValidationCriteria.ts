const evaluatePasswordCriteria = (password: string): string[] => {
  const checks = {
    containsSpecialCharacter: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    containsLowercase: /[a-z]/.test(password),
    containsUppercase: /[A-Z]/.test(password),
    containsNumber: /[0-9]/.test(password),
  }

  const matchedCriteria: string[] = []

  if (checks.containsSpecialCharacter && checks.containsNumber) {
    matchedCriteria.push('containsSpecialCharacterAndNumber')
  }

  if (checks.containsUppercase && checks.containsLowercase) {
    matchedCriteria.push('containsUpperAndLowercase')
  }

  return matchedCriteria
}

export const passwordValidationCriteria = (password: string) => {
  const matchedCriteria = evaluatePasswordCriteria(password)

  return [
    {
      label: 'Mínimo de 8 caracteres',
      isValid: password.length >= 8,
    },
    {
      label: 'Letras maiúsculas e minúsculas',
      isValid: matchedCriteria.includes('containsUpperAndLowercase'),
    },
    {
      label: 'Um número e um caractere especial',
      isValid: matchedCriteria.includes('containsSpecialCharacterAndNumber'),
    },
  ]
}
