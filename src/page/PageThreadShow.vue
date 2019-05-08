<template>
    <div v-if="thread && user" v-bind:key="thread.key" class="col-large push-top">
        <h1>{{thread.title}}</h1>
        <router-link
                :to="{name:'ThreadEdit' , props:{id: this.id}}"
                class="btn-small btn-green"
                tag="button"
        >Edit
        </router-link>
        <p>
            By <a href="#" class="link-unstyled">{{user.name}}</a>,
            <app-date :timestamp="thread.publishedAt"/>
            <span style="float:right; margin-top: 2px;" class="hide-mobile text-faded text-small">{{repliesCount}} replies by {{contributorsCount}} contributors</span>
        </p>
        <PostList :posts="posts"/>
        <post-editor
                :thread-id="id"/>
    </div>
</template>

<script>
import { countObjProp } from '@/utils'
import PostList from '@/components/PostList'
import PostEditor from '@/components/PostEditor'

export default {

  name: 'ThreadShow',
  props: {
    id: {
      required: true,
      type: String
    }
  },
  components: {
    PostList,
    PostEditor
  },
  computed: {
    repliesCount () {
      return this.$store.getters.repliesCount(this.thread['.key'])
    },
    contributorsCount () {
      return countObjProp(this.thread.contributors)
    },
    user () {
      return this.$store.state.users[this.thread.userId]
    },
    posts () {
      const postIds = Object.values(this.thread.posts)
      return Object.values(this.$store.state.posts)
        .filter(post => postIds.includes(post['.key']))
    },
    thread () {
      return this.$store.state.threads[this.id]
    }
  },
  created () {
    this.$store.dispatch('fetchThread', {id: this.id})
      .then(thread => {
        this.$store.dispatch('fetchUser', {id: thread.userId})
        this.$store.dispatch('fetchPosts', {ids: Object.keys(thread.posts)})
          .then(posts => {
            posts.forEach(post => {
              this.$store.dispatch('fetchUser', {id: post.userId})
            })
          })
      })
  }
}
</script>

<style scoped>

</style>
