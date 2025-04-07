import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box } from '@mui/material'

import { CDialogue } from '@/v3/presentation/components/Modal'
import { useFetchLastNotifyActivateAccount } from '@/v3/presentation/hooks/api/@v2/communications/onboarding/useFetchLastNotifyActivateAccount.ts'
import { useMutateNotifyActivateAccountsRequest } from '@/v3/presentation/hooks/api/@v2/communications/onboarding/useMutateNotifyActivateAccountsRequest'
import {
  NotifyGroupEnum,
  notifyGroupMap,
} from '@/v3/domain/@v2/communication/get-last-notify-activate.mode'
import { CForm, CSelectControlled } from '@/components/Forms'

const schema = yup
  .object({
    group: yup.string().required(),
  })
  .required()

type FormData = {
  group: string
}

export const NotificationModal = () => {
  const router = useRouter()
  const { mutateAsync: notifyActivateAccounts } = useMutateNotifyActivateAccountsRequest()
  const { data: lastNotifyData } = useFetchLastNotifyActivateAccount({
    institutionId: Number(router.query.id),
  })
  const { handleSubmit, formState, ...form } = useForm<FormData>({
    defaultValues: {
      group: '',
    },
    resolver: yupResolver(schema),
  })

  const { date, hasSendNotification, lastSendByUser, group } = lastNotifyData || {}

  const onSubmit = async () => {
    const body = form.getValues()
    if (!body.group) {
      return form.setError('group', { type: 'required' })
    }

    const institutionId = Number(router.query.id as string)
    const group = body.group as NotifyGroupEnum
    await notifyActivateAccounts({ institutionId, group })
  }

  return (
    <CDialogue
      title='Notificações de ativação'
      confirmButtonLabel='Continuar'
      cancelButtonLabel='Cancelar'
      onConfirm={handleSubmit(onSubmit)}
      keepOpenOnConfirm={!formState.isValid}
      description={
        <CForm form={{ handleSubmit, formState, ...form }} onSubmit={onSubmit} id='myForm'>
          <span>
            Selecione o grupo de usuários não ativos que deseja enviar notificações recomendando que
            se ativem na plataforma.
            <Box mt={2} />
            <CSelectControlled
              name='group'
              variant='outlined'
              label='Grupo'
              placeholder='Selecione o grupo'
              error={formState.errors.group?.message}
              options={Object.entries(notifyGroupMap).map(([key, value]) => ({
                label: value,
                value: key,
              }))}
            />
            {hasSendNotification && (
              <>
                <div style={{ marginTop: '16px' }}>
                  <strong>Último envio em:</strong>{' '}
                  {dayjs(date).format('DD/MM/YYYY') || 'Não informado'}
                </div>
                <div>
                  <strong>Enviado por:</strong> {lastSendByUser || 'Não informado'}
                </div>
                <div>
                  <strong>Grupo:</strong> {group ? notifyGroupMap[group] : ''}
                </div>
              </>
            )}
            <div style={{ marginTop: '16px' }} />
            Deseja continuar?
          </span>
        </CForm>
      }
    />
  )
}
