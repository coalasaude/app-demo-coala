import { CDialogue, useModalContext } from '@/v3/presentation/components/Modal'
import { useMutateAddReport } from '@/v3/presentation/hooks/api/@v2/pdf/useMutateAddReportHealthHistory'
import { useAuth } from '@/v3/presentation/hooks/useAuth'

import { IReportFormFields } from '../components/FormReport/schema'

export const useInstitutionReport = () => {
  const { handleModal } = useModalContext()
  const { auth } = useAuth()
  const addRepot = useMutateAddReport()

  const onGenerateReport = async (data: IReportFormFields) => {
    await addRepot.mutateAsync(data)

    handleModal(
      <CDialogue
        confirmButtonLabel='Ok'
        onConfirm={() => handleModal()}
        title='Seu relatório está sendo gerado!'
        description={
          <span>
            Aguarde um momento, <b>{auth.user?.name}</b>. Você receberá um e-mail com o arquivo
            completo em <b>{auth.user?.email}</b>, esse processo pode levar alguns minutos :)
          </span>
        }
      />,
    )
  }

  return { onGenerateReport, isPending: addRepot.isPending }
}
