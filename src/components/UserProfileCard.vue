<template>
    <div class="col-3 push-top">

        <div class="profile-card">

            <p class="text-center">
                <img :src="user.avatar" alt=""
                     class="avatar-xlarge">
            </p>

            <h1 class="title">{{user.username}}</h1>

            <p class="text-lead">{{user.name}}</p>

            <p class="text-justify">
                <span v-if="user.bio">{{user.bio}}</span>
                <span v-else>No bio specified.</span>
            </p>

            <span class="online">{{user.username}}is online</span>

            <div class="stats">
                <span>{{userPostsCounts}} posts</span>
                <span>{{userThreadsCounts}} threads</span>
            </div>

            <hr>

            <p v-if="user.website" class="text-large text-center"><i class="fa fa-globe"></i> <a
                    :href="user.website">{{user.website}}</a></p>

        </div>

        <p class="text-xsmall text-faded text-center">Member since june 2003, last visited 4 hours ago</p>

        <div class="text-center">
            <hr>
            <router-link
                    :to="{name: 'ProfileEdit'}"
                    class="btn-green btn-small"
            >
                Edit Profile
            </router-link>
        </div>

    </div>

</template>

<script>
export default {
  name: 'UserProfileCard',
  props: {
    user: {
      required: true,
      type: Object
    }
  },
  computed: {
    userPostsCounts () {
      return this.$store.getters.userPostsCounts(this.user['.key'])
    },
    userThreadsCounts () {
      return this.$store.getters.userThreadsCounts(this.user['.key'])
    }
  }
}
</script>

<style scoped>

</style>
