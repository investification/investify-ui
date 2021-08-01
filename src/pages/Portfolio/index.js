import { default as React, useEffect, useState } from 'react';
import Chart from 'chart.js';
import classnames from 'classnames';
import { Line } from 'react-chartjs-2';
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Button,
  Table,
} from 'reactstrap';
import { useRouteMatch } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { chartOptions, parseOptions } from '../../utils/charts/init';

import './index.css';

import AppNavbar from '../../components/Navbars/AppNavbar';
import Header from './components/Header';
import { usePortfolios, useToken } from '../../hooks';
import fetchWithHttpErr, { getAuthHeader } from '../../utils/fetchWithHttpErr';
import performanceToChartData, {
  options,
} from '../../utils/charts/performanceToChartData';

function PortfolioPage() {
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }
  const [currentPortfolio, setCurrentPortfolio] = useState(null);
  const { portfolios, addPortfolio } = usePortfolios();
  const { token } = useToken();
  const router = useRouteMatch();
  const [firstPortfolio, setFirstPortfolio] = useState('');

  useEffect(() => {
    fetchWithHttpErr(`${process.env.REACT_APP_API_URL}/compositions`, {
      method: 'GET',
      headers: {
        Authorization: getAuthHeader(token),
      },
    })
      .then(({ body }) => {
        body.data.forEach((p) => addPortfolio(p));
        setFirstPortfolio(body.data[0].id);
      })
      .catch(console.error);
  }, [token]);

  useEffect(() => {
    if (!firstPortfolio && !router.params.portfolio_id) {
      return;
    }
    return fetchWithHttpErr(
      `${process.env.REACT_APP_API_URL}/compositions/${
        router.params.portfolio_id || firstPortfolio
      }`,
      {
        method: 'GET',
        headers: {
          Authorization: getAuthHeader(token),
        },
      },
    ).then(({ body }) => setCurrentPortfolio(body));
  }, [firstPortfolio, router.params.portfolio_id]);

  return (
    <>
      <Helmet>
        <title>
          Investify - {router.params.portfolio_id ? 'Portfolio' : 'Home'}
        </title>
      </Helmet>
      <div className="main-content">
        <AppNavbar activeTab="home" />
        <Header portfolios={portfolios} />
        {currentPortfolio && (
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
                        <h2 className="text-white mb-0">Net Asset Value</h2>
                      </div>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    {/* Chart */}
                    <div className="chart">
                      <Line
                        data={performanceToChartData(
                          currentPortfolio.performances,
                        )}
                        options={options}
                        getDatasetAtEvent={(e) => console.log(e)}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col className="mb-5 mb-xl-0" xs="12">
                <Card className="shadow">
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Symbol</th>
                        <th scope="col">Price</th>
                        <th scope="col">Holdings</th>
                        <th scope="col">Today P/L</th>
                        <th scope="col" style={{ width: '1px' }} />
                      </tr>
                    </thead>
                    <tbody>
                      {currentPortfolio.ownerships.map((o) => (
                        <tr key={o.symbol}>
                          <th scope="row">{o.symbol}</th>
                          <td>${o.today_bar.current}</td>
                          <td>{o.shares}</td>
                          <td>
                            <i
                              className={classnames('fas mr-3', {
                                'fa-arrow-up text-success':
                                  o.today_bar.current > o.today_bar.open,
                                'fa-arrow-down text-warning':
                                  o.today_bar.current < o.today_bar.open,
                                'fa-minus':
                                  o.today_bar.current === o.today_bar.open,
                              })}
                            />{' '}
                            {Math.abs(
                              Math.round(
                                ((o.today_bar.current - o.today_bar.open) *
                                  10000) /
                                  o.today_bar.open,
                              ) / 100,
                            )}
                            %
                          </td>
                          <td className="text-right">
                            <Button
                              color="danger"
                              size="sm"
                              className="d-sm-inline-block d-none"
                            >
                              Sell
                            </Button>
                            <Button
                              color="danger"
                              size="sm"
                              className="d-sm-none"
                            >
                              <i className="fas fa-dollar-sign"></i>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    </>
  );
}

export default PortfolioPage;
