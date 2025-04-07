import { AppointmentTablePill } from '../AppointmentPill/AppointmentTablePill'

interface ClassificationPillProps {
  classificationTitle: string
  classificationColor: string
  isClassificationByAi: boolean
}

export const ClassificationPill = ({
  classificationTitle,
  classificationColor,
  isClassificationByAi,
}: ClassificationPillProps) => (
  <AppointmentTablePill
    title={classificationTitle}
    color={classificationColor}
    isClassificationByAi={isClassificationByAi}
  />
)
