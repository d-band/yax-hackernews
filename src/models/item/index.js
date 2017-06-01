import {
  fetchIdsByType,
  fetchItem,
  fetchItems,
} from '../../services/hn';

export default {
  state: {
    activeType: null,
    itemsPerPage: 20,
    lists: {
      top: [],
      new: [],
      show: [],
      ask: [],
      job: [],
    },
    itemsById: {},
  },
  actions: {
    async fetchList({ select, commit }, { type, page }) {
      const ids = await fetchIdsByType(type);
      const { itemsPerPage } = select();
      const tmpIds = ids.slice(itemsPerPage * (page - 1), itemsPerPage * page);
      const items = await fetchItems(tmpIds);
      commit('saveList', { ids, type });
      commit('saveItems', items);
    },
    async fetchComments({ commit, dispatch }, id) {
      const item = await fetchItem(id);
      commit('saveItems', [item]);
      await Promise.all(item.kids.map(
        kid => dispatch('fetchComments', kid)
      ));
    },
  },
  reducers: {
    saveList(state, { ids, type }) {
      return { ...state, lists: { ...state.lists, [type]: ids } };
    },
    saveItems(state, itemsArr) {
      const items = itemsArr.reduce((_memo, item) => {
        const memo = _memo;
        memo[item.id] = item;
        return memo;
      }, {});
      return { ...state, itemsById: { ...state.itemsById, ...items } };
    },
    saveActiveType(state, activeType) {
      return { ...state, activeType };
    },
  },
};
