import Vue from 'vue'
import Vuex from 'Vuex'
import sourceData from '@/data'

Vue.use(Vuex)

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
        commit('appendThreadToForum', { forumId, threadId })
        commit('appendThreadToUser', { userId, threadId })
        dispatch('createPost', { text, threadId })
          .then(post => {
            commit('setThread', { threadId, thread: { ...thread, firstPostId: post['.key'] } })
          })

        resolve(state.threads[threadId])
      })
    },
    updateThread ({ commit, state }, { id, text, title }) {
      return new Promise((resolve, reject) => {
        const thread = state.threads[id]
        const post = state.posts[thread.firstPostId]

        const newThread = { ...thread, title }
        const newPost = { ...post, text }

        commit('setThread', { thread: newThread, threadId: id })
        commit('setPost', { post: newPost, postId: thread.firstPostId })
        resolve(state.threads[id])
      })
    },
    createPost ({ commit, state }, post) {
      return new Promise((resolve, reject) => {
        const postId = 'greatPost' + Math.random()
        post['.key'] = postId
        post.userId = state.authId
        post.publishedAt = Math.floor(Date.now() / 1000)

        commit('setPost', { postId, post })
        commit('appendPostToThread', { postId, threadId: post.threadId })
        commit('appendPostToUser', { postId, userId: post.userId })
        resolve(state.posts[postId])
      })
    },
    updatePost ({ commit, state }, { id, text }) {
      return new Promise((resolve, reject) => {
        const post = state.posts[id]
        commit('setPost', {postId: id, post: { ...post, text }})
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
    }
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
    appendPostToThread (state, { postId, threadId }) {
      const thread = state.threads[threadId]
      if (!thread.posts) {
        Vue.set(thread, 'posts', {})
      }
      Vue.set(thread.posts, postId, postId)
    },
    appendPostToUser (state, { postId, userId }) {
      const user = state.users[userId]
      Vue.set(user.posts, postId, postId)
    },
    appendThreadToForum (state, { threadId, forumId }) {
      const forum = state.forums[forumId]
      if (!forum.threads) {
        Vue.set(forum, 'threads', {})
      }
      Vue.set(forum.threads, threadId, threadId)
    },
    appendThreadToUser (state, { threadId, userId }) {
      const user = state.users[userId]
      if (!user.threads) {
        Vue.set(user, 'threads', {})
      }
      Vue.set(user.threads, threadId, threadId)
    }
  }
})
