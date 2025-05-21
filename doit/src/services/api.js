import axios from 'axios'

// const api = axios.create({
//   baseURL: 'https://api-nodejs-todolist.herokuapp.com/'
// })

let mockTasks = []

const mockApi = {
  get: (url, config) => {
    return new Promise((resolve) => {
      if (url === '/task') {
        let tasksArray = [...mockTasks]
        if (config && config.params && config.params.completed !== undefined) {
          tasksArray = tasksArray.filter(task => task.completed === config.params.completed)
        }
        resolve({ data: { data: tasksArray } })
      } else {
        resolve({ data: {} }) // Default empty response for other URLs
      }
    })
  },
  post: (url, data) => {
    return new Promise((resolve) => {
      if (url === '/task') {
        const newTask = {
          _id: String(Date.now()),
          description: data.description,
          createdAt: new Date(),
          completed: false
        }
        mockTasks.push(newTask)
        resolve({ data: newTask })
      } else {
        resolve({ data: {} }) // Default empty response for other URLs
      }
    })
  },
  put: (url, data) => {
    return new Promise((resolve, reject) => {
      if (url.startsWith('/task/')) {
        const id = url.split('/task/')[1]
        const taskIndex = mockTasks.findIndex(task => task._id === id)
        if (taskIndex !== -1) {
          mockTasks[taskIndex].completed = data.completed
          resolve({ data: mockTasks[taskIndex] })
        } else {
          reject(new Error('Task not found'))
        }
      } else {
        resolve({ data: {} }) // Default empty response for other URLs
      }
    })
  }
}

export default mockApi
