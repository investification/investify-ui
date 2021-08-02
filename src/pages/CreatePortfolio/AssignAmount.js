import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import {
  Badge,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
} from 'reactstrap';
import { Helmet } from 'react-helmet';
import Slider, { createSliderWithTooltip } from 'rc-slider';

import 'rc-slider/assets/index.css';

import Layout from './components/Layout';

const SliderWithToolTip = createSliderWithTooltip(Slider);

const AssignAmount = () => {
  const history = useHistory();
  let fundData;
  try {
    fundData = JSON.parse(localStorage.getItem('fund_to_submit'));
  } catch (e) {
    history.push('/create-portfolio');
    return;
  }
  if (!fundData.amount) {
    history.push('/create-portfolio');
    return;
  } else if (!fundData.stocks) {
    history.push('/create-portfolio/add-symbols');
    return;
  }

  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const [distributions, setDistributions] = useState(fundData.stocks);
  const updateDistribution = (symbol, amount) => {
    if (!mountedRef.current) return;
    const newState = Object.assign({}, distributions, {
      [symbol]: parseInt(amount),
    });
    setDistributions(newState);
  };
  const [tempDis, setTempDis] = useState({});
  const updateTempDis = (symbol, val) => {
    if (!mountedRef.current) return;
    const newState = Object.assign({}, tempDis, { [symbol]: val });
    setTempDis(newState);
  };

  function next(e) {
    e.preventDefault();
    const total = Object.keys(distributions).reduce(
      (total, s) => total + distributions[s],
      0,
    );
    if (total !== fundData.amount) {
      alert('Fund is not entirely distributed');
      return;
    }
    fundData.stocks = distributions;
    localStorage.setItem('fund_to_submit', JSON.stringify(fundData));
    history.push('/create-portfolio/summary');
  }

  return (
    <>
      <Helmet>
        <title>Investify - Distribute Your Funds</title>
      </Helmet>
      <Layout>
        <Form role="form" onSubmit={next}>
          <h2 className="text-center font-weight-light">
            Distribute Your Funds
          </h2>
          <h3 className="text-center font-weight-light">${fundData.amount}</h3>
          {Object.keys(fundData.stocks).map((symbol) => {
            const maxAllocation = Object.keys(fundData.stocks).reduce(
              (acc, s) => (s === symbol ? acc : acc - distributions[s]),
              fundData.amount,
            );
            return (
              <FormGroup key={symbol} style={{ marginTop: '3rem' }}>
                <Row className="d-flex">
                  <Col xs="8">
                    <Label>
                      <Badge color="success">{symbol}</Badge>&nbsp;&nbsp;
                      {fundData.stocks[symbol]}
                    </Label>
                  </Col>
                  <Col xs="4">
                    <Input
                      style={{ height: 'auto', padding: '.3rem .75rem' }}
                      placeholder="Amount"
                      type="number"
                      step={1}
                      value={
                        tempDis[symbol] !== undefined
                          ? tempDis[symbol]
                          : distributions[symbol] || ''
                      }
                      onBlur={(e) => {
                        let v = e.target.value;
                        if (!v) v = 0;
                        if (v > maxAllocation) v = maxAllocation;
                        updateDistribution(symbol, v);
                        updateTempDis(symbol, undefined);
                      }}
                      onChange={(e) => {
                        updateTempDis(symbol, e.target.value);
                      }}
                    />
                  </Col>
                </Row>
                <SliderWithToolTip
                  tipFormatter={(v) => `$${v}`}
                  value={distributions[symbol]}
                  max={fundData.amount}
                  step={1}
                  marks={{ [maxAllocation]: `Max: $${maxAllocation}` }}
                  onChange={(v) => {
                    if (v > maxAllocation) return;
                    updateDistribution(symbol, v);
                  }}
                />
              </FormGroup>
            );
          })}
          <div className="d-flex justify-content-between mt-6">
            <Button
              color="primary"
              type="button"
              onClick={() => history.goBack()}
            >
              Back
            </Button>
            <Button color="primary" type="submit">
              Next
            </Button>
          </div>
          {/* {error ? (
          <>
          <br />
          <p className="text-center text-danger">{error}</p>
          </>
        ) : (
          ''
        )} */}
        </Form>
      </Layout>
    </>
  );
};

export default AssignAmount;
