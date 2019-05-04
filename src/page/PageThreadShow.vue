<template>
    <div>
        <div v-bind:key="thread.key" class="col-large push-top">

            <h1>{{thread.title}}</h1>
            <p>
                By <a href="#" class="link-unstyled">Robin</a>, <app-date :timestamp="thread.publishedAt"/>
                <span style="float:right; margin-top: 2px;" class="hide-mobile text-faded text-small">3 replies by 3 contributors</span>
            </p>

            <PostList :posts="posts"/>
            <post-editor
                    :thread-id=id
                    @save="addPost"/>
        </div>
    </div>
</template>

<script>
import sourceData from '@/data'
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
    addPost ({ post }) {
      const postId = post['.key']
      this.$set(sourceData.posts, postId, post)
      this.$set(this.thread.posts, postId, postId)
      this.$set(sourceData.users[post.userId].posts, postId, postId)
    }
  }
}
</script>

<style scoped>

</style>
