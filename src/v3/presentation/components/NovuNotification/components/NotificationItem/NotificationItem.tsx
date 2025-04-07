/* eslint-disable react/display-name */
import { Box, Typography } from '@mui/material'
import { Notification } from '@novu/react'
import AdsClickOutlinedIcon from '@mui/icons-material/AdsClickOutlined'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import Image from 'next/image'
import { memo } from 'react'
import { useRouter } from 'next/router'

import { CDivider, CTooltip } from '@/v3/presentation/newComponents'
import { parseJson } from '@/v3/utils/parse-json'

dayjs.extend(relativeTime)
dayjs.extend(updateLocale)
dayjs.locale('pt-br')
dayjs.updateLocale('pt-br', {
  relativeTime: {
    future: 'em %s',
    past: 'Há %s',
    s: 'alguns segundos',
    m: 'um minuto',
    mm: '%d minutos',
    h: 'uma hora',
    hh: '%d horas',
    d: 'um dia',
    dd: '%d dias',
    M: 'um mês',
    MM: '%d meses',
    y: 'um ano',
    yy: '%d anos',
  },
})

interface Body {
  body?: string
  icon?: string
  sentBy?: string
  redirect?: string
}

type NotificationItemProps = {
  notification: Notification
  onClose: () => void
}

export const NotificationItem = memo<NotificationItemProps>(
  ({ notification, onClose }) => {
    const router = useRouter()
    const data = parseJson(notification.body.replace(/&amp;/g, '&')) as Body | null

    const isHtmlBody = data?.body ? /<\/?[a-z][\s\S]*>/i.test(data.body) : false
    const validUrl = data?.icon && /^(https?:\/\/)/.test(data?.icon)

    const handleClick = () => {
      if (data?.redirect) {
        router.push(data.redirect)
        onClose()
      }
      notification.read()
    }

    return (
      <>
        <Box
          display='flex'
          justifyContent='flex-start'
          alignItems='flex-start'
          overflow={'hidden'}
          gap={2}
          mt={1}
          py={2}
          px={1}
          bgcolor={notification.isRead ? 'none' : 'var(--mui-palette-grey-100)'}
          sx={{ cursor: 'pointer' }}
          onClick={handleClick}
        >
          <Box minWidth={'48px'} height={'48px'} position='relative'>
            {validUrl ? (
              <Image alt='Coala Saúde' src={data.icon!} layout='fill' objectFit='contain' />
            ) : (
              <AdsClickOutlinedIcon
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: 'var(--mui-palette-grey-100)',
                  color: 'var(--mui-palette-primary-main)',
                  borderRadius: '50%',
                  p: 1,
                }}
              />
            )}
          </Box>
          <Box
            display='flex'
            alignItems='flex-start'
            justifyContent='center'
            flexDirection='column'
            gap={1}
          >
            {isHtmlBody ? (
              <Box
                sx={{
                  '& p': {
                    color: 'var(--mui-palette-grey-500)',
                    fontSize: '16px',
                    lineHeight: '22px',
                    fontWeight: 400,
                    m: 0,
                    p: 0,
                  },
                  '& span': {
                    color: 'var(--mui-palette-grey-600)',
                    fontSize: '16px',
                    lineHeight: '22px',
                    fontWeight: 400,
                  },
                }}
                dangerouslySetInnerHTML={{ __html: data!.body! }}
              />
            ) : (
              <Typography variant='h4' color='var(--mui-palette-grey-500)'>
                {data?.body || notification.body}
              </Typography>
            )}
            <Box width={'100%'} position='relative' mb={2}>
              <Box
                display='flex'
                flex={1}
                justifyContent='flex-start'
                alignItems='center'
                gap={1}
                width='100%'
                position='absolute'
              >
                <Typography
                  variant='body2'
                  color='var(--mui-palette-grey-400)'
                  sx={{ whiteSpace: 'nowrap' }}
                >
                  {dayjs(notification.createdAt).fromNow()}
                </Typography>
                <Box
                  borderRadius='50%'
                  bgcolor='var(--mui-palette-grey-400)'
                  width={4}
                  height={4}
                />
                <CTooltip description={data?.sentBy}>
                  <Typography
                    variant='body2'
                    color='var(--mui-palette-grey-400)'
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {data?.sentBy || 'Coala Saúde'}
                  </Typography>
                </CTooltip>
              </Box>
            </Box>
          </Box>
        </Box>
        <CDivider />
      </>
    )
  },
  (prevProps, nextProps) => {
    return prevProps.notification.isRead === nextProps.notification.isRead
  },
)
