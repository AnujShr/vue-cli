<template>
    <div class="post">

        <div class="user-info">
            <a href="#" class="user-name">{{user.name}}</a>

            <a href="#">
                <img class="avatar-large" :src="user.avatar" alt="">
            </a>

            <p class="desktop-only text-small">{{userPostsCount}} posts</p>

        </div>

        <div class="post-content">
            <template v-if="!editing">
                <div>
                    <p>
                        {{post.text}}
                    </p>
                </div>
                <a @click.prevent="editing = true" href="#" style="margin-left: auto;" class="link-unstyled"
                   title="Make a change"><i class="fa fa-pencil"></i></a>
            </template>
            <div v-else>
                <post-editor
                        @save="editing = false"
                        @cancel="editing = false"
                        :post="post"
                />
            </div>

        </div>

        <div class="post-date text-faded">
            <div v-if="post.edited" class="edition-info">edited</div>
            <app-date :timestamp="post.publishedAt"></app-date>
        </div>
    </div>
</template>

<script>
import PostEditor from '@/components/PostEditor'

export default {
  name: 'PostListItem',
  components: { PostEditor },
  props: {
    post: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      editing: false
    }
  },
  computed: {
    user () {
      return this.$store.state.users[this.post.userId]
    },
    userPostsCount () {
      return this.$store.getters.userPostsCounts(this.post.userId)
    }
  }
}
</script>

<style scoped>

</style>
