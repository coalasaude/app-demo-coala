import React from 'react'
import { Box } from '@mui/material'

import { CSelectControlled, ICSelectControlled } from '@/components/Forms'

import CChip from '../../newComponents/atoms/CChip'

export function CSelectChipControlled(props: ICSelectControlled) {
  return (
    <CSelectControlled
      fullWidth
      multiple
      {...props}
      renderValue={(selected: any) => {
        const filteredValues = props?.options
          ? props?.options?.filter(({ value: optValue }: any) => selected.includes(optValue))
          : []
        return (
          (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {filteredValues?.map(({ label }: any) => (
                <CChip size='small' label={label} variant='outlined' key={label} />
              ))}
            </Box>
          ) || []
        )
      }}
      options={props?.options}
    />
  )
}
