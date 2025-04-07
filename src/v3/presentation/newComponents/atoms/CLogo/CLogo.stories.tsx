import type { Meta, StoryObj } from '@storybook/react'

import { CLogo } from './index'

const meta: Meta<typeof CLogo> = {
  title: 'Atoms/CLogo',
  component: CLogo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The `CLogo` component displays the logo of the application. It can be customized in terms of size and variant.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select', options: [32, 48, 64, 80, 96, 112] },
      description: 'Size of the logo',
    },
    variant: {
      control: { type: 'select', options: ['brand', 'symbol', 'brandAndSymbol'] },
      description: 'Variant of the logo to display',
    },
  },
}

export default meta

type CLogoStory = StoryObj<typeof CLogo>

export const Brand: CLogoStory = {
  args: {
    size: 64,
    variant: 'brand',
  },
}

export const Symbol: CLogoStory = {
  args: {
    size: 64,
    variant: 'symbol',
  },
}

export const BrandAndSymbol: CLogoStory = {
  args: {
    size: 64,
    variant: 'brandAndSymbol',
  },
}

export const Small: CLogoStory = {
  args: {
    size: 32,
    variant: 'brand',
  },
}

export const Large: CLogoStory = {
  args: {
    size: 112,
    variant: 'brand',
  },
}
