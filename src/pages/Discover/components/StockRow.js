import React from 'react';
import classnames from 'classnames';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import { usePerformances, useToken } from '../../../hooks';
import fetchWithHttpErr, {
  getAuthHeader,
} from '../../../utils/fetchWithHttpErr';

const StockRow = ({ symbol }) => {
  const { performances, addCompaniesInfo } = usePerformances();
  const { token } = useToken();

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

  return (
    <tr>
      <th scope="row">{symbol}</th>
      <td
        style={{
          maxWidth: '20vw',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {performances[symbol].name}
      </td>
      <td>{performances[symbol].current}</td>
      <td>
        <i
          className={classnames('fas mr-3', {
            'fa-arrow-up text-success':
              performances[symbol].current > performances[symbol].open,
            'fa-arrow-down text-warning':
              performances[symbol].current < performances[symbol].open,
            'fa-minus':
              performances[symbol].current === performances[symbol].open,
          })}
        />{' '}
        {performances[symbol].current && performances[symbol].open
          ? `${Math.abs(
              Math.round(
                ((performances[symbol].current - performances[symbol].open) *
                  10000) /
                  performances[symbol].open,
              ) / 100,
            )}%`
          : ''}
      </td>
      <td className="text-right">
        <Link
          to={`/symbol/${symbol}`}
          className="d-sm-inline-block d-none btn btn-sm btn-info"
        >
          <i className="fa fa-eye" /> View
        </Link>
        <Link
          to={`/symbol/${symbol}`}
          className="d-sm-none btn btn-sm btn-info"
        >
          <i className="fa fa-eye" />
        </Link>
        <Button
          color="danger"
          outline={!performances[symbol].liked}
          size="sm"
          className="d-sm-inline-block d-none"
          onClick={() =>
            performances[symbol].liked ? unlike(symbol) : like(symbol)
          }
        >
          <i className="far fa-heart" />{' '}
          {performances[symbol].liked ? 'Watching' : 'Watch'}
        </Button>
        <Button
          color="danger"
          outline={!performances[symbol].liked}
          size="sm"
          className="d-sm-none"
          onClick={() =>
            performances[symbol].liked ? unlike(symbol) : like(symbol)
          }
        >
          <i className="far fa-heart" />
        </Button>
      </td>
    </tr>
  );
};

export default StockRow;
