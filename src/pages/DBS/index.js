import React, { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import dbsLogo from './dbs-logo.png';
import dbsBg from './dbs-background.jpg';
import dbsFavicon from './dbs-logo-min.png';

import fetchWithHttpErr, { getAuthHeader } from '../../utils/fetchWithHttpErr';
import { useToken } from '../../hooks';
import { Helmet } from 'react-helmet';

const StyledContainer = styled(Container)`
  background: url(${dbsBg}) no-repeat center center;
  background-size: cover;
  min-height: 100vh;

  .card.shadow {
    border-radius: 0;
    border-top: 4px solid #ff3333;
  }

  form.d-flex img {
    max-height: 44px;
    max-width: 80px;
  }

  .form-group .form-control {
    border: none;
    border-bottom: 1px solid #dadee6;
    border-radius: 0;
    padding: 1px 0 5px 0px;
    height: 25px;
  }

  .btn,
  .btn:hover {
    box-shadow: none;
  }
  .btn.btn-outline-secondary:hover {
    background: #fff;
  }

  .form-group label,
  .links li {
    color: #909090;
    font-size: 0.9rem;
    font-weight: lighter;
  }
  .links ul {
    list-style-type: none;
    padding-left: 0;
  }
`;

const DBSLinkingPage = () => {
  const history = useHistory();
  const { token } = useToken();
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetchWithHttpErr(
      `${process.env.REACT_APP_API_URL}/accounts/connect_to_bank`,
      {
        method: 'POST',
        headers: {
          Authorization: getAuthHeader(token),
        },
      },
    )
      .then(() => {
        history.push('/');
      })
      .catch((e) => {
        console.error(e);
        setIsLoading(false);
      });
  }

  return (
    <>
      <Helmet>
        <title>DBS iBanking</title>
        <link rel="icon" type="image/png" href={dbsFavicon} />
        <link rel="apple-touch-icon" type="image/png" href={dbsFavicon} />
      </Helmet>
      <StyledContainer fluid className="pt-7">
        <Row className="justify-content-center">
          <Col lg="5" md="6">
            <Card className="shadow">
              <CardBody className="px-lg-5 py-lg-5">
                <Form
                  className="d-flex align-items-center  flex-column"
                  onSubmit={onSubmit}
                >
                  <img src={dbsLogo} alt="DBS Logo" />
                  <FormGroup className="w-100 pt-5">
                    <Label>User ID</Label>
                    <Input required />
                  </FormGroup>
                  <FormGroup className="w-100">
                    <Label>PIN</Label>
                    <Input required type="password" />
                  </FormGroup>
                  <Button
                    className="w-100 mr-0"
                    style={{ background: '#ff3333' }}
                    color="danger"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Logging in...' : 'Login'}
                  </Button>
                  <Button
                    className="w-100 ml-0 mt-3"
                    style={{ borderColor: '#ff3333', color: '#ff3333' }}
                    outline
                    type="button"
                  >
                    Get Started
                  </Button>
                </Form>
                <div className="links mt-4">
                  <ul>
                    <li>Forgot User ID or PIN</li>
                    <li>Frequently Asked Questions</li>
                    <li>Maintenance Schedule</li>
                    <li>Security & You</li>
                  </ul>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </StyledContainer>
    </>
  );
};

export default DBSLinkingPage;
