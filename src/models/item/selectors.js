export function listSelector(state, { match }) {
  const page = Number(match.params.page) || 1;
  const { itemsPerPage, activeType, lists, itemsById } = state.item;
  const ids = lists[activeType].slice(itemsPerPage * (page - 1), itemsPerPage * page);
  const items = ids.reduce((memo, id) => {
    if (itemsById[id]) memo.push(itemsById[id]);
    return memo;
  }, []);
  const maxPage = Math.ceil(lists[activeType].length / itemsPerPage);
  return { items, page, maxPage, activeType };
}

export function itemSelector(state, { match }) {
  const id = match.params.itemId;
  const item = state.item.itemsById[id];

  return {
    item,
    itemsById: state.item.itemsById,
  };
}
