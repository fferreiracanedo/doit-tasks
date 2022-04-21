import { useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'

const Routes = () => {
  const [authenticated, setAuthenticated] = useState()

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('@Doit:token'))

    if (token) {
      return setAuthenticated(true)
    }
  }, [authenticated])
  return (
    <Switch>
      <Route exact path="/">
        <Home authenticated={authenticated} />
      </Route>
      <Route path="/signup">
        <Signup authenticated={authenticated} />
      </Route>
      <Route path="/login">
        <Login
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>
      <Route path="/dashboard">
        <Dashboard authenticated={authenticated} />
      </Route>
    </Switch>
  )
}

export default Routes
