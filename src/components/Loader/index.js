import React from 'react';

import './index.css';

const Loader = () => (
  <div className="loader">
    <div className="loader__image">
      <div className="loader__coin">
        <i className="fas fa-dollar-sign" />
      </div>
      <div className="loader__hand">
        <i className="fas fa-hand-holding" />
      </div>
    </div>
  </div>
);

export default Loader;
