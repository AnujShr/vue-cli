<template>
    <div class="col-full">
        <h1>Welcome to the Forum</h1>
        <ThreadList
                :threads="threads"
        />
    </div>

</template>

<script>
import sourceData from '@/data'
import ThreadList from '@/components/ThreadList'

export default {
  name: 'PageHome',
  components: {
    ThreadList
  },
  data () {
    return {
      threads: Object.values(sourceData.threads),
      posts: sourceData.posts,
      users: sourceData.users,
      forums: sourceData.forums,
      categories: sourceData.categories
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
