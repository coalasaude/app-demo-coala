import styles from 'styled-components'

import { spacing } from '@/v3/presentation/utils/spacing'

export const StyledSearchBoxWrapper = styles.div`
    display: flex;
    flex-direction: column;
    gap: ${spacing(2)};
    margin-top: ${spacing(1)};
    padding-bottom: ${spacing(1)};
    padding-top: ${spacing(1)};
`
export const StyledNotFound = styles.div`
    margin: auto;
    padding: ${spacing(2)};
`

export const StyledAdminNotFound = styles.div`
    margin: ${spacing(2)} ${spacing(1)};
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--mui-palette-grey-100);
    color: var(--mui-palette-grey-700);
    width: 100%;
    gap: ${spacing(1)};
    padding: ${spacing(2)};
    border-radius: ${spacing(1)};
`
