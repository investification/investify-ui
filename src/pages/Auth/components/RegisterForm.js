import React, { useState } from 'react';
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
  Col,
} from 'reactstrap';

import fetchWithHttpErr from '../../../utils/fetchWithHttpErr';

const RegisterForm = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = (e) => {
    e.preventDefault();
    setIsLoading(true);
    fetchWithHttpErr(`${process.env.REACT_APP_API_URL}/accounts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then(() => {
        setName('');
        setEmail('');
        setPassword('');
        setIsSuccess(true);
      })
      .catch((e) => {
        setIsSuccess(false);
        setError(e.message);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Helmet>
        <title>Investify - Register</title>
      </Helmet>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form" onSubmit={register}>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
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
                    onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              {/* <Row className="my-4">
              <Col xs="12">
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id="customCheckRegister"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customCheckRegister"
                  >
                    <span className="text-muted">
                      I agree with the{' '}
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                </div>
              </Col>
            </Row> */}
              <div className="text-center">
                <Button
                  className="mt-4"
                  color="primary"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating account...' : 'Create account'}
                </Button>
              </div>
              <br />
              {isSuccess ? (
                <p className="text-center text-success">
                  Registered successfully.{' '}
                  <Link to="/auth/login">Login now</Link> and start investing!
                </p>
              ) : (
                ''
              )}
              {error ? <p className="text-center text-danger">{error}</p> : ''}
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default RegisterForm;
