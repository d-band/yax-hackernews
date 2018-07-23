import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './ItemPage.less';
import { itemSelector } from '../models/item/selectors';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';
import { host, timeAgo } from '../utils/filters';
import Comment from '../components/Comment';

function ItemPage({ loading, item, itemsById }) {
  if (!item) return null;
  return (
    <Layout>
      <div className="item-view">
        <Spinner loading={loading} />
        <div className="item-view-header">
          <a href={item.url}><h1>{item.title}</h1></a>
          {item.url ? <span className="host">{host(item.url)}</span> : null}
          <p className="meta">
            <span>{`${item.score} points | by `}</span>
            <Link to={`/user/${item.by}`}>{item.by}</Link>
            <span>{` ${timeAgo(item.time)} ago`}</span>
          </p>
        </div>
        <div className="item-view-comments">
          <p className="item-view-comments-header">
            {item.kids ? `${item.descendants} comments` : 'No comments yet.'}
          </p>
          <div className="comment-children">
            {item.kids
              ? item.kids.map(id => <Comment key={id} id={id} itemsById={itemsById} />)
              : null}
          </div>
        </div>
      </div>
    </Layout>
  );
}

ItemPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  item: PropTypes.object,
  itemsById: PropTypes.object.isRequired
};
ItemPage.defaultProps = {
  item: null
};

function mapStateToProps(state, ownProps) {
  return {
    loading: state.loading,
    ...itemSelector(state, ownProps),
  };
}

export default connect(mapStateToProps)(ItemPage);
