import { Box, Table, TableBody, TableCell, TableContainer, TableHead } from '@mui/material'
import { useRouter } from 'next/router'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'

import { NEW_ROUTES } from '@/constants/routes'
import { bindPathParams } from '@/utils/bindParams'
import { spacing } from '@/utils/spacing'
import { NotFound } from '@/v3/presentation/components/NotFound'
import TabsContainerHeader from '@/v3/presentation/components/TabsContainerHeader'
import { CTableRow } from '@/v3/presentation/newComponents/atoms/CTableRow/CTableRow'
import { useFetchBrowseMedicine } from '@/v3/presentation/hooks/api/@v2/health-history/medicine/useFetchBrowseMedicine'
import { AuthorizationStatus } from '@/v3/domain/medicine'
import { CTooltip } from '@/v3/presentation/newComponents'
import { useFetchReadUser } from '@/v3/presentation/hooks/api/@v2/users/users/useFetchReadUser'
import { useCheckCanManipulateHealthHistory } from '@/v3/presentation/hooks/useCheckCanManipulateHealthHistory'

import TabContentSkeleton from '../Skeletons/TabContentSkeleton'

export const TabMedicine = ({ userId }: { userId?: number }) => {
  const { medicines, isPending } = useFetchBrowseMedicine({ userId: userId! })
  const router = useRouter()

  const { user } = useFetchReadUser({ userId: userId! })
  const { canManipulate } = useCheckCanManipulateHealthHistory(user!)

  if (!userId || isPending) return <TabContentSkeleton repeat={4} />

  const handleAdd = () => {
    router.push(
      bindPathParams(`${NEW_ROUTES.AUTHENTICATED.USERS.HEALTH_HISTORIC.MEDICINE.ADD.path}`, {
        userId,
      }),
    )
  }

  const handleView = (id: number) => {
    router.push(
      bindPathParams(`${NEW_ROUTES.AUTHENTICATED.USERS.HEALTH_HISTORIC.MEDICINE.VIEW.path}`, {
        userId,
        id,
      }),
    )
  }

  const sortedMedicineList = medicines?.data?.sort((a, b) => {
    const isValidA = a.usageStatus === 'VALID'
    const isValidB = b.usageStatus === 'VALID'

    if (isValidA === isValidB) {
      const dateA = a.emissionDate ? new Date(a.emissionDate).getTime() : 0
      const dateB = b.emissionDate ? new Date(b.emissionDate).getTime() : 0
      return dateB - dateA
    }

    return isValidA ? -1 : 1
  })

  return (
    <>
      <TabsContainerHeader
        withPadding
        label='Medicamentos'
        buttonLabel={canManipulate ? 'Adicionar' : undefined}
        onClick={handleAdd}
      />

      {medicines?.data?.length === 0 ? (
        <Box mb={spacing(3)}>
          <NotFound text='Não existem medicamentos cadastrados' />
        </Box>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <CTableRow>
                <TableCell
                  sx={{
                    width: [undefined, undefined, '32%'],
                    color: 'var(--mui-palette-grey-500) !important',
                    paddingX: '12px !important',
                    paddingY: '12px ',
                  }}
                >
                  Medicamento
                </TableCell>
                <TableCell
                  sx={{
                    width: [undefined, undefined, '12%'],
                    color: 'var(--mui-palette-grey-500) !important',
                  }}
                >
                  Uso
                </TableCell>
                <TableCell
                  sx={{
                    width: [undefined, undefined, '17%'],
                    color: 'var(--mui-palette-grey-500) !important',
                  }}
                >
                  Emissão da receita
                </TableCell>
                <TableCell
                  sx={{
                    width: [undefined, undefined, '17%'],
                    color: 'var(--mui-palette-grey-500) !important',
                  }}
                >
                  Início do uso
                </TableCell>
                <CTooltip description='Autoriza medicação na escola' placement='top'>
                  <TableCell
                    sx={{
                      width: [undefined, undefined, '17%'],
                      color: 'var(--mui-palette-grey-500) !important',
                    }}
                  >
                    Uso na escola
                  </TableCell>
                </CTooltip>
              </CTableRow>
            </TableHead>
            <TableBody>
              {sortedMedicineList?.map((medicine) => {
                const isStoppedMedicine = medicine.getIsStoppedMedicine()

                return (
                  <CTableRow
                    key={medicine.id}
                    onClick={() => handleView(medicine.id)}
                    sx={{ cursor: 'pointer', opacity: isStoppedMedicine ? 0.6 : 1.0 }}
                  >
                    <TableCell
                      sx={{ fontWeight: 'bold', paddingLeft: '12px !important', paddingY: '16px' }}
                    >
                      {`${medicine.name} ${medicine.getConcentrationString()}`}
                    </TableCell>
                    <TableCell>{medicine.getUsageString()}</TableCell>
                    <TableCell>{medicine.getFormattedEmissionDate()}</TableCell>
                    {medicine.authorizationStatus === AuthorizationStatus.PENDING ? (
                      <TableCell>Não Definido</TableCell>
                    ) : (
                      <TableCell
                        dangerouslySetInnerHTML={{
                          __html: medicine.getUsageInitDateString().replace(/\n/g, '<br>'),
                        }}
                      />
                    )}

                    {(medicine.authorizationStatus === AuthorizationStatus.AUTHORIZED_SCHOOL ||
                      medicine.authorizationStatus === AuthorizationStatus.AUTHORIZED) && (
                      <TableCell>
                        <CheckCircleOutlineIcon
                          sx={{
                            fontSize: 24,
                            color: isStoppedMedicine
                              ? 'var(--mui-palette-grey-400)'
                              : 'var(--mui-palette-success-main)',
                          }}
                        />
                      </TableCell>
                    )}

                    {medicine.authorizationStatus === AuthorizationStatus.NOT_AUTHORIZED && (
                      <TableCell>
                        <CancelOutlinedIcon
                          sx={{
                            fontSize: 24,
                            color: isStoppedMedicine
                              ? 'var(--mui-palette-grey-400)'
                              : 'var(--mui-palette-error-main)',
                          }}
                        />
                      </TableCell>
                    )}

                    {medicine.authorizationStatus === AuthorizationStatus.PENDING && (
                      <TableCell>Aguardando resposta</TableCell>
                    )}
                  </CTableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  )
}
