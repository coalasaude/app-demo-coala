export const mapperErrorStripe = (error: string) => {
  switch (error) {
    case 'card_declined':
      return 'Pagamento não aprovado. Tente utilizar outra forma de pagamento.'
    case 'coupon_expired':
      return 'Esse cupom não é válido ou expirou.'
    case 'incorrect_cvc':
      return 'O código de segurança informado está incorreto. Tente novamente ou utilize outra forma de pagamento.'
    case 'incorrect_number':
      return 'O número de cartão informado está incorreto. Tente novamente ou utilize outra forma de pagamento.'
    case 'incorrect_zip':
      return 'O código postal informado está incorreto. Tente novamente ou utilize outra forma de pagamento.'
    case 'invalid_cvc':
      return 'O código de segurança informado está inválido. Tente novamente ou utilize outra forma de pagamento.'
    case 'invalid_expiry_month':
      return 'O mês de expiração informado está inválido. Tente novamente ou utilize outra forma de pagamento.'
    case 'invalid_expiry_year':
      return 'O ano de expiração informado está inválido. Tente novamente ou utilize outra forma de pagamento.'
    case 'invalid_number':
      return 'O número de cartão informado está inválido. Tente novamente ou utilize outra forma de pagamento.'
    default:
      return 'Pagamento não aprovado. Tente novamente ou use outra opção de pagamento.'
  }
}
