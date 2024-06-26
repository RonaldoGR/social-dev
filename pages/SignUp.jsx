import { useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { signupSchema } from '../modules/user/user.schema'

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


function SignUpPage () {
  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: joiResolver(signupSchema)
  })

  const handleForm = (data) => {
    console.log(data)
  }

  console.log(errors)
  return (
    <div>
      <ImageWithSpace>
        <H1># Social Dev</H1>
        <H4>Tudo que acontece no mundo dev, está aqui</H4>
        <FormContainer>
          <H2>Crie sua conta</H2>
          <Form onSubmit={handleSubmit(handleForm)}>
              <Input label = "Nome" {...register('FirstName')}/>
              <Input label = "Sobrenome" {...register('LastName')}/>
              <Input label = "Usuário" {...register('User')}/>
              <Input label = "Email" type="email"  {...register('Email')}/>
              <Input label = "Senha" type="password" {...register('Password')}/>
              <Button type='submit'>Entrar</Button>
          </Form>
          <Text>
            Já possui uma conta? <Link href="/Login">Faça seu login</Link>
          </Text>
        </FormContainer>
      </ImageWithSpace>
    </div>
  )
}

export default SignUpPage