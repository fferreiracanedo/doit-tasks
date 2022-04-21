import { Link, Redirect, useHistory } from 'react-router-dom'
import Input from '../../components/Input'
import {
  Background,
  Container,
  Content,
  AnimationContainer
} from '../Login/styles'

import { useForm } from 'react-hook-form'

import { toast } from 'react-toastify'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import api from '../../services/api'

import { FiUser, FiMail, FiLock } from 'react-icons/fi'
import Button from '../../components/Button'

const Login = ({ authenticated, setAuthenticated }) => {
  const schema = yup.object().shape({
    email: yup.string().required('Email Obrigatório').email('Email Inválido'),
    password: yup
      .string()
      .min(8, 'Minimo 8 Digitos')
      .required('Senha Obrigatória')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const history = useHistory()

  const onSubmitFunction = data => {
    api
      .post('/user/login', data)
      .then(response => {
        const { token } = response.data

        localStorage.setItem('@Doit:token', JSON.stringify(token))

        setAuthenticated(true)

        return history.push('/dashboard')
      })
      .catch(err => toast.error('Email ou Senha Inválidos'))

    if (authenticated) {
      return <Redirect to="/dashboard" />
    }
  }
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <h1>Login</h1>

            <Input
              name="email"
              register={register}
              icon={FiMail}
              label="Email"
              placeholder="Seu melhor email"
              error={errors.email?.message}
            />
            <Input
              name="password"
              register={register}
              icon={FiLock}
              label="Senha"
              placeholder="Uma senha bem segura"
              type="password"
              error={errors.password?.message}
            />

            <Button type="submit">Enviar</Button>
            <p>
              Não tem conta ? Faça seu <Link to="/signup"> Cadastro</Link>
            </p>
          </form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
}

export default Login
