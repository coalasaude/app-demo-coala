export const getTextChangeForm = (type: 'email' | 'phone', isSameUser: boolean) => {
  const contentMap = {
    email: {
      title: isSameUser ? 'Altere seu endereço de e-mail' : 'Altere o endereço de e-mail',
      fieldTitle: isSameUser ? 'Seu e-mail atual é:' : 'O e-mail atual é:',
      body: isSameUser
        ? 'Digite abaixo o novo endereço de e-mail que você deseja vincular à sua conta. Nós vamos te enviar um código para confirmar tudo certinho.'
        : 'Digite abaixo o novo endereço de e-mail da conta do usuário.',
    },
    phone: {
      title: isSameUser ? 'Altere seu número de telefone.' : 'Altere o número de telefone.',
      fieldTitle: isSameUser ? 'Seu número atual é:' : 'O número atual é:',
      body: isSameUser
        ? 'Digite abaixo o novo número de telefone que você deseja vincular à conta do usuário.'
        : 'Digite abaixo o novo número de telefone da conta do usuário.',
    },
  }

  return contentMap[type]
}
