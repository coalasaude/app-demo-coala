import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { useModalContext } from '@/v3/presentation/components/Modal'
import { useMutateAddVaccineWithComprovant } from '@/v3/presentation/hooks/api/@v2/health-history/vaccine/useMutateAddVaccineWithComprovant'
import { removeDuplicateDates } from '@/v3/utils/removeDuplicateDates'
import { useFetchBrowseUserVaccine } from '@/v3/presentation/hooks/api/@v2/health-history/vaccine/useFetchBrowseUserVaccine'

import { CDialogue } from '../../../newComponents/layout/CDialogue'
import { IVaccineComprovantFormFields } from '../components/FormComprovant/schema'
import { IVaccineDosageFormFields, IVaccineFormField } from '../components/FormVacineDosage/schema'

export interface IVaccineDosageForm extends IVaccineDosageFormFields {
  completed?: boolean
  vaccines: (IVaccineFormField & {
    id?: number
    dosageDatesExits?: Date[]
    reinforcementDatesExits?: Date[]
  })[]
}

export const useVaccineControl = () => {
  const router = useRouter()

  const selectedUserId = Number(router.query.userId as string)
  const [comprovants, setComprovants] = useState<IVaccineDosageForm[]>([])
  const [comprovantsIndex, setComprovantsIndex] = useState<number>()
  const addVaccineWithComprovant = useMutateAddVaccineWithComprovant()

  const { vaccines } = useFetchBrowseUserVaccine({ userId: selectedUserId })

  const { handleModal } = useModalContext()

  const isLoading = addVaccineWithComprovant.isPending
  const isComprovantSelected = typeof comprovantsIndex === 'number'
  const actualVaccineComprovant: IVaccineDosageForm = isComprovantSelected
    ? comprovants[comprovantsIndex]
    : comprovants[comprovants.length - 1]

  const onEditComprovants = (edit: (item: IVaccineDosageForm) => IVaccineDosageForm) => {
    const newComprovants = comprovants.map((item, comprovantIndex) => {
      if (comprovantIndex === comprovantsIndex) {
        return edit(item)
      }
      return item
    })

    setComprovants(newComprovants)
  }

  const onSubmit = async (body: IVaccineDosageFormFields, options?: { onSuccess?: () => void }) => {
    const action = async () => {
      if (selectedUserId && body.document && body.vaccines?.length) {
        await addVaccineWithComprovant.mutateAsync({
          userId: selectedUserId,
          documentId: Number(body.document.id),
          vaccines: body.vaccines.map((vaccine) => ({
            vaccineId: vaccine.vacineId,
            dosage: vaccine.dosageDates || [],
            reinforcement: vaccine.reinforcementDates || [],
          })),
        })

        onEditComprovants((item) => {
          return {
            ...item,
            vaccines:
              body.vaccines?.map((vaccine) => ({
                vacineId: vaccine.vacineId,
                dosageDates: vaccine.dosageDates,
                reinforcementDates: vaccine.reinforcementDates,
              })) || [],
            completed: true,
          }
        })

        options?.onSuccess?.()
      }
    }

    const isAllVaccinesCompleted = body.vaccines?.every((vaccine) => {
      const dosageCompleted = !!vaccine?.dosageDates?.length
      const reinforcementCompleted = !!vaccine?.reinforcementDates?.length

      return dosageCompleted || reinforcementCompleted
    })

    if (isAllVaccinesCompleted) {
      await action()
    } else {
      handleModal(
        <CDialogue
          confirmButtonLabel='Sim'
          cancelButtonLabel='Não'
          onConfirm={action}
          title='Atenção!'
          description={
            <>
              Você <b>não</b> cadastrou todas as vacinas selecionadas, deseja continuar?{' '}
            </>
          }
        />,
      )
    }
  }

  const handleAddComprovant = (data: IVaccineComprovantFormFields) => {
    const comprovant: IVaccineDosageFormFields = {
      document: data.document!,
      vaccines: data.vaccines.map((vaccineId) => {
        const actualData = isComprovantSelected
          ? actualVaccineComprovant?.vaccines.find((v) => v.vacineId === vaccineId)
          : undefined
        const allData = structuredClone(comprovants)

        if (isComprovantSelected) {
          allData.splice(comprovantsIndex, 1)
        }

        const dosageDatesExits =
          removeDuplicateDates({
            dates: allData.reduce<Date[]>((acc, comprovant) => {
              return [
                ...acc,
                ...(comprovant.vaccines.find((v) => v.vacineId === vaccineId)?.dosageDates || []),
              ]
            }, []),
          }) || []

        const reinforcementDatesExits =
          removeDuplicateDates({
            dates: allData.reduce<Date[]>((acc, comprovant) => {
              return [
                ...acc,
                ...(comprovant.vaccines.find((v) => v.vacineId === vaccineId)?.reinforcementDates ||
                  []),
              ]
            }, []),
          }) || []

        const dosageDates = removeDuplicateDates({ dates: actualData?.dosageDates }) || []
        const reinforcementDates =
          removeDuplicateDates({ dates: actualData?.reinforcementDates }) || []

        const dosages = dosageDatesExits.length + dosageDates.length
        const reinforcements = reinforcementDatesExits.length + reinforcementDates.length

        return {
          id: actualData?.id,
          dosageDates,
          reinforcementDates,
          dosages: dosages || undefined,
          reinforcements: reinforcements || undefined,
          vacineId: vaccineId,
          dosageDatesExits,
          reinforcementDatesExits,
        }
      }),
    }

    if (isComprovantSelected) {
      onEditComprovants(() => ({ ...comprovant, completed: actualVaccineComprovant.completed }))
    } else {
      setComprovantsIndex(comprovants.length)
      setComprovants([...comprovants, comprovant])
    }
  }

  const handleRemoveComprovantVaccine = (vaccineIndex: number) => {
    onEditComprovants((item) => {
      const newVaccines = item.vaccines.filter((_, _vaccineIndex) => _vaccineIndex !== vaccineIndex)
      return { ...item, vaccines: newVaccines }
    })
  }

  useEffect(() => {
    if (vaccines?.data) {
      setComprovants((prev) => {
        const comprovants = vaccines.data.map<IVaccineDosageForm>((vaccine) => {
          const vaccines = [
            {
              vacineId: vaccine.id,
              id: vaccine.id,
              dosageDates: vaccine.vaccineDosage?.map((date) => new Date(date.dosageDate)),
              reinforcementDates: vaccine.vaccineReinforcement?.map(
                (date) => new Date(date.reinforcementDate),
              ),
            },
          ]

          return {
            document: { name: '' } as File,
            vaccines,
            completed: false,
          }
        })

        if (prev.find((comprovant) => comprovant.completed))
          comprovants[comprovants.length - 1].completed = true

        return comprovants
      })
    }
  }, [vaccines])

  const defaultValue = isComprovantSelected
    ? {
        document: comprovants[comprovantsIndex]?.document,
        vaccines: comprovants[comprovantsIndex]?.vaccines?.map((vaccine) => vaccine.vacineId),
      }
    : undefined

  return {
    userId: selectedUserId,
    comprovants: comprovants,
    actualVaccineComprovant,
    setComprovants,
    comprovantsIndex,
    setComprovantsIndex,
    handleAddComprovant,
    handleRemoveComprovantVaccine,
    onSubmit,
    defaultValue,
    isLoading,
    existentVaccines: actualVaccineComprovant?.vaccines?.reduce(
      (acc, curr) => {
        return {
          ...acc,
          [curr.vacineId]: {
            dosesDate: [
              ...(acc[curr.vacineId]?.dosesDate || []),
              ...(curr?.dosageDatesExits || []),
            ],
            reinforcementDates: [
              ...(acc[curr.vacineId]?.reinforcementDates || []),
              ...(curr?.reinforcementDatesExits || []),
            ],
          },
        }
      },
      {} as Record<number, { dosesDate: Date[]; reinforcementDates: Date[] }>,
    ),
  }
}
