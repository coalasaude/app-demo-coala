import Avatar from '/public/assets/svg/Account_circle.svg'

export * from './UserAvatarWrapper'
export * from './UserAvatarTitle'

export const UserAvatar = () => {
  return <Avatar width={44} height={44} />
}
