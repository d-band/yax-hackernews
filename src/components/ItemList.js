import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';
import './ItemList.less';
import Spinner from './Spinner';
import Item from './Item';

const ItemList = ({ loading, items, page, maxPage, activeType, location }) => (
  <div className="news-view">
    <Spinner loading={loading} />
    <div className="news-list-nav">
      {page > 1
          ? <Link to={`/${activeType}/${page - 1}`}>&lt; prev</Link>
          : <a className="disabled">&lt; prev</a>}
      <span>{`${page}/${maxPage}`}</span>
      {page < maxPage
          ? <Link to={`/${activeType}/${page + 1}`}>more &gt;</Link>
          : <a className="disabled">more &gt;</a>}
    </div>
    <CSSTransitionGroup
      transitionName="list"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}
    >
      <div key={location.pathname} className="news-list">
        <CSSTransitionGroup
          transitionName="item"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {
              items.map(item => <Item key={item.id} item={item} />)
            }
        </CSSTransitionGroup>
      </div>
    </CSSTransitionGroup>
  </div>
);
ItemList.propTypes = {
  loading: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  maxPage: PropTypes.number.isRequired,
  activeType: PropTypes.string.isRequired,
  location: PropTypes.any.isRequired
};

export default ItemList;
