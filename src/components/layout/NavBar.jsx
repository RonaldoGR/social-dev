import styled from 'styled-components'
import Link from 'next/link'

const StyledNavBar = styled.div`
  background-color: ${props => props.theme.white};
  height: 80px;
  display:flex;
  align-items: center;
  padding: 0 100px;

  @media (max-width: 500px){
    padding: 0 20px;
  }

`

const StyledLogo = styled.span`
  flex: 1;
  font-weight: bold;
  font-size: 20px;
`



function NavBar () {
  return (
    <StyledNavBar>
      <StyledLogo># Social Dev</StyledLogo>
        <div>
          <Link href="/Login">Desconectar</Link>
        </div>
    </StyledNavBar>

  )

}

export default NavBar