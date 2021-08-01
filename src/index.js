import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './assets/plugins/nucleo/css/nucleo.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/css/argon-dashboard-react.css';
import './index.css';

import reportWebVitals from './reportWebVitals';
import Provider from './store';
import PortfolioPage from './pages/Portfolio';
import Auth from './pages/Auth';
import NotFoundPage from './pages/NotFound';
import DiscoverPage from './pages/Discover';
import SymbolPage from './pages/Symbol';
import CreatePortfolio from './pages/CreatePortfolio';
import AddSymbolsPage from './pages/CreatePortfolio/AddSymbols';
import AssignAmount from './pages/CreatePortfolio/AssignAmount';
import Summary from './pages/CreatePortfolio/Summary';
import DBSLinkingPage from './pages/DBS';
import PrivateRoute from './components/Routes/PrivateRoute';
import PublicRoute from './components/Routes/PublicRoute';

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <Router>
        <Switch>
          <PrivateRoute
            exact
            path="/portfolios/:portfolio_id"
            component={PortfolioPage}
          />
          <PublicRoute exact path="/auth/login" component={Auth} />
          <PublicRoute exact path="/auth/register" component={Auth} />
          <PublicRoute exact path="/auth/reset" component={Auth} />
          <PrivateRoute exact path="/discover" component={DiscoverPage} />
          <PrivateRoute exact path="/symbol/:symbol" component={SymbolPage} />
          <PrivateRoute
            exact
            path="/create-portfolio"
            component={CreatePortfolio}
          />
          <PrivateRoute
            exact
            path="/create-portfolio/add-symbols"
            component={AddSymbolsPage}
          />
          <PrivateRoute
            exact
            path="/create-portfolio/assign-amount"
            component={AssignAmount}
          />
          <PrivateRoute
            exact
            path="/create-portfolio/summary"
            component={Summary}
          />
          <PrivateRoute exact path="/dbs" component={DBSLinkingPage} />
          <PrivateRoute exact path="/" component={PortfolioPage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
