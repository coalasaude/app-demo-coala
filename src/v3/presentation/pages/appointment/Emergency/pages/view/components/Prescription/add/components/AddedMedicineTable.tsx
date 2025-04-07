import {
  Button,
  SxProps,
  TableBody,
  TableContainer,
  Typography,
  Theme,
  Table,
  TableCell,
  TableHead,
} from '@mui/material'
import { Delete } from '@mui/icons-material'
import { UseFieldArrayRemove } from 'react-hook-form/dist/types/fieldArray'
import { useRouter } from 'next/router'

import Paper from '@/v3/presentation/components/Paper'
import { CTableRow } from '@/v3/presentation/newComponents/atoms/CTableRow/CTableRow'
import { MedicineConcentrationUnit, MedicineDosageUnit, ScheduledMedicine } from '@/types/medicine'
import { CTooltip } from '@/v3/presentation/newComponents'

interface MedicineOptions {
  concentrationUnit?: Partial<MedicineConcentrationUnit>[]
  dosageUnit?: Partial<MedicineDosageUnit>[]
  scheduledMedicine?: Partial<ScheduledMedicine>[]
}

export const AddedMedicineTable = ({
  fields,
  remove,
  data,
}: {
  fields: any
  remove: UseFieldArrayRemove
  data: MedicineOptions
}) => {
  const router = useRouter()
  const isCallPresent = router.pathname.includes('call')

  const newArray = fields.filter((item: { name: string }) => !!item.name)
  const tdStyle: SxProps<Theme> | undefined = {
    borderCollapse: 'collapse',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    minWidth: '200px',
  }
  return (
    <>
      {fields.length > 1 && (
        <Paper p={1}>
          <Typography variant='h4' mb={2}>
            Medicamentos adicionados
          </Typography>
          <TableContainer
            sx={{
              overflow: 'auto',
              '::-webkit-scrollbar': {
                height: '8px',
              },
              '::-webkit-scrollbar-thumb': {
                backgroundColor: 'var(--mui-palette-grey-400)',
                borderRadius: '5px',
                ':hover': {
                  backgroundColor: 'var(--mui-palette-grey-500)',
                },
              },
            }}
          >
            <Table sx={{ tableLayout: 'fixed', minWidth: isCallPresent ? 800 : undefined }}>
              <TableHead>
                <CTableRow>
                  <CTooltip description='Nome' placement='bottom'>
                    <TableCell sx={tdStyle}>Nome</TableCell>
                  </CTooltip>
                  <CTooltip description='Concentração' placement='bottom'>
                    <TableCell sx={tdStyle}>Concentração</TableCell>
                  </CTooltip>
                  <CTooltip description='Dosagem' placement='bottom'>
                    <TableCell sx={tdStyle}>Dosagem</TableCell>
                  </CTooltip>
                  <CTooltip description='Periodicidade' placement='bottom'>
                    <TableCell sx={tdStyle}>Periodicidade</TableCell>
                  </CTooltip>
                  <CTooltip description='SOS' placement='bottom'>
                    <TableCell sx={tdStyle}>SOS</TableCell>
                  </CTooltip>
                  <CTooltip description='Contínuo' placement='bottom'>
                    <TableCell sx={tdStyle}>Contínuo</TableCell>
                  </CTooltip>
                  <CTooltip description='Dias de tratamento' placement='bottom'>
                    <TableCell sx={tdStyle}>Dias de tratamento</TableCell>
                  </CTooltip>
                  <CTooltip description='Condição para uso' placement='bottom'>
                    <TableCell sx={tdStyle}>Condição para uso</TableCell>
                  </CTooltip>
                  <TableCell sx={tdStyle} />
                </CTableRow>
              </TableHead>
              <TableBody>
                {newArray.map((item: any, i: number) => {
                  const concentrationUnit = data?.concentrationUnit?.find(
                    (u) => u.id == item?.medicine_concentration_unit_id,
                  )
                  const dosageUnit = data?.dosageUnit?.find(
                    ({ id }) => id == item?.medicine_dosage_unit_id,
                  )
                  const scheduledMedicine = data?.scheduledMedicine?.find(
                    ({ id }) => id == item?.scheduled_medicine_id,
                  )
                  return (
                    <CTableRow key={item?.id}>
                      <CTooltip description={item?.name || '-'} placement='bottom'>
                        <TableCell sx={tdStyle}>{item?.name || '-'}</TableCell>
                      </CTooltip>
                      <CTooltip
                        description={
                          `${item?.concentration}${concentrationUnit?.name || ''}` || '-'
                        }
                        placement='bottom'
                      >
                        <TableCell sx={tdStyle}>
                          {`${item?.concentration}${concentrationUnit?.name || ''}` || '-'}
                        </TableCell>
                      </CTooltip>
                      <CTooltip
                        description={`${item?.dosage} ${dosageUnit?.name || ''}` || '-'}
                        placement='bottom'
                      >
                        <TableCell sx={tdStyle}>
                          {`${item?.dosage} ${dosageUnit?.name || ''}` || '-'}
                        </TableCell>
                      </CTooltip>
                      <CTooltip description={scheduledMedicine?.name || '-'} placement='bottom'>
                        <TableCell sx={tdStyle}>{scheduledMedicine?.name || '-'}</TableCell>
                      </CTooltip>
                      <CTooltip
                        description={item?.use_if_necessary === 'true' ? 'Sim' : 'Não'}
                        placement='bottom'
                      >
                        <TableCell sx={tdStyle}>
                          {item?.use_if_necessary === 'true' ? 'Sim' : 'Não'}
                        </TableCell>
                      </CTooltip>
                      <CTooltip
                        description={item?.continuous_usage === 'true' ? 'Sim' : 'Não'}
                        placement='bottom'
                      >
                        <TableCell sx={tdStyle}>
                          {item?.continuous_usage === 'true' ? 'Sim' : 'Não'}
                        </TableCell>
                      </CTooltip>
                      <CTooltip description={item?.valid_until || '-'} placement='bottom'>
                        <TableCell sx={tdStyle}>{item?.valid_until || '-'}</TableCell>
                      </CTooltip>
                      <CTooltip description={item?.recommendation || '-'} placement='bottom'>
                        <TableCell sx={tdStyle}>{item?.recommendation || '-'}</TableCell>
                      </CTooltip>
                      <TableCell width='5%'>
                        <Button onClick={() => remove(i)} variant='text'>
                          <Delete />
                        </Button>
                      </TableCell>
                    </CTableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </>
  )
}
