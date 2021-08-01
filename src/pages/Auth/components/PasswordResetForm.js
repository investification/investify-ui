import React from 'react';

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

const PasswordResetForm = () => {
  return (
    <Col lg="6" md="8">
      <Card className="bg-secondary shadow border-0">
        <CardBody className="px-lg-5 py-lg-5">
          <Form role="form">
            <FormGroup>
              <InputGroup className="input-group-alternative mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-email-83" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Email" type="email" />
              </InputGroup>
            </FormGroup>
            <div className="text-center">
              <Button className="mt-4" color="primary" type="button">
                Get reset password email
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default PasswordResetForm;
