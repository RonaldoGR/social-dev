import { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { withIronSessionSsr } from 'iron-session/next'
import { IronConfig } from '../lib/middlewares/ironSession'
import axios from 'axios'
import useSWR from 'swr'

import NavBar from "../src/components/layout/NavBar"
import Container from '../src/components/layout/Container'
import CreatePost from '../src/components/cards/CreatePost'
import H3 from '../src/components/typography/H3'
import Post from '../src/components/cards/Post'


const Content = styled.div`
  margin: 50px 0;
`

const LastPostText = styled(H3)`
  padding: 40px 0;

`

const RefreshPosts = styled.span`
  font-weight: bold;
  color: ${props => props.theme.primary};
  cursor: pointer;
`

const RefreshPostsContainer = styled.div`
  text-align: center;
`

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;

`
const fetcher = url => axios.get(url).then(res => res.data)

function HomePage ({user}) {

  const {data} = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/post`, fetcher)
  return (
  <>
    <NavBar />
    <Content>
      <Container>
        <CreatePost username = {user.User}/>
        <LastPostText>
          Últimas postagens:  
        </LastPostText>
        <RefreshPostsContainer>
          <RefreshPosts>Carregar novas postagens</RefreshPosts>
        </RefreshPostsContainer>
        <PostContainer>
          {
            data?.map(post =>
              <Post 
              key = {post._id}
              text = {post.text}
              user = {post.createdBy.User}
              date = {post.createdDate}
              />
            )
          }
        </PostContainer>
      </Container>
    </Content>
  </>
  )
}

// processa a requisição 
export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({req}) {
    const user = req.session.user // verificando se existe uma sessão ativa do usuário, se ele está autenticado

    if (!user){ // se o usuário não estiver autenticado ele retorna redirecionando o usuário para a página de login
      return {
        redirect: {
          permanent: false, // 
          destination: '/Login'
        }
      }
    }

    return {
      props: {
        user // se tiver autenticado, ele retorna as informações do usuário
      }
    }
  },
  IronConfig
)

export default HomePage