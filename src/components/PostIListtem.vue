<template>
    <div class="post">

        <div class="user-info">
            <a href="#" class="user-name">{{user.name}}</a>

            <a href="#">
                <img class="avatar-large" :src="user.avatar" alt="">
            </a>

            <p class="desktop-only text-small">{{userPostsCount}} post</p>

        </div>

        <div class="post-content">
            <div>
                {{post.text}}
            </div>
        </div>

        <div class="post-date text-faded">
            <app-date :timestamp="post.publishedAt"></app-date>
        </div>

    </div>

</template>

<script>
import {countObjProp} from '@/utils'

export default {
  name: 'PostListItem',
  props: {
    post: {
      required: true,
      type: Object
    }
  },
  computed: {
    user () {
      return this.$store.state.users[this.post.userId]
    },
    userPostsCount () {
      return countObjProp(this.user.posts)
    }
  }
}
</script>

<style scoped>

</style>
