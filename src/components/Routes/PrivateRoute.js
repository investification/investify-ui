import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useToken } from '../../hooks';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { token } = useToken();
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to="/auth/login" />
      }
    />
  );
};

export default PrivateRoute;
