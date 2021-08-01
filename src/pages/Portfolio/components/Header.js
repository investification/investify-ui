import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';
import Carousel from 'react-multi-carousel';
import classnames from 'classnames';

import 'react-multi-carousel/lib/styles.css';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    partialVisibilityGutter: 10, // this is needed to tell the amount of px that should be visible.
  },
  largeTablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
    partialVisibilityGutter: 10,
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 2,
    partialVisibilityGutter: 10, // this is needed to tell the amount of px that should be visible.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 10, // this is needed to tell the amount of px that should be visible.
  },
};

const Header = ({ portfolios }) => {
  return (
    <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
      <Container>
        <div className="header-body">
          <Carousel
            swipeable
            draggable
            responsive={responsive}
            partialVisible
            keyBoardControl
            containerClass="row"
            removeArrowOnDeviceType={['tablet', 'mobile']}
            children={[
              ...Object.values(portfolios).map((p) => (
                <Col key={p.id}>
                  <Card
                    className="card-stats mb-4 mb-xl-0"
                    tag={Link}
                    to={`/portfolios/${p.id}`}
                  >
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            {p.name}
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            ${p.total}
                          </span>
                          <br />
                          <span className="mb-0 text-muted text-sm">
                            {p.creator && p.id === p.creator.free_composition
                              ? 'Free floating account'
                              : `$${p.stocks.reduce(
                                  (sum, s) => sum + s.amount,
                                  0,
                                )} / ${p.frequency}`}
                          </span>
                        </div>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span
                          className={classnames('mr-2', {
                            'text-success': p.up > 0,
                            'text-danger': p.up < 0,
                          })}
                        >
                          <i
                            className={classnames('fa', {
                              'fa-arrow-up': p.up > 0,
                              'fa-arrow-down': p.up < 0,
                              'fa-minus': p.up === 0,
                            })}
                          />{' '}
                          {Math.abs(p.up)}%
                        </span>{' '}
                        <span className="text-nowrap">Since last week</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              )),
              <Col>
                <Card
                  className="card-stats mb-4 mb-xl-0"
                  tag={Link}
                  to="/create-portfolio"
                >
                  <CardBody>
                    <Row>
                      <div className="col d-flex align-items-center">
                        <span className="h2 font-weight-bold mb-0">
                          Add Fund
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                          <i className="fas fa-plus" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>,
            ]}
          />
        </div>
      </Container>
    </div>
  );
};

export default Header;
