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
  Button,
} from 'reactstrap';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import qs from 'querystring';
import InfiniteScroll from 'react-infinite-scroll-component';

import './AddSymbols.css';

import AppNavbar from '../../components/Navbars/AppNavbar';
import StockRow from './components/StockRow';
import fetchWithHttpErr, { getAuthHeader } from '../../utils/fetchWithHttpErr';
import { usePerformances, useToken } from '../../hooks';
import Loader from '../../components/Loader';

function filterAsset(q) {
  return (a) =>
    a.symbol.toLowerCase().includes(q.toLowerCase()) ||
    a.name.toLowerCase().includes(q.toLowerCase());
}

function AddSymbolsPage() {
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
  }
  const { token } = useToken();
  const { addCompaniesInfo, addPerformancesInfo } = usePerformances();
  const [isLoading, setIsLoading] = useState(false);
  const [shownStocks, setShownStocks] = useState([]);
  const [stocksToLoad, setStocksToLoad] = useState([]);
  const [stocksOffset, setStocksOffset] = useState(0);
  const [allAssets, setAllAssets] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [query, setQuery] = useState('');
  const [queryInput, setQueryInput] = useState('');
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [addedStocks, setAddedStocks] = useState(
    fundData.stocks ? Object.keys(fundData.stocks) : [],
  );

  function addStock(s) {
    setAddedStocks([...addedStocks, s]);
  }
  function removeStock(symbol) {
    setAddedStocks([...addedStocks.filter((s) => s !== symbol)]);
  }

  function next() {
    fundData.stocks = addedStocks.reduce(
      (stocks, s) => ({ ...stocks, [s]: 0 }),
      {},
    );
    localStorage.setItem('fund_to_submit', JSON.stringify(fundData));
    history.push('/create-portfolio/assign-amount');
  }

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
          setStocksToLoad(likes.body.data);
          return;
        }
        setStocksToLoad(assets.body.data.slice(0, 50).map((s) => s.symbol));
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
        if (stocksOffset === 0) {
          setShownStocks([
            ...addedStocks,
            ...stocksToLoad.filter((s) => !addedStocks.includes(s)),
          ]);
          setStocksOffset(stocksToLoad.length);
        } else {
          setShownStocks([
            ...shownStocks,
            ...stocksToLoad.filter((s) => !addedStocks.includes(s)),
          ]);
          setStocksOffset(stocksOffset + stocksToLoad.length);
        }
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
    if (newOffset >= allAssets.length) {
      setHasMore(false);
      newOffset = allAssets.length;
    }
    let assets = allAssets;
    if (query) {
      assets = assets.filter(filterAsset(query));
    }
    setStocksOffset(newOffset);
    setStocksToLoad(
      assets.slice(originalOffset, newOffset).map((s) => s.symbol),
    );
  }

  function search() {
    if (!allAssets || !allAssets.length) {
      return;
    }
    if (isFirstLoad) {
      return setIsFirstLoad(false);
    }
    const results = allAssets.filter(filterAsset(query));
    setStocksOffset(0);
    setStocksToLoad(results.slice(0, 50).map((a) => a.symbol));
  }

  useEffect(search, [allAssets, query]);

  return (
    <>
      <Helmet>
        <title>Investify - Add Assets</title>
      </Helmet>
      <div className="main-content">
        <AppNavbar activeTab="discover" />
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
                <h3 className="text-white mb-0">Add Assets</h3>
                <Button
                  className="btn-transparent text-white pl-0"
                  onClick={next}
                >
                  Next <i className="fas fa-arrow-right" />
                </Button>
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <Form
                  className="navbar-search navbar-search-dark form-inline mr-3 d-flex ml-lg-auto"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setQuery(queryInput);
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
                        value={queryInput}
                        onChange={(e) => setQueryInput(e.target.value)}
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
              <InfiniteScroll
                dataLength={stocksOffset}
                next={fetchNext}
                hasMore={hasMore}
              >
                <div style={{ minHeight: '70vh' }}>
                  {shownStocks && shownStocks.length > 0 && (
                    <Card className="shadow">
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
                            <StockRow
                              symbol={s}
                              key={s}
                              addFn={() => addStock(s)}
                              added={addedStocks.includes(s)}
                              removeFn={() => removeStock(s)}
                            />
                          ))}
                        </tbody>
                      </Table>
                    </Card>
                  )}
                  {isLoading && <Loader />}
                </div>
              </InfiniteScroll>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default AddSymbolsPage;
