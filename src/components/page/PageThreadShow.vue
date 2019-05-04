<template>
    <div>
        <div v-bind:key="thread.key" class="col-large push-top">

            <h1>{{thread.title}}</h1>
            <PostList :posts="posts"/>
            <post-editor
                    :thread-id=id
                    @save="addPost"/>
        </div>
    </div>
</template>

<script>
import sourceData from '@/data'
import PostList from '@/components/page/PostList'
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
  data () {
    return {
      thread: sourceData.threads[this.id]
    }
  },
  computed: {
    posts () {
      const postIds = Object.values(this.thread.posts)
      return Object.values(sourceData.posts).filter(post => postIds.includes(post['.key']))
    }
  },
  methods: {
    addPost (eventData) {
      const post = eventData.post
      const postId = eventData.post['.key']
      this.$set(sourceData.posts, postId, post)
      this.$set(this.thread.posts, postId, postId)
      this.$set(sourceData.users[post.userId].posts, postId, postId)
    }
  }
}
</script>

<style scoped>

</style>
