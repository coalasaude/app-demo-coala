import AppsIcon from '@mui/icons-material/Apps'
import Router from 'next/router'

import { Module } from '@/v3/domain/Module'
import { bindPathParams } from '@/utils/bindParams'
import { NEW_ROUTES } from '@/constants/routes'
import { useLayout } from '@/hooks/useLayout'

import { ModuleAccordion } from '../ModuleAccordion'

import { ModuleContainerWrapper, StyledWrapperTitleIcon } from './styles'
export interface IVideo {
  title: string
}

export interface IModule {
  title: string
  videos: IVideo[]
  haveQuiz?: boolean
}

export interface IFinals {
  name: string
}

interface ModuleContainerProps {
  modules: Module[]
  showProgress?: boolean
  showIcon?: boolean
  isClickable: boolean
}

export const ModuleContainer: React.FC<ModuleContainerProps> = ({
  modules,
  showProgress,
  showIcon,
  isClickable,
}) => {
  const { showSnackBar } = useLayout()
  return (
    <ModuleContainerWrapper>
      {showIcon ? (
        <StyledWrapperTitleIcon>
          <AppsIcon />
          Módulos
        </StyledWrapperTitleIcon>
      ) : (
        <h1>Módulos</h1>
      )}
      {modules.map((module, index) => (
        <ModuleAccordion
          key={`${module.name}${index}`}
          title={module.name}
          items={module.class}
          number={index + 1}
          haveQuiz={module.hasQuiz}
          moduleId={module.id}
          progress={showProgress ? module.getProgressPercentage() : undefined}
          isClickable={isClickable}
          onClick={
            isClickable
              ? (classId?: number) =>
                  Router.push(
                    bindPathParams(NEW_ROUTES.AUTHENTICATED.COURSE.CLASS.path, {
                      id: String(Router.query.id),
                      classId: String(classId),
                    })
                  )
              : undefined
          }
        />
      ))}
      <ModuleAccordion
        title='Avaliação Final'
        items={[{ id: modules.length + 1, name: 'Prova Final', alreadyViewed: false }]}
        number={modules.length + 1}
        isClickable={isClickable}
        onClick={() => {
          if (isClickable && modules.every((module) => module.progress === 1)) {
            Router.push(
              bindPathParams(NEW_ROUTES.AUTHENTICATED.COURSE.FINAL_TEST.path, {
                id: String(Router.query.id),
              })
            )
          } else if (isClickable) {
            showSnackBar({
              type: 'error',
              message: 'Faça todas as aulas antes de fazer a prova final',
            })
          }
        }}
      />
    </ModuleContainerWrapper>
  )
}
