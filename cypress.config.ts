import { defineConfig } from 'cypress'
import * as dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  e2e: {
    defaultCommandTimeout: 10000,
    baseUrl: process.env.TEST_URL,
    numTestsKeptInMemory: 0,
    chromeWebSecurity: false,
    experimentalRunAllSpecs: true,
    viewportWidth: 1440,
    viewportHeight: 900,
    env: {
      baseUrl: process.env.TEST_URL,

      loginUserAdmin: process.env.LOGIN_USER_ADMIN_TEST,
      passwordUserAdmin: process.env.PASSWORD_ADMIN_TEST,

      loginUserManager: process.env.LOGIN_USER_MANAGER_TEST,
      passwordUserManager: process.env.PASSWORD_MANAGER_TEST,

      loginUserCollaborator: process.env.LOGIN_USER_COLLABORATOR_TEST,
      passwordUserCollaborator: process.env.PASSWORD_COLLABORATOR_TEST,

      loginUserResponsible: process.env.LOGIN_USER_RESPONSIBLE_TEST,
      passwordUserResponsible: process.env.PASSWORD_RESPONSIBLE_TEST,
    },
  },
})
