import styled from 'styled-components'
import NavBar from "../src/components/layout/NavBar"
import Container from '../src/components/layout/Container'
import CreatePost from '../src/components/cards/CreatePost'


const Content = styled.div`
  margin: 50px 0;
`

function HomePage () {
  
  return (
  <>
    <NavBar />
    <Content>
      <Container>
        <CreatePost />
      </Container>

    </Content>
  </>
  )
}

export default HomePage