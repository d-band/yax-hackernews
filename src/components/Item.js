import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Item.less';
import { host, timeAgo } from '../utils/filters';

const Item = ({ item }) => {
  const {
    score,
    title,
    url,
    type,
    id,
    by,
    descendants,
    time,
  } = item;

  return (
    <div className="news-item">
      <span className="score">{score}</span>
      <span className="title">
        {url
          ? <span><a href={url} rel="noopener noreferrer" target="_blank">{title}</a><span className="host"> ({host(url)})</span></span>
          : <Link to={`/item/${id}`}>{title}</Link>}
      </span>
      <br />
      <span className="meta">
        {type !== 'job'
          ? <span className="by">by <Link to={`/user/${by}`}>{by}</Link></span>
          : null}
        <span className="time">{` ${timeAgo(time)}`} ago</span>
        {type !== 'job'
          ? <span className="comments-link">
            <span>{' | '}</span>
            <Link to={`/item/${id}`}>{descendants} comments</Link>
          </span>
          : null}
      </span>
      {type !== 'story'
        ? <span className="label">{type}</span>
        : null}
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Item;
