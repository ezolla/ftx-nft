import { keyframes } from 'styled-components'

export const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  
  to {
    transform: rotate(359deg);
  }
`
