import React from 'react'
import styled from 'styled-components'

import { spin } from 'components/Animations'
import { Loading } from 'components/Icons'

interface Props extends React.HTMLProps<HTMLButtonElement> {
  isLoading?: boolean
  isIconOnly?: boolean
  disabled?: boolean
  ref?: any
  as?: any
}

const Button: React.FC<Props> = ({
  isLoading,
  isIconOnly,
  disabled,
  children,
  ...props
}: Props): JSX.Element => {
  return (
    <StyledButton
      isLoading={isLoading || false}
      isIconOnly={isIconOnly || false}
      disabled={disabled}
      {...props}
    >
      {isLoading === true ? (
        <div className='loading'>
          <Loading /> {children}
        </div>
      ) : (
        children
      )}
    </StyledButton>
  )
}

export default Button

const StyledButton = styled.button<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ isIconOnly }) => (isIconOnly ? '5px 5px' : '5px 12px')};
  color: var(--color-dove);
  background: var(--color-white);
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  opacity: ${({ disabled }) => (disabled === true ? '0.5' : 'none')};
  border: 1px solid var(--color-mercury);
  border-radius: 5px;
  transition: 0.15s ease;
  user-select: none;

  svg {
    fill: var(--color-dove);
    margin-right: ${({ isIconOnly }) => (isIconOnly ? 0 : '8px')};
    transition: 0.15s ease;

    path {
      transition: 0.15s ease;
      stroke: var(--color-dove);
    }
  }

  :hover {
    color: ${({ disabled }) =>
      disabled === true ? 'var(--color-dove)' : 'var(--color-black)'};
    border: 1px solid
      ${({ disabled }) =>
        disabled === true ? 'var(--color-mercury)' : 'var(--color-black)'};
    cursor: ${({ disabled }) => (disabled === true ? 'default' : 'pointer')};

    svg {
      fill: var(--color-black);

      path {
        stroke: var(--color-black);
      }
    }
  }

  .loading {
    display: flex;
    align-items: center;

    svg {
      animation: ${spin} 1s infinite linear;
      fill: var(--color-dove);
    }
  }
`
