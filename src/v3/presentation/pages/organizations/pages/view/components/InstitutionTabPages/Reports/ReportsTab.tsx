import { yupResolver } from '@hookform/resolvers/yup'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { CForm } from '@/components/Forms'
import { useLazyFetchLastUpdateHealthHistory } from '@/v3/presentation/hooks/api/@v2/pdf/useLazyFetchLastUpdateHealthHistory'
import { CBaseContainer } from '@/v3/presentation/newComponents'

import { FormReport } from './components/FormReport/FormReport'
import {
  initialReportValues,
  IReportFormFields,
  schemaReport,
} from './components/FormReport/schema'
import { getFormReportProps } from './components/FormReport/types'
import { useInstitutionReport } from './hooks/useReports'
import { IRepostType } from './types'

export const ReportsTab = ({ data, type }: IRepostType) => {
  const { onGenerateReport, isPending } = useInstitutionReport()
  const lastUpdateHealthHistory = useLazyFetchLastUpdateHealthHistory()
  const [helperText, setHelperText] = useState<string>('')

  const form = useForm({ resolver: yupResolver(schemaReport), defaultValues: initialReportValues })

  const institutionsIds = form.watch('institutionsIds')

  useEffect(() => {
    lastUpdateHealthHistory.fetch({ institutionsIds }).then((data) => {
      if (!data) return

      const date = dayjs(new Date(data.lastUpdate)).format('DD.MM.YYYY | HH:mm')

      setHelperText(`Última atualização: ${date}`)
    })
  }, [institutionsIds, lastUpdateHealthHistory])

  const onSubmit = async (data: IReportFormFields) => {
    await onGenerateReport(data)
  }

  const onClean = () => {
    form.reset()
    form.clearErrors()
  }

  return (
    <CBaseContainer
      title={'Tipo de relatório'}
      buttonLabel='Exportar'
      cancelLabel='Limpar'
      boxShadow='none'
      buttonDisabled={isPending}
      onCancel={onClean}
      withContentPadding={false}
      sx={{  px: 2, pt: 1 }}
      noBorder
    >
      <CForm id='myForm' form={form} onSubmit={onSubmit}>
        <FormReport {...getFormReportProps(type, data)} helperText={helperText} />
      </CForm>
    </CBaseContainer>
  )
}
