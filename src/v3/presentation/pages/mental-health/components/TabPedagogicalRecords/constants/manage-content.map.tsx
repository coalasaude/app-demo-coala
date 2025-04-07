import { PedagogicalRecordType } from '@/v3/domain/@v2/mental-health/enums/pedagogical-record-type.enum'

import { ManageContentProps } from '../types/manage-content.type'
import { DefaultContent } from '../components/@Contents/DefaultContent/DefaultContent'
import { AreaOfInterestContent } from '../components/@Contents/AreaOfInterestContent/AreaOfInterestContent'
import { DifficultiesContent } from '../components/@Contents/DifficultiesContent/DifficultiesContent'
import { BehaviorContent } from '../components/@Contents/BehaviorContent/BehaviorContent'
import { ExternalRegisterContent } from '../components/@Contents/ExternalRegisterContent/ExternalRegisterContent'
import { CoalaRegisterContent } from '../components/@Contents/CoalaRegisterContent/CoalaRegisterContent'

export type ContentTypeKey = PedagogicalRecordType | 'DEFAULT'

type ContentMapType = Record<
  ContentTypeKey,
  { component: (props: ManageContentProps) => JSX.Element }
>

export const ManageContentMap: ContentMapType = {
  DEFAULT: { component: (props) => <DefaultContent {...props} /> },
  [PedagogicalRecordType.AREAS_OF_INTEREST]: {
    component: (props) => <AreaOfInterestContent {...props} />,
  },
  [PedagogicalRecordType.BEHAVIORS]: { component: (props) => <BehaviorContent {...props} /> },
  [PedagogicalRecordType.DIFFICULTIES_OR_CHALLENGES]: {
    component: (props) => <DifficultiesContent {...props} />,
  },
  [PedagogicalRecordType.EXTERNAL_RECORDS]: {
    component: (props) => <ExternalRegisterContent {...props} />,
  },
  [PedagogicalRecordType.COALA_RECORDS]: {
    component: (props) => <CoalaRegisterContent {...props} />,
  },
}
