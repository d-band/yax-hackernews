import React from 'react';
import PropTypes from 'prop-types';
import './Spinner.less';

function Spinner({ loading }) {
  return (
    <div>
      <svg className={`spinner ${loading ? 'show' : ''}`} width="44px" height="44px" viewBox="0 0 44 44">
        <circle className="path" fill="none" strokeWidth="4" strokeLinecap="round" cx="22" cy="22" r="20" />
      </svg>
    </div>
  );
}

Spinner.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Spinner;
