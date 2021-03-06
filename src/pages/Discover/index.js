import { default as React, useEffect, useState } from 'react';
import {
  Container,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Col,
  Input,
  Card,
  Table,
} from 'reactstrap';
import { useHistory, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import qs from 'querystring';
import InfiniteScroll from 'react-infinite-scroll-component';

import './index.css';

import AppNavbar from '../../components/Navbars/AppNavbar';
import fetchWithHttpErr, { getAuthHeader } from '../../utils/fetchWithHttpErr';
import { usePerformances, useToken } from '../../hooks';
import Loader from '../../components/Loader';
import StockRow from './components/StockRow';

function filterAsset(q) {
  return (a) =>
    a.symbol.toLowerCase().includes(q.toLowerCase()) ||
    a.name.toLowerCase().includes(q.toLowerCase());
}

function DiscoverPage() {
  const history = useHistory();
  const location = useLocation();
  const queryParams = qs.parse(location.search.slice(1));
  const { token } = useToken();
  const { addCompaniesInfo, addPerformancesInfo } = usePerformances();
  const [isLoading, setIsLoading] = useState(false);
  const [shownStocks, setShownStocks] = useState([]);
  const [stocksToLoad, setStocksToLoad] = useState([]);
  const [stocksOffset, setStocksOffset] = useState(0);
  const [allAssets, setAllAssets] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [query, setQuery] = useState(queryParams.q || '');
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    setIsLoading(true);
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
        setAllAssets(assets.body.data);
        addCompaniesInfo(assets.body.data);
        setIsLoading(false);
        if (likes.body.data.length > 0) {
          addCompaniesInfo(
            likes.body.data.map((s) => ({ symbol: s, liked: true })),
          );
        }

        if (!queryParams.q) {
          let filteredAssets = assets.body.data;
          if (queryParams && queryParams.q) {
            filteredAssets = filteredAssets.filter(filterAsset(queryParams.q));
          }
          const maxRetrieve = 50 - likes.body.data.length;
          filteredAssets = filteredAssets
            .slice(0, maxRetrieve)
            .map((s) => s.symbol)
            .filter((s) => !likes.body.data.includes(s));
          setStocksToLoad([...likes.body.data, ...filteredAssets]);
          setStocksOffset(maxRetrieve);
        }
      })
      .catch(console.error);
  }, [token]);

  useEffect(() => {
    if (!stocksToLoad || !stocksToLoad.length) {
      return;
    }
    setIsLoading(true);
    fetchWithHttpErr(
      `${process.env.REACT_APP_API_URL}/data/tickers?${qs.encode({
        symbols: stocksToLoad.join(','),
      })}`,
      {
        headers: {
          Authorization: getAuthHeader(token),
        },
      },
    )
      .then((performances) => {
        addPerformancesInfo(performances.body);
        setShownStocks([...shownStocks, ...stocksToLoad]);
        setIsLoading(false);
      })
      .catch(console.error);
  }, [stocksToLoad]);

  function fetchNext() {
    if (isLoading) {
      return;
    }
    const originalOffset = stocksOffset;
    let newOffset = stocksOffset + 50;
    let assets = [...allAssets];
    if (queryParams && queryParams.q) {
      assets = assets.filter(filterAsset(queryParams.q));
    }
    if (newOffset >= assets.length) {
      setHasMore(false);
      newOffset = assets.length;
    }
    setStocksOffset(newOffset);
    setStocksToLoad(
      assets
        .slice(originalOffset, newOffset)
        .map((s) => s.symbol)
        .filter((s) => !shownStocks.includes(s)),
    );
  }

  function search() {
    if (
      (!allAssets || !allAssets.length || !queryParams || !queryParams.q) &&
      isFirstLoad
    ) {
      return;
    }
    const results = allAssets.filter(filterAsset(queryParams.q));
    setShownStocks([]);
    setStocksToLoad(results.slice(0, 50).map((a) => a.symbol));
    setStocksOffset(50);
  }

  useEffect(search, [allAssets, queryParams.q, isFirstLoad]);
  return (
    <>
      <Helmet>
        <title>Investify - Discover</title>
      </Helmet>
      <div className="main-content">
        <AppNavbar activeTab="discover" />
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container>
            <Row>
              <Col xs="12">
                <Form
                  className="navbar-search navbar-search-dark form-inline mr-3 d-flex ml-lg-auto"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsFirstLoad(false);
                    if (!query && !queryParams.q) {
                      return;
                    } else if (query === queryParams.q) {
                      return;
                    }
                    setShownStocks([]);
                    history.push(`/discover?q=${query}`);
                  }}
                >
                  <FormGroup className="mb-0">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fas fa-search" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Search"
                        type="text"
                        name="q"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                      />
                    </InputGroup>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
        <Container className="mt--7" fluid>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xs="12">
              {shownStocks && shownStocks.length > 0 && (
                <Card className="shadow">
                  <InfiniteScroll
                    dataLength={shownStocks.length}
                    next={fetchNext}
                    hasMore={hasMore}
                  >
                    <Table
                      className="align-items-center table-flush"
                      responsive
                    >
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Symbol</th>
                          <th scope="col">Name</th>
                          <th scope="col">Price</th>
                          <th scope="col">Today P/L</th>
                          <th scope="col" style={{ width: '1px' }} />
                        </tr>
                      </thead>
                      <tbody>
                        {shownStocks.map((s) => (
                          <StockRow symbol={s} key={s} />
                        ))}
                      </tbody>
                    </Table>
                  </InfiniteScroll>
                </Card>
              )}
              {isLoading && <Loader />}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default DiscoverPage;
