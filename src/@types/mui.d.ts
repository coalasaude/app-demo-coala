// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from '@mui/material/styles'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TypeBackground } from '@mui/material/styles/createPalette'

declare module '@mui/material/styles' {
  interface Palette {
    emergency: Palette['primary']
  }

  interface PaletteOptions {
    emergency: PaletteOptions['primary']
  }

  interface SimplePaletteColorOptions {
    medium: string
    mainGradient?: string
  }

  interface PaletteColor {
    medium: string
    mainGradient?: string
  }
}

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    light: string
  }
}
