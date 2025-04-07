import { RecordsType } from '@/types/records'

export const modalMessageMap = {
  [RecordsType.ATTACHMENTS]: (
    <>
      Tem certeza que deseja <b>invalidar</b> este <br /> anexo?{' '}
    </>
  ),
  [RecordsType.EXAM]: (
    <>
      Tem certeza que deseja <b>invalidar</b> esse <br /> exame?{' '}
    </>
  ),
  [RecordsType.MEDICAL_RECORDS]: (
    <>
      Tem certeza que deseja <b>invalidar</b> esse <br /> registro?{' '}
    </>
  ),
  [RecordsType.PRESCRIPTION]: (
    <>
      Tem certeza que deseja <b>invalidar</b> esse <br /> receituário?{' '}
    </>
  ),
  [RecordsType.REPORTS]: (
    <>
      Tem certeza que deseja <b>invalidar</b> esse <br /> relatório?{' '}
    </>
  ),
  [RecordsType.SICKNOTE]: (
    <>
      Tem certeza que deseja <b>invalidar</b> esse atestado?{' '}
    </>
  ),
} as any

export const modalTitleMap = {
  [RecordsType.ATTACHMENTS]: 'Invalidar anexo',
  [RecordsType.EXAM]: 'Invalidar exame',
  [RecordsType.MEDICAL_RECORDS]: 'Invalidar registro médico',
  [RecordsType.PRESCRIPTION]: 'Invalidar receituário',
  [RecordsType.REPORTS]: 'Invalidar relatório',
  [RecordsType.SICKNOTE]: 'Invalidar atestado',
} as any
