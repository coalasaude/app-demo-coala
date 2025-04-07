export type StringsMap = (typeof stringsMap)['default']
export type StringsKeys = keyof typeof stringsMap

export const stringsMap = {
  ['email']: {
    title: 'Você pode acessar com seu e-mail.',
    label: 'E-mail',
    placeholder: 'Digite seu e-mail',
    subtitle: 'Ainda não sou cliente',
  },
  ['phone']: {
    title: 'Você pode acessar com seu número de celular.',
    label: 'DDD + Celular',
    placeholder: 'Digite seu DDD + Celular',
    subtitle: 'Ainda não sou cliente',
  },
  ['default']: {
    title: 'Você pode acessar com seu e-mail ou celular.',
    label: 'E-mail ou DDD + Celular',
    placeholder: 'Digite seu e-mail ou DDD + Celular',
    subtitle: 'Ainda não sou cliente',
  },
}
