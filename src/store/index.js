import Vue from 'vue'
import Vuex from 'Vuex'
import sourceData from '@/data'
import { countObjProp } from '@/utils'

Vue.use(Vuex)
const makeAppendToParentMutation = ({ parent, child }) =>
  (state, { childId, parentId }) => {
    const resource = state[parent][parentId]
    if (!resource[child]) {
      Vue.set(resource, child, {})
    }
    Vue.set(resource[child], childId, childId)
  }
export default new Vuex.Store({
  state: {
    ...sourceData,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
  },
  actions: {
    createThread ({ commit, state, dispatch }, { text, title, forumId }) {
      return new Promise((resolve, reject) => {
        const publishedAt = Math.floor(Date.now() / 1000)
        const userId = state.authId
        const threadId = 'greatThread' + Math.random()
        const thread = { '.key': threadId, title, forumId, publishedAt, userId }

        commit('setThread', { threadId, thread })
        commit('appendThreadToForum', { parentId: forumId, childId: threadId })
        commit('appendThreadToUser', { parentId: userId, childId: threadId })
        dispatch('createPost', { text, threadId })
          .then(post => {
            commit('setThread', { threadId, thread: { ...thread, firstPostId: post['.key'] } })
          })

        resolve(state.threads[threadId])
      })
    },
    updateThread ({ commit, state, dispatch }, { id, text, title }) {
      return new Promise((resolve, reject) => {
        const thread = state.threads[id]

        const newThread = { ...thread, title }

        commit('setThread', { thread: newThread, threadId: id })
        dispatch('updatePost', { id: thread.firstPostId, text })
          .then(() => {
            resolve(state.threads[id])
          })
      })
    },
    createPost ({ commit, state }, post) {
      return new Promise((resolve, reject) => {
        const postId = 'greatPost' + Math.random()
        post['.key'] = postId
        post.userId = state.authId
        post.publishedAt = Math.floor(Date.now() / 1000)

        commit('setPost', { postId, post })
        commit('appendPostToThread', { parentId: post.threadId, childId: postId })
        commit('appendPostToUser', { parentId: post.userId, childId: postId })
        resolve(state.posts[postId])
      })
    },
    updatePost ({ commit, state }, { id, text }) {
      return new Promise((resolve, reject) => {
        const post = state.posts[id]
        commit('setPost', {
          postId: id,
          post: {
            ...post,
            text,
            edited: {
              at: Math.floor(Date.now() / 1000),
              by: state.authId
            }
          }
        })
        resolve(post)
      })
    },
    updateUser ({ commit }, user) {
      commit('setUser', { userId: user['.key'], user })
    }
  },
  getters: {
    authUser (state) {
      return state.users[state.authId]
    },
    userThreadsCounts: state => id => countObjProp(state.users[id].threads),
    userPostsCounts: state => id => countObjProp(state.users[id].posts)
  },
  mutations: {
    setThread (state, { thread, threadId }) {
      Vue.set(state.threads, threadId, thread)
    },
    setUser (state, { userId, user }) {
      Vue.set(state.users, userId, user)
    },
    setPost (state, { postId, post }) {
      Vue.set(state.posts, postId, post)
    },
    appendPostToThread: makeAppendToParentMutation({ parent: 'threads', child: 'posts' }),
    appendPostToUser: makeAppendToParentMutation({ parent: 'users', child: 'posts' }),
    appendThreadToForum: makeAppendToParentMutation({ parent: 'forums', child: 'threads' }),
    appendThreadToUser: makeAppendToParentMutation({parent: 'users', child: 'threads'})
  }
})
