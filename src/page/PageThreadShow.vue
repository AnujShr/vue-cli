<template>
    <div>
        <div v-bind:key="thread.key" class="col-large push-top">

            <h1>{{thread.title}}</h1>
            <router-link
                    :to="{name:'ThreadEdit' , props:{id: this.id}}"
                    class="btn-small btn-green"
                    tag="button"
            >Edit</router-link>
            <p>
                By <a href="#" class="link-unstyled">{{user.name}}</a>,
                <app-date :timestamp="thread.publishedAt"/>
                <span style="float:right; margin-top: 2px;" class="hide-mobile text-faded text-small">{{repliesCount}} replies by {{contributorsCount}} contributors</span>
            </p>

            <PostList :posts="posts"/>
            <post-editor
                    :thread-id="id"/>
        </div>
    </div>
</template>

<script>
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
      const replies = Object.keys(this.thread.posts)
        .filter(postId => postId !== this.thread.firstPostId)
        .map(postId => this.$store.state.posts[postId])
      const userIds = replies.map(post => post.userId)
      return userIds.filter((item, index) => userIds.indexOf(item) === index).length
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
  }
}
</script>

<style scoped>

</style>
