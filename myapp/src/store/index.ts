import { createStore } from 'vuex';
import axios from 'axios';
import { UserData } from '@/types/user';

export default createStore({
  // 状態
  state: {
    count: 0,
    cats: [],    // 全ての猫リスト
    selected: {} // 選択されている猫
  },
  getters: {
    getCount: (state, getters) => () => {
      return state.count;
    },
    getCats: (state, getters) => () => {
      return state.cats;
    },
    getSelected: (state, getters) => () => {
      return state.selected;
    }
  },
  // 状態を変更する
  mutations: {
    increment (state) {
      state.count++;
    },
    update (state, payload) {
      state.count = payload.count;
    },
    setCats (state, payload) {
      state.cats = payload.cats;
    },

    setSelected(state, payload) {
      state.selected = payload.selected;
    },
    updateCat(state, payload) {
      state.cats = payload.cats;
    }

  },
  // mutationをコミットする
  actions: {
    incrementAction (context) {
      context.commit('increment');
    },
    updateAction (context, a: number) {
      const payload = {
        count: a,
      };
      context.commit('update', payload);
    },

    async getCatsAction(context) {
      const cats: UserData[] = await axios.get('/api/cat/all')
        .then(res => {
          return res.data
        }).catch(error => {
          alert(error);
        });
      const payload = {
        cats: cats,
      };
      context.commit('setCats', payload);
    },

    setSelectedAction(context, cat: UserData) {
      const payload = {
        selected: cat,
      }
      context.commit('setSelected', payload);
    },

    async updateCatAction(context, cat: UserData) {
      Object.assign(context.state.selected, cat);
      const cats: UserData[] = await axios.put('/api/cat/update', context.state.selected, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        return res.data
      })
      .catch(error => {
        alert(error);
      });

      const payload = {
        cats: cats,
      };
      context.commit('updateCat', payload);
    }
  },
  // Storeを分割する
  modules: {
  }
})
