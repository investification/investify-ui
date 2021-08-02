import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'reactstrap';
import { Helmet } from 'react-helmet';

import 'chartjs-plugin-colorschemes/src/plugins/plugin.colorschemes';
import { PastelOne9 } from 'chartjs-plugin-colorschemes/src/colorschemes/colorschemes.brewer';

import FormLayout from './components/Layout';
import { useToken, usePortfolios } from '../../hooks';
import fetchWithHttpErr, { getAuthHeader } from '../../utils/fetchWithHttpErr';

const Summary = () => {
  const history = useHistory();
  const { token } = useToken();
  const { addPortfolio } = usePortfolios();
  const [isLoading, setIsLoading] = useState(false);

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
  } else if (
    Object.keys(fundData.stocks).reduce(
      (sum, k) => sum + fundData.stocks[k],
      0,
    ) !== fundData.amount
  ) {
    history.push('/create-portfolio/assign-amount');
    return;
  }

  const stockSymbols = Object.keys(fundData.stocks);

  function onSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    Promise.all([
      fetchWithHttpErr(`${process.env.REACT_APP_API_URL}/compositions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: getAuthHeader(token),
        },
        body: JSON.stringify({
          name: fundData.name,
          stocks: Object.keys(fundData.stocks).map((s) => ({
            symbol: s,
            amount: fundData.stocks[s],
          })),
          frequency: fundData.frequency,
        }),
      }),
      fetchWithHttpErr(`${process.env.REACT_APP_API_URL}/accounts`, {
        method: 'GET',
        headers: {
          Authorization: getAuthHeader(token),
        },
      }),
    ])
      .then(([newComposition, profile]) => {
        addPortfolio(newComposition.body);
        if (profile.body.linked_with_bank) {
          history.push('/');
          return;
        }
        history.push('/dbs');
      })
      .catch((e) => {
        console.error(e);
        setIsLoading(false);
      });
  }

  return (
    <>
      <Helmet>
        <title>Investify - {fundData.name}</title>
      </Helmet>
      <FormLayout>
        <Form onSubmit={onSubmit}>
          <h2 className="text-center font-weight-light">Summary</h2>
          <h3 className="text-center font-weight-light">{fundData.name}</h3>
          <h3 className="text-center font-weight-light">${fundData.amount}</h3>
          <h3 className="text-center font-weight-light text-capitalize">
            {fundData.frequency}
          </h3>
          <div>
            <Pie
              data={{
                labels: stockSymbols,
                datasets: [
                  {
                    data: stockSymbols.map((s) => fundData.stocks[s]),
                    label: 'Fund Composition',
                  },
                ],
              }}
              options={{
                plugins: {
                  colorschemes: {
                    scheme: PastelOne9,
                  },
                },
                tooltips: {
                  callbacks: {
                    label: (item) => {
                      const symbol = stockSymbols[item.index];
                      return `${symbol}: $${fundData.stocks[symbol]}`;
                    },
                  },
                },
              }}
            />
          </div>
          <div className="text-center">
            <Button
              className="mt-4"
              color="primary"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </Form>
      </FormLayout>
    </>
  );
};

export default Summary;
