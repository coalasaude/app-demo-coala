import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'

import { pallet } from '@/theme/pallete'

export const theme = extendTheme({
  components: {
    MuiSkeleton: {
      styleOverrides: {
        rectangular: {
          borderRadius: 'var(--mui-shape-borderRadius)',
        },
      },
    },
    MuiAlert: {
      variants: [
        {
          props: { severity: 'success' },
          style: {
            backgroundColor: 'var(--mui-palette-success-main)',
            color: 'var(--mui-palette-primary-contrastText)',
            Svg: {
              color: 'var(--mui-palette-primary-contrastText)',
            },
          },
        },
        {
          props: { severity: 'error' },
          style: {
            backgroundColor: 'var(--mui-palette-error-main)',
            color: 'var(--mui-palette-primary-contrastText)',
            Svg: {
              color: 'var(--mui-palette-primary-contrastText)',
            },
          },
        },
        {
          props: { severity: 'warning' },
          style: {
            color: 'var(--mui-palette-primary-contrastText)',
            Svg: {
              color: 'var(--mui-palette-primary-contrastText)',
            },
          },
        },
      ],
    },

    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          boxShadow: 'var(--mui-palette-grey-200)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          height: 24,
          backgroundColor: 'transparent',
          color: 'var(--mui-palette-primary-main)',
          border: '1px solid var(--mui-palette-primary-main)',
        },
        deleteIcon: {
          width: 16,
          height: 16,
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          padding: '8px 16px',
          border: '2px solid var(--mui-palette-grey-200)',
          borderRadius: '8px !important',
          boxShadow: 'unset !important',
          '& .MuiAccordionSummary-root': {
            padding: ' 4px 0px !important',
          },
          '&.Mui-expanded': {
            margin: '0px !important',
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          minHeight: 'unset !important',
          margin: '0 !important',
          '& .MuiAccordionSummary-content': {
            alignItems: 'center !important',
            margin: '0 !important',
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        arrow: { color: 'var(--mui-palette-grey-500)' },
        tooltip: {
          backgroundColor: 'var(--mui-palette-grey-500)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          overflow: 'hidden',
          boxShadow: 'rgb(234, 236, 240) 0px 0px 1px, rgba(29, 41, 57, 0.08) 0px 1px 3px',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 3,
          transition: 'background-color 250ms cubic-bezier(0.13, 0.4, 0.8, 0.92) 0ms',
          ':hover': {
            background: 'var(--mui-palette-action-hover)',
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          padding: 0,
          borderRadius: 4,
          ':focus-visible': {
            background: 'none',
          },
          ':hover': {
            background: 'unset',
          },
        },
      },
    },
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => {
          const color = ownerState.color === 'secondary' ? '#FFFFFF' : undefined
          return {
            ':hover': {
              boxShadow: 'none',
              background: 'var(--mui-palette-primary-dark)',
              color: '#fff',
            },
            boxShadow: 'none',
            borderRadius: 8,
            textTransform: 'unset',
            fontWeight: '500',
            lineHeight: '24px',
            color,
          }
        },
        outlined: {
          borderColor: 'var(--mui-palette-grey-200)',
          ':hover': {
            background: 'var(--mui-palette-primary-light)',
            color: 'var(--mui-palette-primary-main)',
          },
          ':disabled': {
            borderColor: 'var(--mui-palette-grey-200) !important',
          },
        },
        text: {
          ':hover': {
            background: 'var(--mui-palette-primary-light)',
            color: 'var(--mui-palette-primary-main)',
          },
        },
      },
      defaultProps: {
        variant: 'contained',
      },
      variants: [
        {
          props: { size: 'medium' },
          style: {
            fontSize: '14px',
            padding: '8px, 16px, 8px, 16px',
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            border: '1px solid',
            '&:not(:hover)': {
              borderColor: 'var(--mui-palette-primary-main)',
            },
          },
        },
        {
          props: { size: 'small' },
          style: {
            fontSize: '14px',
            padding: '4px, 8px, 4px, 8px',
          },
        },
      ],
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'var(--mui-palette-grey-200)',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { selected: true },
              style: {
                backgroundColor: 'var(--mui-palette-primary-light)',
                color: 'var(--mui-palette-primary-main)',
              },
            },
          ],
          '&:hover': {
            backgroundColor: 'var(--mui-palette-grey-100)',
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          color: 'var(--mui-palette-grey-600)',
          '&.Mui-disabled': {
            color: 'var(--mui-palette-grey-400)',
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          border: '1px solid',
          borderColor: 'var(--mui-palette-grey-500)',
          color: 'var(--mui-palette-grey-500)',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ ownerState }) => {
          const color = pallet[ownerState?.color || '']
          return {
            color: 'var(--mui-palette-grey-400)',
            '&.Mui-focused fieldset': {
              color: color,
            },
          }
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: 'var(--mui-palette-grey-300)',
          '&:hover': {
            borderColor: 'var(--mui-palette-primary-main)',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: '14px',
          minHeight: 36,
        },
        input: ({ theme }) => ({
          fontSize: '14px',
          [theme.breakpoints.down('sm')]: {
            fontSize: '16px',
          },
        }),
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          backgroundColor: 'var(--mui-palette-common-white)',
          border: '1px solid var(--mui-palette-grey-200)',
          borderRadius: 8,
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderSpacing: 'unset !important',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          position: 'relative',
          '& td': {
            borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          },
        },
      },
      defaultProps: {
        hover: true,
      },
      variants: [
        {
          props: { hover: true },
          style: {
            '&:hover td': {
              background: 'var(--mui-palette-grey-50)',
              cursor: 'pointer',
            },
            '&:active td': {
              background: 'var(--mui-palette-primary-light)',
              cursor: 'pointer',
            },
          },
        },
      ],
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          whiteSpace: 'nowrap',
          '& th': {
            fontSize: '14px',
            fontWeight: 400,
            color: 'var(--mui-palette-grey-500)',
            background: 'var(--mui-palette-grey-100)',
            borderBottom: '1px solid var(--mui-palette-grey-200)',
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: alpha('#A6B0BF', 0.6),
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '14px',
          padding: '8px 16px',
          borderBottom: 0,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: '14px !important',
          p: 0,
          textTransform: 'unset',
          minHeight: '36px',
          color: 'var(--mui-palette-grey-600)',
          fontWeight: 500,
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 1280,
      md: 1500,
      lg: 1700,
      xl: 2000,
    },
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#6F46BE',
          light: '#EDE3FF',
          medium: '#A78ED7',
          dark: '#553597',
          mainGradient: 'linear-gradient(90deg, rgba(237, 227, 255, 0.00) -657.97%, #6F46BE 100%)',
        },
        secondary: {
          main: '#F4679D',
          light: '#FDE7F0',
          medium: '#F8A0C2',
          dark: '#CE497F',
          mainGradient: 'linear-gradient(90deg, rgba(255, 200, 221, 0.00) -466.67%, #F4679D 100%)',
        },
        grey: {
          100: '#F3F5F7',
          200: '#E3E5EA',
          300: '#D2D8E0',
          400: '#A6B0BF',
          500: '#64748B',
          600: '#2B323B',
        },
        error: {
          main: '#BF0000',
          light: '#FFEAED',
          medium: '#BF0000',
        },
        success: {
          main: '#03BE7F',
          light: '#E3F6EC',
          medium: '#03BE7F',
        },
        info: {
          main: '#4477FE',
          light: '#E4F3FF',
          medium: '#4477FE',
        },
        warning: {
          main: '#FF9C00',
          light: '#FFF8DF',
          medium: '#FF9C00',
        },
        emergency: {
          main: '#FF6332',
          light: '#FAEAE8',
          medium: '#FF6332',
        },
        background: {
          default: '#ffffff',
          light: '#F9FAFB',
        },
      },
    },
  },
  typography: {
    fontFamily: 'Outfit, Roboto',
    h1: {
      fontSize: '22px',
      lineHeight: '140%',
      '@media (max-width: 960px)': {
        fontSize: '22px',
      },
      color: '#2B323B',
      fontWeight: 700,
    },
    h2: {
      fontSize: '20px',
      lineHeight: '140%',
      '@media (max-width: 960px)': {
        fontSize: '20px',
      },
      color: '#2B323B',
      fontWeight: 600,
    },
    h3: {
      fontSize: '18px',
      lineHeight: '140%',
      '@media (max-width: 960px)': {
        fontSize: '18px',
      },
      color: '#2B323B',
      fontWeight: 500,
    },
    h4: {
      fontSize: '16px',
      lineHeight: '140%',
      '@media (max-width: 960px)': {
        fontSize: '16px',
      },
      color: '#2B323B',
      fontWeight: 700,
    },
    h5: {
      fontSize: '14px',
      lineHeight: '140%',
      '@media (max-width: 960px)': {
        fontSize: '14px',
      },
      color: '#2B323B',
      fontWeight: 600,
    },
    h6: {
      fontSize: '12px',
      lineHeight: '140%',
      '@media (max-width: 960px)': {
        fontSize: '12px',
      },
      color: '#2B323B',
      fontWeight: 500,
    },
    body1: {
      fontSize: '18px',
      lineHeight: '140%',
      '@media (max-width: 960px)': {
        fontSize: '18px',
      },
      color: '#2B323B',
      fontWeight: 400,
    },
    body2: {
      fontSize: '18px',
      lineHeight: '140%',
      '@media (max-width: 960px)': {
        fontSize: '18px',
      },
      color: '#2B323B',
      fontWeight: 400,
    },
    button: {
      fontSize: '14px',
      lineHeight: '140%',
      '@media (max-width: 960px)': {
        fontSize: '12px',
      },
      color: '#2B323B',
      fontWeight: 500,
    },
    caption: {
      fontSize: '12px',
      lineHeight: '140%',
      color: '#2B323B',
      fontWeight: 400,
    },
    overline: {
      fontSize: '10px',
      lineHeight: '140%',
      color: '#2B323B',
      fontWeight: 400,
    },
  },
})
