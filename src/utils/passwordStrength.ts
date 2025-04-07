export const passwordStrength = (password: string) => {
  let score = 0
  if (/^(?=.*[A-Z])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{0,}$/.test(password)) {
    score += 25
  }
  if (/^(?=.*[a-z])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{0,}$/.test(password)) {
    score += 25
  }
  if (/(?=.*\d)[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{0,}$/.test(password)) {
    score += 25
  }
  if (
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/.test(
      password
    )
  ) {
    return 100
  }

  return score
}
