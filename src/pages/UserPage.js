import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './UserPage.less';
import Layout from '../components/Layout';
import userSelector from '../models/user/selectors';
import Spinner from '../components/Spinner';
import { timeAgo } from '../utils/filters';

function UserPage({ loading, user }) {
  function renderUser() {
    return (
      <div>
        <h1>User : {user.id}</h1>
        <ul className="meta">
          <li>
            <span className="label">Created: </span>
            <span>{`${timeAgo(user.created)} ago`}</span>
          </li>
          <li>
            <span className="label">Karma: </span>
            <span>{user.karma}</span>
          </li>
          { user.about ?
            <li className="about" dangerouslySetInnerHTML={{ __html: user.about }} />
            : null }
        </ul>
        <p className="links">
          <a href={`https://news.ycombinator.com/submitted?id=${user.id}`} rel="noopener noreferrer" target="_blank">submissions</a>
          <span> | </span>
          <a href={`https://news.ycombinator.com/threads?id=${user.id}`} rel="noopener noreferrer" target="_blank">comments</a>
        </p>
      </div>
    );
  }

  return (
    <Layout>
      <div className="user-view">
        <Spinner loading={loading} />
        { user ? renderUser() : null }
      </div>
    </Layout>
  );
}

UserPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    loading: state.loading,
    ...userSelector(state, ownProps),
  };
}

export default connect(mapStateToProps)(UserPage);
