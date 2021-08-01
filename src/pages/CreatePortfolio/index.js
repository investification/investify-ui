import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Label,
} from 'reactstrap';
import { Helmet } from 'react-helmet';

import Layout from './components/Layout';

const CreatePortfolio = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [frequency, setFrequency] = useState('month');
  const history = useHistory();

  function onSubmit(e) {
    e.preventDefault();
    localStorage.setItem(
      'fund_to_submit',
      JSON.stringify({ name, amount: parseInt(amount), frequency }),
    );
    history.push('/create-portfolio/add-symbols');
  }
  return (
    <>
      <Helmet>
        <title>Investify - Create a Fund</title>
      </Helmet>
      <Layout>
        <Form role="form" onSubmit={onSubmit}>
          <h2 className="text-center font-weight-light">Create a Fund</h2>
          <FormGroup>
            <Label className="text-sm">Name of Fund</Label>
            <InputGroup className="input-group-alternative mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="ni ni-collection" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder="Fund Name"
                type="text"
                autoComplete="fund_name"
                name="fund_name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label className="text-sm">How much (in USD)?</Label>
            <InputGroup className="input-group-alternative mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="ni ni-money-coins" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder="Amount (min 100)"
                type="number"
                min="100"
                step="1"
                autoComplete="amount"
                name="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label className="text-sm">Frequency</Label>
            <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="ni ni-sound-wave" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder="Frequency"
                type="select"
                autoComplete="frequency"
                name="frequency"
                required
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
              >
                <option value="week">Weekly</option>
                <option value="month">Monthly</option>
                <option value="quarter">Quarterly</option>
                <option value="year">Yearly</option>
              </Input>
            </InputGroup>
          </FormGroup>
          <div className="text-center">
            <Button className="mt-4" color="primary" type="submit">
              Next
            </Button>
          </div>
        </Form>
      </Layout>
    </>
  );
};

export default CreatePortfolio;
