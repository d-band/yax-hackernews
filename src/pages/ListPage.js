import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './ListPage.less';
import { listSelector } from '../models/item/selectors';
import ItemList from '../components/ItemList';
import Layout from '../components/Layout';

function ListPage({ loading, items, page, maxPage, activeType, location }) {
  return (
    <Layout>
      <ItemList
        loading={loading}
        items={items}
        page={page}
        maxPage={maxPage}
        activeType={activeType}
        location={location}
      />
    </Layout>
  );
}

ListPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  maxPage: PropTypes.number.isRequired,
  activeType: PropTypes.string.isRequired,
  location: PropTypes.any.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    loading: state.loading,
    ...listSelector(state, ownProps),
  };
}

export default connect(mapStateToProps)(ListPage);
