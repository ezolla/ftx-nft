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
    </StyledNavigation>
  )
}

export default Navigation

const StyledNavigation = styled.nav`
  background: var(--color-alabaster);
  border: 1px solid var(--color-mercury);
  padding: 16px 24px;
`
