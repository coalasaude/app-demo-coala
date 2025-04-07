import { PedagogicalRecordType } from '@/v3/domain/@v2/mental-health/enums/pedagogical-record-type.enum'

import { AreaOfInterestListContent } from '../components/@Contents/DefaultContent/components/@Contents/AreaOfInterestList/AreaOfInterestListContent'
import { ListContentProps } from '../types/list-content.type'
import { BehaviorListContent } from '../components/@Contents/DefaultContent/components/@Contents/BehaviorList/BehaviorListContent'
import { DifficultiesListContent } from '../components/@Contents/DefaultContent/components/@Contents/DifficultiesList/DifficultiesListContent'
import { ExternalRegisterListContent } from '../components/@Contents/DefaultContent/components/@Contents/ExternalRegistersList/ExternalRegistersList'
import { CoalaRegistersListContent } from '../components/@Contents/DefaultContent/components/@Contents/CoalaRegistersList/CoalaRegistersList'

import { labelContent } from './label-content'

type ContentMapType = Record<
  PedagogicalRecordType,
  { component: (props: ListContentProps) => JSX.Element; label: string }
>

export const ListContentMap: ContentMapType = {
  [PedagogicalRecordType.AREAS_OF_INTEREST]: {
    label: labelContent.AREAS_OF_INTEREST,
    component: (props) => <AreaOfInterestListContent {...props} />,
  },
  [PedagogicalRecordType.BEHAVIORS]: {
    label: labelContent.BEHAVIORS,
    component: (props) => <BehaviorListContent {...props} />,
  },
  [PedagogicalRecordType.DIFFICULTIES_OR_CHALLENGES]: {
    label: labelContent.DIFFICULTIES_OR_CHALLENGES,
    component: (props) => <DifficultiesListContent {...props} />,
  },
  [PedagogicalRecordType.EXTERNAL_RECORDS]: {
    label: labelContent.EXTERNAL_RECORDS,
    component: (props) => <ExternalRegisterListContent {...props} />,
  },
  [PedagogicalRecordType.COALA_RECORDS]: {
    label: labelContent.COALA_RECORDS,
    component: (props) => <CoalaRegistersListContent {...props} />,
  },
}
