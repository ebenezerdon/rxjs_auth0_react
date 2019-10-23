import React, { useEffect, useState } from 'react';
import { Route, withRouter } from 'react-router-dom';
import auth0Client from './auth';
import Public from './components/public';
import Protected from './components/protected';
import Callback from './components/callback';
import SecuredRoute from './components/securedRoute';

const App = ({ location }) => {
  const [ checkingSession, setCheckingSession ] = useState(true);
  useEffect(() => {
    if(location.pathname === '/callback') return setCheckingSession(false);

    (
      async function() {
        try {
          await auth0Client.silentAuth();
          this.forceUpdate();
        } catch (err) {
          if (err.error !== 'login_required') console.log(err.error);
        }
        setCheckingSession(false);
      }
    )();
  }, []);

  return (
    <div className="h-screen bg-blue-lighter text-center pt-10">
      <Route component={Public} path='/' exact />
      <Route component={Callback} path='/callback' />
      <SecuredRoute path='/protected'
        component={Protected}
        checkingSession={checkingSession}
      />
    </div>
  );
}

export default withRouter(App);
