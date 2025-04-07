import type { Meta, StoryObj } from '@storybook/react'
import CorporateFareOutlinedIcon from '@mui/icons-material/CorporateFareOutlined'

import { CAvatar } from './CAvatar'

const meta: Meta<typeof CAvatar> = {
  title: 'Atoms/CAvatar',
  component: CAvatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The `CAvatar` component is a versatile and customizable component that allows you to display user avatars in different forms. It is built upon the Material UI `Avatar` component and provides additional functionality and flexibility.\n\nThe component supports three types of avatars: icons, initials, and photos. The appearance and behavior of the avatar can be customized based on the provided props.\n\nThe `size` prop determines the size of the avatar, which can be small, medium, or large. The `name` prop is used to display initials or as an alternative text for photo avatars. The `imageUrl` prop specifies the URL of the user\'s photo.\n\nThe `onClick` prop allows you to define a click handler for the avatar, making it interactive. The `isClickable` prop determines whether the avatar should be clickable or not.\n\nFor photo avatars, the `photoFallback` prop provides a fallback option in case the photo fails to load. It can be set to either "icon" or "initials".\n\nThe `CAvatar` component is highly customizable and can be easily integrated into various parts of your application where user avatars are required.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select', options: ['icon', 'initials', 'photo'] },
      description:
        'Type of the avatar. It determines the visual representation of the avatar. Required.',
    },
    size: {
      control: { type: 'select', options: ['small', 'medium', 'large'] },
      description: 'Size of the avatar. Defaults to "medium".',
    },
    name: {
      control: 'text',
      description:
        'Name of the user. Used for displaying initials or as an alternative text for photo avatars. Required when `type` is "initials" or "photo".',
    },
    imageUrl: {
      control: 'text',
      description: 'URL of the user\'s photo. Required when `type` is "photo".',
    },
    onClick: {
      action: 'onClick',
      description:
        'Callback function triggered when the avatar is clicked. Only applicable when `isClickable` is true.',
    },
    isClickable: {
      control: 'boolean',
      description:
        'Determines whether the avatar is clickable. When set to true, the `onClick` prop becomes available.',
    },
    photoFallback: {
      control: { type: 'select', options: ['icon', 'initials'] },
      description:
        'Fallback option for photo avatars. Determines what to display if the photo fails to load. Can be either "icon" or "initials". Defaults to "icon".',
    },
    SvgIcon: {
      control: { type: 'object' },
      description:
        'Custom SVG icon component to be used as the avatar icon. If not provided, the default `PersonOutlineOutlinedIcon` will be used.',
    },
  },
}

export default meta

type CAvatarStory = StoryObj<typeof CAvatar>

export const Default: CAvatarStory = {
  args: {
    type: 'icon',
    size: 'large',
    name: 'John Doe',
  },
}

export const Initials: CAvatarStory = {
  args: {
    type: 'initials',
    size: 'large',
    name: 'John Doe',
  },
}

export const Photo: CAvatarStory = {
  args: {
    type: 'photo',
    size: 'large',
    imageUrl:
      'https://s3-alpha-sig.figma.com/img/9080/71a1/b2d4f2c167bea31c4346b5d9a75cb8f5?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eBbNywAizgEXbcQpqoHTlE5uzztljzT37zss6NpC6683aotnpInwJsryl-60n1SqVz7qLCkdiFrb6XnesVACgCwe7b7~~0Y9u6--2jSfaRuMSyDQU3ItFRmlEPdtAEvEuon0g~srcd-sTAizwv2w92OfFsDfuaZqH2dJ2DrBbRwy3~MNe71j6F7xxZk3xPU3Qqy-fbH-fl-Fsj~zIpe8~J01Dm6n4TFCzYYMxBRlgSz1zd1dbMm1maF5og9kX00Fm0AVakMRypKizvSxdYxzC9tFNTdFBCN1bcRx-oSgGHyVi2EILSK8sjIRQhxUe13ZIRvDmdbUEBKJJ~wKS4FxxA__',
  },
}

export const PhotoWithOnClick: CAvatarStory = {
  args: {
    type: 'photo',
    size: 'large',
    onClick: () => alert('Clicked'),
    isClickable: true,
    imageUrl:
      'https://s3-alpha-sig.figma.com/img/9080/71a1/b2d4f2c167bea31c4346b5d9a75cb8f5?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eBbNywAizgEXbcQpqoHTlE5uzztljzT37zss6NpC6683aotnpInwJsryl-60n1SqVz7qLCkdiFrb6XnesVACgCwe7b7~~0Y9u6--2jSfaRuMSyDQU3ItFRmlEPdtAEvEuon0g~srcd-sTAizwv2w92OfFsDfuaZqH2dJ2DrBbRwy3~MNe71j6F7xxZk3xPU3Qqy-fbH-fl-Fsj~zIpe8~J01Dm6n4TFCzYYMxBRlgSz1zd1dbMm1maF5og9kX00Fm0AVakMRypKizvSxdYxzC9tFNTdFBCN1bcRx-oSgGHyVi2EILSK8sjIRQhxUe13ZIRvDmdbUEBKJJ~wKS4FxxA__',
  },
}

export const PhotoWithIconFallback: CAvatarStory = {
  args: {
    type: 'photo',
    size: 'large',
    imageUrl: 'broken-url',
    photoFallback: 'icon',
  },
}

export const PhotoWithInitialsFallback: CAvatarStory = {
  args: {
    type: 'photo',
    size: 'large',
    imageUrl: 'broken-url',
    photoFallback: 'initials',
    name: 'John Doe',
  },
}

export const CustomSvgIcon: CAvatarStory = {
  args: {
    type: 'icon',
    size: 'large',
    SvgIcon: CorporateFareOutlinedIcon,
  },
}
