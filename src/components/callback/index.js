import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Auth0 from '../../auth';

const Callback = ({ history }) => {
  useEffect(() => Auth0.handleAuthentication(), []);
  useEffect(() => history.replace('/protected'));

  return (
      <>
        <p>Loading profile...</p>
      </>
  );
}

export default withRouter(Callback);
