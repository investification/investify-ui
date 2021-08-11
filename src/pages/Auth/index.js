import React, { useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { Container, Row, Col } from 'reactstrap';

import AuthNavbar from '../../components/Navbars/AuthNavbar';
import LoginForm from './components/LoginForm';
import PasswordResetForm from './components/PasswordResetForm';
import RegisterForm from './components/RegisterForm';
import { useToken } from '../../hooks';

const Auth = () => {
  useEffect(() => {
    document.body.classList.add('bg-default');
    return () => {
      document.body.classList.remove('bg-default');
    };
  }, []);

  const match = useRouteMatch();
  let activeTab = '';
  if (match.path && match.path.includes('login')) {
    activeTab = 'login';
  } else if (match.path && match.path.includes('register')) {
    activeTab = 'register';
  }

  const { token } = useToken();
  if (token && match.path.includes('auth')) {
    useHistory().push('/');
  }
  return (
    <div className="main-content">
      <AuthNavbar activeTab={activeTab} />
      <div className="header bg-gradient-info py-7 py-lg-8">
        <Container>
          <div className="header-body text-center mb-7">
            <Row className="justify-content-center">
              <Col lg="5" md="6">
                <h1 className="text-white">Welcome!</h1>
                <p className="text-lead text-light">
                  Start your investing journey today.
                </p>
              </Col>
            </Row>
          </div>
        </Container>
        <div className="separator separator-bottom separator-skew zindex-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon className="fill-default" points="2560 0 2560 100 0 100" />
          </svg>
        </div>
      </div>
      {/* Page content */}
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          {match.path && match.path.includes('register') ? (
            <RegisterForm />
          ) : match.path && match.path.includes('reset') ? (
            <PasswordResetForm />
          ) : (
            <LoginForm />
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Auth;
