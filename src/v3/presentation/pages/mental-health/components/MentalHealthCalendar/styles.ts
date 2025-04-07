import styled from 'styled-components'

export const StyledCalendarWrapper = styled.div`
  width: 90%;
  margin: 2rem auto 0 auto;

  .MuiPickersFadeTransitionGroup-root > div,
  .MuiDayCalendar-header {
    font-weight: 800;
    color: var(--mui-palette-primary-main);
  }

  @media (min-width: 800px) {
    width: 100%;

    .MuiDateCalendar-root,
    .MuiYearCalendar-root {
      align-items: center;
      width: 95%;
      border-radius: 1rem;
    }

    .MuiPickersLayout-root > div > div {
      width: 100%;
      font-weight: bold;
      color: var(--mui-palette-primary-main);
    }

    .MuiPickersFadeTransitionGroup-root,
    .MuiDayCalendar-header {
      width: 100%;
    }

    .MuiPickersFadeTransitionGroup-root > div > :nth-child(1),
    .MuiDayCalendar-header {
      justify-content: space-evenly;
    }

    .MuiPickersSlideTransition-root {
      div[role='row'] {
        justify-content: space-evenly;
      }
    }
  }
`
