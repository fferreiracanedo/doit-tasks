import { Redirect } from 'react-router-dom'
import { InputContainer, Container, TasksContainer } from './styles'
import { useForm } from 'react-hook-form'
import { FiEdit2 } from 'react-icons/fi'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Card from '../../components/Card'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import { toast } from 'react-toastify'

const Dashboard = ({ authenticated }) => {
  const [task, setTasks] = useState([])
  const [token] = useState(
    JSON.parse(localStorage.getItem('@Doit:token')) || ''
  )
  const { register, handleSubmit } = useForm()

  const loading = () => {
    api
      .get('/task', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          completed: false
        }
      })
      .then(response => {
        const apiTasks = response.data.data.map(task => ({
          ...task,
          createdAt: new Date(task.createdAt).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
          })
        }))
        setTasks(apiTasks)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    loading()
  }, [])

  const onSubmit = ({ task }) => {
    if (!task) {
      return toast.error('Complete o campo para enviar a tarefa')
    }
    api
      .post(
        '/task',
        {
          description: task
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(response => loading())

      
  }

  const handleCompleted = (id) => {
    const newTasks = task.filter((task) => task._id !== id);

    api.put(`/task/${id}`, { completed: true },{
      headers: {
          Authorization: `Bearer ${token}` },
    } ).then(response => setTasks(newTasks))

  }

  if (!authenticated) {
    return <Redirect to="/login" />
  }

  return (
    <Container>
      <InputContainer onSubmit={handleSubmit(onSubmit)}>
        <section>
          <Input
            icon={FiEdit2}
            placeholder="Nova Tarefa"
            register={register}
            name="task"
            error=""
          />
          <Button type="submit">Adicionar</Button>
        </section>
      </InputContainer>
      <TasksContainer>
        {task.map(task => {
          return (
            <Card
              key={task._id}
              title={task.description}
              date={task.createdAt}
              onClick={() => handleCompleted(task._id)}
            />
          )
        })}
      </TasksContainer>
    </Container>
  )
}
export default Dashboard
