import { Box } from '@mui/material'

import { theme } from '@/theme'

import { HorizontalScrollListProps } from './types'

export function HorizontalScrollList<T>({ options, renderItem  }: HorizontalScrollListProps<T>) {
    const mobileBreakPoint = theme.breakpoints.down('sm')

    return (
        <Box
            sx={{
                display: 'flex',
                overflowX: 'auto',
                p: 0.5,
                m: -0.5,
                gap: 2,
                marginRight: [-2, 0],
                '-webkit-overflow-scrolling': 'touch',
                [mobileBreakPoint]: {
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': { display: 'none' },
                },
            }}
        >
            {options.map((item, index) => renderItem(item, index))}
        </Box>
    )
}