import Link from 'next/link'
import styled from 'styled-components'

import { Logo } from 'components/Icons'

const Navigation = () => {
  return (
    <StyledNavigation>
      <Link href='/'>
        <a>
          <Logo />
        </a>
      </Link>
      <Link href='/'>
        <a>Collections</a>
      </Link>
    </StyledNavigation>
  )
}

export default Navigation

const StyledNavigation = styled.nav`
  background: var(--color-alabaster);
  border: 1px solid var(--color-mercury);
  padding: 16px 24px;
  display: flex;
  align-items: center;

  a {
    transition: 0.2s ease;

    :first-child {
      margin-right: 16px;
    }

    :last-child {
      font-size: 14px;
      color: var(--color-dove);

      :hover {
        color: var(--color-black);
      }
    }
  }
`
