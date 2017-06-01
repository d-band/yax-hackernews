import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Comment.less';
import { timeAgo } from '../utils/filters';

function pluralize(n) {
  return n + (n === 1 ? ' reply' : ' replies');
}

class Comment extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    itemsById: PropTypes.any.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
  }

  handleExpand = (e) => {
    e.preventDefault();
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    const { id, itemsById } = this.props;
    const comment = itemsById[id];
    const { open } = this.state;
    if (!comment) return null;

    return (
      <div className="comment">
        <div className="by">
          <Link to={`/user/${comment.by}`}>{comment.by}</Link>
          <span>{` ${timeAgo(comment.time)} ago`}</span>
          {comment.kids
            ? (<span> | <a href="" className="expand" onClick={this.handleExpand}>
              {`${open ? 'collapse' : 'expand'} ${pluralize(comment.kids.length)}`}
            </a></span>)
            : null}
        </div>
        <div className="text" dangerouslySetInnerHTML={{ __html: comment.text }} />
        <div className="comment-children">
          {comment.kids && open
            ? comment.kids.map(kid => <Comment key={kid} id={kid} itemsById={itemsById} />)
            : null}
        </div>
      </div>
    );
  }
}

export default Comment;
