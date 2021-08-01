import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from 'reactstrap';

import { useToken } from '../../../hooks';
import fetchWithHttpErr from '../../../utils/fetchWithHttpErr';

const LoginForm = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addToken } = useToken();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemembering, setRemembering] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('remember_email')) {
      setEmail(localStorage.getItem('remember_email'));
      setRemembering(true);
    }
  }, []);

  function login(e) {
    e.preventDefault();
    setIsLoading(true);
    localStorage.setItem('remember_email', email);
    fetchWithHttpErr(`${process.env.REACT_APP_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(({ body }) => {
        addToken(body.token);
      })
      .catch((e) => setError(e.message))
      .finally(() => setIsLoading(false));
  }

  function remember(e) {
    if (e.currentTarget.checked) {
      localStorage.setItem('remember_email', email);
      setRemembering(true);
    } else {
      localStorage.removeItem('remember_email');
      setRemembering(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Investify - Login</title>
      </Helmet>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form" onSubmit={login}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    required
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="password"
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    required
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                  checked={isRemembering}
                  onChange={remember}
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" disabled={isLoading}>
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </Button>
              </div>
              {error ? <p className="text-center text-danger">{error}</p> : ''}
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <Link className="text-light" to="/auth/reset">
              <small>Forgot password?</small>
            </Link>
          </Col>
          <Col className="text-right" xs="6">
            <Link className="text-light" to="/auth/register">
              <small>Create new account</small>
            </Link>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default LoginForm;
