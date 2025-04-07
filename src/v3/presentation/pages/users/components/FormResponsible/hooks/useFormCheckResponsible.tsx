import { useCallback, useEffect, useMemo, useState } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'

import { cleanTelephone } from '@/utils/cleanTelephone'
import { useFetchCheckUser } from '@/v3/presentation/hooks/api/user/useFetchCheckUser'

export const useFormCheckResponsible = ({
  form,
  prefix = '',
}: {
  prefix?: string
  form: UseFormReturn<FieldValues, any>
}) => {
  const { data, setAccess } = useFetchCheckUser()
  const [fetchByEmail, setFetchByEmail] = useState(false)
  const [fetchByPhone, setFetchByPhone] = useState(false)
  const [lastInputChanged, setLastInputChanged] = useState('')
  const [phone, email] = form.watch([prefix + 'phone', prefix + 'email'])

  const disabledPhone = useMemo(
    () => fetchByEmail && !!data?.telephone,
    [fetchByEmail, data?.telephone],
  )
  const disabledEmail = useMemo(() => fetchByPhone && !!data?.email, [fetchByPhone, data?.email])

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e?.target.id
    setLastInputChanged(name)
  }

  const clearFormFields = useCallback(
    (type: 'email' | 'phone') => {
      if (type === 'email') {
        form.setValue(prefix + 'name', '')
        form.setValue(prefix + 'lastname', '')
        form.setValue(prefix + 'phone', '')
        form.setValue(prefix + 'responsibleId', '')
        form.setValue(prefix + 'responsible', null)
      } else if (type === 'phone') {
        form.setValue(prefix + 'name', '')
        form.setValue(prefix + 'lastname', '')
        form.setValue(prefix + 'email', '')
        form.setValue(prefix + 'responsibleId', '')
        form.setValue(prefix + 'responsible', null)
      }
    },
    [form, prefix],
  )

  useEffect(() => {
    if (fetchByEmail || fetchByPhone) return
    if (phone && lastInputChanged.includes('phone')) setAccess(cleanTelephone(phone))
    if (email && lastInputChanged.includes('email')) setAccess(email)
  }, [email, phone, setAccess, fetchByEmail, fetchByPhone, lastInputChanged])

  useEffect(() => {
    const isPhoneInvalid = data && cleanTelephone(phone || '') !== data?.telephone
    const isEmailInvalid = data?.email && email !== data?.email

    if ((isPhoneInvalid || isEmailInvalid) && (fetchByEmail || fetchByPhone)) {
      if (disabledPhone) clearFormFields('email')
      if (disabledEmail) clearFormFields('phone')
      setFetchByEmail(false)
      setFetchByPhone(false)
    }
  }, [
    data,
    email,
    phone,
    clearFormFields,
    fetchByPhone,
    fetchByEmail,
    disabledPhone,
    disabledEmail,
  ])

  useEffect(() => {
    if (data) {
      const setFormFields = () => {
        const phone = data.getFormattedPhone()
        if (data.name) form.setValue(prefix + 'name', data.name)
        if (data.lastname) form.setValue(prefix + 'lastname', data.lastname)
        if (data.email) form.setValue(prefix + 'email', data.email)
        if (phone) form.setValue(prefix + 'phone', phone)
        if (data.id) form.setValue(prefix + 'responsibleId', data.id)
        if (data) form.setValue(prefix + 'responsible', data)
      }
      if (email === data?.email && !fetchByPhone) {
        setFetchByEmail(true)
        setFormFields()
      } else if (cleanTelephone(phone) === data.telephone && !fetchByEmail) {
        setFetchByPhone(true)
        setFormFields()
      }
    } else {
      form.setValue(prefix + 'responsibleId', '')
      form.setValue(prefix + 'responsible', null)
    }
  }, [data, email, fetchByEmail, fetchByPhone, form, phone, prefix])

  return {
    fetchByEmail,
    fetchByPhone,
    onChange,
    disabledPhone,
    disabledEmail,
  }
}
