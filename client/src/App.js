import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import {userLoginHelper, userLogout} from './redux/actions/userAction'
import setAuthToken from './redux/helper/setAuthToken'
import store from './redux/store'

//Components
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import DetailedBlog from './components/DetailedBlog'

if (window.localStorage.userJwtToken) {
  setAuthToken(localStorage.userJwtToken);
  const decoded = jwt_decode(localStorage.userJwtToken);
  store.dispatch(userLoginHelper(decoded.user))
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(userLogout());
    window.location.href = '/';
  }
}

console.clear()



function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/blog/:id' component={DetailedBlog} />
          <Route exact path="/forgotPassword" component={ForgotPassword} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
