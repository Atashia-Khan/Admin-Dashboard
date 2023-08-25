import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    signinUser: {},
    chatHistory: [],
  },

  getters: {
    getAllUsers(state) {
      return state.users;
    },
    getSigninUser(state) {
      return state.signinUser;
    },
    getChatHistory(state) {
      return state.chatHistory;
    },
  },

  mutations: {
    // user data set and send
    setUsersData(state, payload) {
      state.users.push(payload);
    },
    sendUsersData(state, payload) {
      state.users = payload;
    },
    // sign in user data set and send
    setSigninUser(state, payload) {
      state.signinUser = payload;
    },
    sendSigninUserData(state, payload) {
      state.signinUser = payload;
    },
    // set chat history
    setChatHistory(state, payload) {
      state.chatHistory.push(payload);
    },
    // sign out user
    signoutUser(state) {
      state.signinUser = 0;
    },
    // clear the chat history after signing out
    clearChatHistory(state) {
      state.chatHistory = 0;
    },
    // update user
    updateUsers(state, payload) {
      state.users[updateUser.index] = payload.updatedLoginUser;
    },
  },

  actions: {
    // set users data and send through API
    setUsersData({commit}, payload) {
      commit("setUsersData", payload);
    },
    sendUsersData(context, payload) {
      axios
        .post("http://192.168.11.213:3000/users/create-user", payload)
        .then(function (response) {
          console.log("response", response);
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    
    // set signin user data and send through API
    setSigninUser({commit}, payload) {
      commit("setSigninUser", payload);
    },
    sendSigninUserData(context, payload) {
      axios
        .post("http://192.168.11.213:3000/users/login", payload)
        .then(function (response) {
          console.log("response", response);
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },

    // set chats history
    setChatHistory({commit}, payload) {
      commit("setChatHistory", payload);
    },
    // sign out user
    signoutUser({commit}) {
      commit("signoutUser");
    },
    // clear the chat history after signing out
    clearChatHistory({commit}) {
      commit("clearChatHistory");
    },
    // update user
    updateUsers({commit}, payload) {
      commit("updateUsers", payload);
    },
  },

  modules: {},

  plugins: [createPersistedState()],
});
