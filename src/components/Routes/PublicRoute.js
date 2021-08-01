import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useToken } from '../../hooks';

const PublicRoute = ({ component: Component, ...rest }) => {
  const { token } = useToken();
  return (
    <Route
      {...rest}
      render={(props) =>
        !token ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PublicRoute;
