import { Link, Redirect, useHistory } from 'react-router-dom'
import Input from '../../components/Input'
import {
  Background,
  Container,
  Content,
  AnimationContainer
} from '../Signup/styles'

import { useForm } from 'react-hook-form'

import { toast } from 'react-toastify'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import api from '../../services/api'

import { FiUser, FiMail, FiLock } from 'react-icons/fi'
import Button from '../../components/Button'

const Signup = ({ authenticated }) => {
  const schema = yup.object().shape({
    name: yup.string().required('Nome Obrigatório'),
    email: yup.string().required('Email Obrigatório').email('Email Inválido'),
    password: yup
      .string()
      .min(8, 'Minimo 8 Digitos')
      .required('Senha Obrigatória'),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password')], 'Senhas diferentes')
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

  const onSubmitFunction = ({ name, email, password }) => {
    const user = { name, email, password }

    api
      .post('/user/register', user)
      .then(_ => {
        toast.success('Sucesso ao criar a conta')
        return history.push('/login')
      })
      .catch(err => toast.error('Erro ao criar a conta tente outro email'))
  }
  if (authenticated) {
    return <Redirect to="/dashboard" />
  }
  return (
    <Container>
      <Background></Background>
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <h1>Cadastro</h1>
            <Input
              register={register}
              icon={FiUser}
              label="Nome"
              placeholder="Seu nome completo"
              name="name"
              error={errors.name?.message}
            />
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
            <Input
              name="passwordConfirm"
              register={register}
              icon={FiLock}
              label="Confirmação da senha"
              placeholder="Confirmação da senha"
              type="password"
              error={errors.passwordConfirm?.message}
            />

            <Button type="submit">Enviar</Button>
            <p>
              Já tem uma conta? Faça seu <Link to="/login"> login</Link>
            </p>
          </form>
        </AnimationContainer>
      </Content>
    </Container>
  )
}

export default Signup
