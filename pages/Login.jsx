import styled from 'styled-components'
import Link from 'next/link'
import { useForm } from 'react-hook-form' // pra usar o formulário
import { joiResolver } from '@hookform/resolvers/joi/dist/joi.js' // pra validar o formulário
import axios from 'axios' // pra fazer a conexão do frontend com o backend
import { useRouter } from 'next/router' // pra levar o usuário do login pra página que ele precisa de entrar se tudo tiver ok

import { loginSchema } from '../modules/user/user.schema'

import ImageWithSpace from '../src/components/layout/ImageWithSpace'
import H1 from '../src/components/typography/H1'
import H2 from '../src/components/typography/H2'
import H4 from '../src/components/typography/H4'
import Button from '../src/components/inputs/Button'
import Input from '../src/components/inputs/Input'


const FormContainer = styled.div`
  margin-top: 60px;
`
const Form = styled.form`
  display:flex;
  flex-direction: column;
  margin: 20px;
  gap: 20px;
`

const Text = styled.p`
  text-align: center;
`



function LoginPage () {
const router = useRouter ()
const {control, handleSubmit, formState: {errors}, setError } = useForm({
  resolver: joiResolver(loginSchema)
})

const onSubmit = async (data) => {
  try {
    const {status} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/login`, data)
    if (status === 200){
      router.push('/')
    }
  } catch ({response}) {
    if (response.data === 'incorrect password') {
      setError('Password', {
        message: 'A senha está incorreta'
      })
    }
    else if (response.data === 'not_found')
    setError('UserOrEmail', {
      message: 'Usuário ou e-mail não encontrado'
    } )
  }

}


  return (
      <ImageWithSpace>
        <H1># Social Dev</H1>
        <H4>Tudo que acontece no mundo dev, está aqui</H4>
        <FormContainer>
          <H2>Entre em sua conta</H2>
          <Form onSubmit={handleSubmit(onSubmit)}>
              <Input label = "Email ou usuário"  name="UserOrEmail" control = {control}/>
              <Input label = "Senha" type="password" name = "Password" control = {control} />
              <Button  type='submit' disabled = {Object.keys(errors).length > 0 }>Entrar</Button>
          </Form>
          <Text>
            Não possui uma conta? <Link href="/SignUp">Faça seu cadastro</Link>
          </Text>
        </FormContainer>
      </ImageWithSpace>
  
  )
}


export default LoginPage