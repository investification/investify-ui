import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import classnames from 'classnames';

import { usePerformances } from '../../../hooks';

const StockRow = ({ symbol, added, addFn, removeFn }) => {
  const { performances } = usePerformances();
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
          color="success"
          size="sm"
          className="d-sm-inline-block d-none"
          outline={!added}
          onClick={added ? removeFn : addFn}
        >
          {added ? (
            <>
              <i className="fas fa-check-circle" /> Added
            </>
          ) : (
            <>
              <i className="fas fa-plus-circle" /> Add
            </>
          )}
        </Button>
        <Button
          color="success"
          size="sm"
          className="d-sm-none"
          outline={!added}
          onClick={added ? removeFn : addFn}
        >
          {added ? (
            <i className="fas fa-check-circle" />
          ) : (
            <i className="fas fa-plus-circle" />
          )}
        </Button>
      </td>
    </tr>
  );
};

export default StockRow;
