import Lottie from 'lottie-react'
import dynamic from 'next/dynamic'
export const LottieDynamic = dynamic(() => import('lottie-react').then((mod) => mod as any), {
  ssr: false,
}) as typeof Lottie
