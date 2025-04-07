import type { Meta, StoryObj } from '@storybook/react'

import { CButton } from '@/v3/presentation/newComponents/atoms/CButton'

import CButtonGroup from './CButtonGroup'

const meta: Meta<typeof CButtonGroup> = {
  title: 'Molecules/CButtonGroup',
  component: CButtonGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The `CButtonGroup` component is used to group related buttons. This component can group side-by-side buttons, vertically stacked buttons and split buttons. Split buttons collapse all buttons into a single button with a dropdown menu that can be used to select which button to display.',
      },
    },
  },
  argTypes: {
    variant: {
      description: 'The button variants to use.',
      defaultValue: 'primary',
    },
    orientation: {
      description: 'The orientation of the button group.',
      defaultValue: 'horizontal',
    },
    size: {
      description: 'The size of the button group.',
      defaultValue: 'medium',
    },
    primary: {
      description: 'The primary button type.',
      defaultValue: 'basic',
    },
    selectedIndex: {
      description: 'The index of the selected button. The button change color when provided.',
    },
    children: {
      description: 'The content of the component. Must be CButton.',
      defaultValue: [
        <CButton key={1}>Button 1</CButton>,
        <CButton key={2}>Button 2</CButton>,
        <CButton key={3}>Button 3</CButton>,
      ],
      control: 'ReactNode',
    },
  },
}

export default meta

type Story = StoryObj<typeof CButtonGroup>

export const Default: Story = {
  args: {
    variant: 'primary',
    orientation: 'horizontal',
    size: 'medium',
    primary: 'basic',
    children: [
      <CButton key={1}>Button 1</CButton>,
      <CButton key={2}>Button 2</CButton>,
      <CButton key={3}>Button 3</CButton>,
    ],
  },
}

export const Basic: Story = {
  args: {
    variant: 'primary',
    orientation: 'horizontal',
    size: 'medium',
    primary: 'basic',
    children: [
      <CButton key={1}>Button 1</CButton>,
      <CButton key={2}>Button 2</CButton>,
      <CButton key={3}>Button 3</CButton>,
    ],
  },
}

export const Split: Story = {
  args: {
    variant: 'primary',
    orientation: 'horizontal',
    size: 'medium',
    primary: 'split',
    children: [
      <CButton key={1}>Button 1</CButton>,
      <CButton key={2}>Button 2</CButton>,
      <CButton key={3}>Button 3</CButton>,
    ],
  },
}
