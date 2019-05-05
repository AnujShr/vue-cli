<template>
    <div class="thread">
        <div>
            <p>
                <router-link :to="{name:'ThreadShow' , params:{id:thread['.key']}}">{{thread.title}}</router-link>
            </p>
            <p class="text-faded text-xsmall">
                By <a href="#">{{users.name}}</a>, <app-date :timestamp="thread.publishedAt"></app-date>.
            </p>
        </div>

        <div class="activity">
            <p class="replies-count">
                {{repliesCount}} replies
            </p>

            <!--<img class="avatar-medium"-->
            <!--src="https://cdn.pixabay.com/photo/2014/04/03/10/30/batman-310685_1280.png"-->
            <!--alt="">-->

            <!--<div>-->
            <!--<p class="text-xsmall">-->
            <!--<a href="#">Bruce Wayne</a>-->
            <!--</p>-->
            <!--<p class="text-xsmall text-faded">2 hours ago</p>-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
import {countObjProp} from '@/utils'

export default {
  name: 'ThreadListItem',
  props: {
    thread: {
      required: true,
      type: Object
    }
  },
  computed: {
    repliesCount () {
      return countObjProp(this.thread.posts).length - 1
    },
    users () {
      return this.$store.state.users[this.thread.userId]
    }

  }
}
</script>

<style scoped>

</style>
