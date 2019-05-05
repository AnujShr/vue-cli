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
                By <a href="#" class="link-unstyled">Robin</a>,
                <app-date :timestamp="thread.publishedAt"/>
                <span style="float:right; margin-top: 2px;" class="hide-mobile text-faded text-small">3 replies by 3 contributors</span>
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
