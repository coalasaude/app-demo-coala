import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  display: flex;

  input[type='file'] {
    font-size: 100px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    visibility: hidden;
    width: 0%;
  }
`
