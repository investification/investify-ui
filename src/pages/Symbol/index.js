import { default as React, useState } from 'react';
import Chart from 'chart.js';
import classnames from 'classnames';
import { Line } from 'react-chartjs-2';
import {
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from 'reactstrap';
import {} from 'react-router-dom';

import { chartExample3 } from '../../variables/charts';
import { chartOptions, parseOptions } from '../../utils/charts/init';

import AppNavbar from '../../components/Navbars/AppNavbar';

function SymbolPage(props) {
  const symbol = props.match.params.symbol;

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState('daily');
  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data(['daily', 'hourly'][index]);
  };

  return (
    <div className="main-content">
      <AppNavbar activeTab="home" />
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container>
          <Row></Row>
        </Container>
      </div>
      <Container className="mt--7">
        <Row>
          <Col className="mb-5 mb-xl-0" xs="12">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="text-white mb-0">{symbol} Stock Price</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames('py-2 px-3', {
                            active: activeNav === 0,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 0)}
                        >
                          <span className="d-none d-md-block">Month</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames('py-2 px-3', {
                            active: activeNav === 1,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Day</span>
                          <span className="d-md-none">D</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Line
                    data={chartExample3[chartExample1Data]}
                    options={chartExample3.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col
            className="mb-5 mb-xl-0 mt-xl-5 d-flex justify-content-center"
            xs="12"
          >
            <button
              className="text-danger"
              style={{
                border: 'none',
                background: 'transparent',
                fontSize: '4rem',
              }}
            >
              <i className="far fa-heart" />
            </button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SymbolPage;
