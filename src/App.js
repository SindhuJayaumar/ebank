import {Route, Switch} from 'react-router-dom'
import LoginRoute from './Components/LoginRoute'
import HomeRoute from './Components/HomeRoute'
import NotFoundRoute from './Components/NotFoundRoute'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/ebank/login" component={LoginRoute} />
    <Route exact path="/" component={HomeRoute} />
    <NotFoundRoute />
  </Switch>
)

export default App
