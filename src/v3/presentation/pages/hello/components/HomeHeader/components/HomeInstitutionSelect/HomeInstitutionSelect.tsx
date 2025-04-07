import { useAuth } from '../../../../../../hooks/useAuth'
import { useUrlQueryControl } from '../../../../../../hooks/useUrlQueryControl'
import CSelect from '../../../../../../newComponents/atoms/CSelect'
import { CSelectProps } from '../../../../../../newComponents/atoms/CSelect/CSelect'

export function HomeInstitutionSelect() {
  const { auth } = useAuth()

  const getInstitutionsOptions = () => {
    const institutions: CSelectProps['options'] = []

    auth.user?.roles.forEach((role) => {
      if (role.institution?.fantasyName)
        institutions.push({
          label: role.institution.fantasyName,
          value: role.institution.id,
        })
    })

    return institutions
  }

  const options = getInstitutionsOptions()

  const { queryParam, setQueryParam } = useUrlQueryControl({
    queryName: 'institutionId',
    startValue: options[0]?.value,
  })

  const hideComponent = !options.length || options.length === 1 || auth.user?.isAdmin
  if (hideComponent) return null

  return (
    <CSelect
      fullWidth={false}
      sx={{ width: 'fit-content' }}
      withoutLabel
      variant='filled'
      value={queryParam || options[0]?.value}
      onChange={(e) => {
        if (e.target.value) setQueryParam(e.target.value as string)
      }}
      options={options}
      disabledNullOption
    />
  )
}
