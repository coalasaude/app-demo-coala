import dynamic from 'next/dynamic'
import React from 'react'

export const AuthenticatedTemplate = dynamic(
  () => import('./AuthTemplate').then((mod) => mod as any),
  {
    ssr: false,
  },
) as React.FunctionComponent<{ children: React.ReactNode }>

export const UnauthenticatedTemplate = dynamic(
  () => import('./UnauthenticatedTemplate/Container').then((mod) => mod as any),
  {
    ssr: false,
  },
) as React.FunctionComponent<{ children: React.ReactNode }>
