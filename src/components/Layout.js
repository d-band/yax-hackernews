import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import './Layout.less';

const Layout = props => (
  <div>
    <div className="header">
      <div className="inner">
        <Link to="/">
          <img alt="presentation" className="logo" src="/public/logo.png" />
        </Link>
        <NavLink activeClassName="active" to="/top">Top</NavLink>
        <NavLink activeClassName="active" to="/new">New</NavLink>
        <NavLink activeClassName="active" to="/show">Show</NavLink>
        <NavLink activeClassName="active" to="/ask">Ask</NavLink>
        <NavLink activeClassName="active" to="/job">Jobs</NavLink>
        <a className="github" rel="noopener noreferrer" href="https://github.com/d-band/yax-hackernews" target="_blank">
          Built with Yax
        </a>
      </div>
    </div>
    <div className="view">
      { props.children }
    </div>
  </div>
);
Layout.propTypes = {
  children: PropTypes.any
};
Layout.defaultProps = {
  children: null
};

export default Layout;
