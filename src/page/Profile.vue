<template>
    <div class="flex-grid">
        <user-profile-card
                v-if="!edit"
                :user="user"
        />
        <user-profile-editor
                v-else
                :user="user"
        />
        <div class="col-7 push-top">

            <div class="profile-header">
                  <span class="text-lead">
                      {{user.name}}'s recent activity
                  </span>
                <a href="#">See only started threads?</a>
            </div>

            <hr>
            <post-list :posts="userPosts"/>

        </div>
    </div>

</template>

<script>
import PostList from '@/components/PostList'
import { mapGetters } from 'Vuex'
import UserProfileCard from '@/components/UserProfileCard'
import UserProfileEditor from '@/components/UserProfileEditor'

export default {
  name: 'Profile',
  components: { UserProfileCard, PostList, UserProfileEditor },
  props: {
    edit: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'authUser'
    }),
    userPosts () {
      return this.user.posts
        ? Object.values(this.$store.state.posts).filter(post => post.userId === this.user['.key'])
        : []
    }
  }
}
</script>

<style scoped>

</style>
