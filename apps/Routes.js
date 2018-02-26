import React from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';

import Login from './pages/Login';
import Signup from './pages/Signup';

export default class Routes extends React.Component<{}> {
  render() {
    return(
      <Router>
        <Stack key="root">
          <Scene key="login" component={Login} title="Login" initial={true} type="replace"/>
          <Scene key="register" component={Signup} title="Register" type="replace"/>
        </Stack>
     </Router>
    )
  }
}
