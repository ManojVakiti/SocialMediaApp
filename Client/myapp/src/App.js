import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './Components/Login'
import SignUp from './Components/SignUp';
import Feed from './Components/Feed'

import AuthComponent from './Components/AuthComponent';

function App() {
  return (
    
      <BrowserRouter>
          <Switch>
                <Route exact path = "/signup" component = {SignUp}/>
              <Route exact path = "/login" component = {Login}/>
              <Route exact path="/feed" component = {Feed}/>
          </Switch>
      </BrowserRouter>
  
  );
}

export default App;
