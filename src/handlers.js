import { watchList } from './services/hn';

let activeType = null;
let unwatchList = null;
let page = null;

const load = dispatch => (type, payload) => {
  const hide = () => dispatch({ type: 'hide' });
  dispatch({ type: 'show' });
  dispatch({ type, payload }).then(hide).catch(hide);
};
export const list = ({ match, dispatch }) => {
  function fetchList(type, _page = 1) {
    page = _page;
    dispatch({ type: 'item/saveActiveType', payload: type });
    load(dispatch)('item/fetchList', { type, page });
  }

  function doWatchList(type) {
    const unwatchListFn = watchList(type, (ids) => {
      dispatch({ type: 'item/saveList', payload: { type, ids } });
      load(dispatch)('item/fetchList', { type, page });
    });
    return unwatchListFn;
  }
  const { type, page: _page } = match.params;
  // fetch
  fetchList(type, _page);
  // watch
  if (activeType !== type) {
    activeType = type;
    if (unwatchList) unwatchList();
    unwatchList = doWatchList(type);
  }
};

export const item = ({ match, dispatch }) => {
  const { itemId } = match.params;
  load(dispatch)('item/fetchComments', itemId);
};

export const user = ({ match, dispatch }) => {
  const { userId } = match.params;
  load(dispatch)('user/fetchUser', userId);
};
