export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

export const pageview = (url: string) => {
  const gtag = (window as any).gtag
  if (gtag)
    gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
}

export const event = ({
  action,
  value,
  transaction_id,
  send_to,
}: {
  action: string
  value: any
  transaction_id: string
  send_to: string
}) => {
  const gtag = (window as any).gtag
  if (gtag)
    gtag('event', action, {
      value,
      send_to: send_to,
      currency: 'BRL',
      transaction_id,
    })
}
