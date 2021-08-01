import React from 'react';
import { Container, Row, Card, CardBody, Col } from 'reactstrap';

import AppNavbar from '../../../components/Navbars/AppNavbar';

const FormLayout = ({ children }) => (
  <div className="main-content">
    <AppNavbar />
    <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
      <Container>
        <Row></Row>
      </Container>
    </div>
    <Container className="mt--7 mb-5">
      <Row className="justify-content-center">
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">{children}</CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
);

export default FormLayout;
