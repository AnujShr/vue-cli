<template>
    <div class="post-list">
        <PostListItem
                v-for="post in posts"
                :post="post"
                :key="post['.key']">
        </PostListItem>
    </div>

</template>

<script>
import PostListItem from './PostIListtem'

export default {
  name: 'PostList',
  props: {
    posts: {
      required: true,
      type: Array
    }
  },
  components: {
    PostListItem
  }
}
</script>

<style scoped>

</style>
