import type { Preview } from '@storybook/react'
import { withThemeFromJSXProvider } from '@storybook/addon-themes'
import { theme } from '../src/theme'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import '@fontsource/outfit'

export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      light: theme,
      dark: theme,
    },
    defaultTheme: 'light',
    Provider: CssVarsProvider,
  }),
]

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
