import { default as React, useEffect, useState } from 'react';
import Chart from 'chart.js';
import { Line } from 'react-chartjs-2';
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Button,
} from 'reactstrap';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { chartOptions, parseOptions } from '../../utils/charts/init';
import barToChartData, { options } from '../../utils/charts/barToChartData';

import AppNavbar from '../../components/Navbars/AppNavbar';
import fetchWithHttpErr, { getAuthHeader } from '../../utils/fetchWithHttpErr';
import { usePerformances, useToken } from '../../hooks';
import Loader from '../../components/Loader';
import classNames from 'classnames';

function SymbolPage(props) {
  const symbol = props.match.params.symbol;
  const history = useHistory();

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const [bars, setBars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { token } = useToken();
  const { performances, addCompaniesInfo } = usePerformances();
  const router = useRouteMatch();

  function like(symbol) {
    fetchWithHttpErr(`${process.env.REACT_APP_API_URL}/likes`, {
      method: 'POST',
      headers: {
        Authorization: getAuthHeader(token),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ symbol }),
    })
      .then(() => addCompaniesInfo([{ symbol, liked: true }]))
      .catch(console.error);
  }

  function unlike(symbol) {
    fetchWithHttpErr(`${process.env.REACT_APP_API_URL}/likes`, {
      method: 'DELETE',
      headers: {
        Authorization: getAuthHeader(token),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ symbol }),
    })
      .then(() => addCompaniesInfo([{ symbol, liked: false }]))
      .catch(console.error);
  }

  useEffect(() => {
    setIsLoading(true);
    fetchWithHttpErr(
      `${process.env.REACT_APP_API_URL}/data/bars/${router.params.symbol}`,
      {
        method: 'GET',
        headers: {
          Authorization: getAuthHeader(token),
        },
      },
    )
      .then(({ body }) => {
        setBars(body.data);
        setIsLoading(false);
      })
      .catch(console.error);
  }, [token, router.params.symbol]);

  useEffect(() => {
    if (performances[router.params.symbol]) {
      return;
    }
    Promise.all([
      fetchWithHttpErr(`${process.env.REACT_APP_API_URL}/likes`, {
        headers: {
          Authorization: getAuthHeader(token),
        },
      }),
      fetchWithHttpErr(`${process.env.REACT_APP_API_URL}/data/all_assets`, {
        headers: {
          Authorization: getAuthHeader(token),
        },
      }),
    ])
      .then(([likes, assets]) => {
        addCompaniesInfo(assets.body.data);
        if (likes.body.data.length > 0) {
          addCompaniesInfo(
            likes.body.data.map((s) => ({ symbol: s, liked: true })),
          );
        }
      })
      .catch(console.error);
  }, [token, router.params.symbol]);

  return (
    <div className="main-content">
      <AppNavbar activeTab="home" />
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container>
          <Row>
            <Col
              xs="12"
              className="d-flex justify-content-between align-items-center mt-3 mb-3"
            >
              <Button
                className="btn-transparent text-white pl-0"
                onClick={() => history.goBack()}
              >
                <i className="fas fa-arrow-left" /> Back
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      <Container className="mt--7">
        {bars && bars.length > 0 && (
          <>
            <Row>
              <Col className="mb-0" xs="12">
                <Card className="bg-gradient-default shadow">
                  <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                      <div className="col">
                        <h6 className="text-uppercase text-light ls-1 mb-1">
                          Overview
                        </h6>
                        <h2 className="text-white mb-0">
                          {symbol} Stock Price
                        </h2>
                      </div>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    {/* Chart */}
                    <div className="chart">
                      <Line data={barToChartData(bars)} options={options} />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            {performances[symbol] && (
              <Row>
                <Col
                  className="mb-5 mt-1 mb-xl-0 mt-xl-3 d-flex justify-content-center"
                  xs="12"
                >
                  <button
                    className="text-danger"
                    style={{
                      border: 'none',
                      background: 'transparent',
                      fontSize: '4rem',
                    }}
                    onClick={() =>
                      performances[symbol].liked ? unlike(symbol) : like(symbol)
                    }
                  >
                    <i
                      className={classNames('fa-heart', {
                        fa: performances[symbol].liked,
                        far: !performances[symbol].liked,
                      })}
                    />
                  </button>
                </Col>
              </Row>
            )}
          </>
        )}
        {isLoading && <Loader />}
      </Container>
    </div>
  );
}

export default SymbolPage;
