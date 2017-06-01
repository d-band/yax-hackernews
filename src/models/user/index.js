import { fetchUser } from '../../services/hn';

export default {
  state: {
    usersById: {}
  },
  actions: {
    async fetchUser({ commit }, id) {
      const user = await fetchUser(id);
      commit('saveUser', user);
    }
  },
  reducers: {
    saveUser(state, user) {
      return { ...state, usersById: { ...state.usersById, [user.id]: user } };
    }
  }
};
