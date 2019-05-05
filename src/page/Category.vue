<template>
        <div class="col-full push-top">
            <h1>{{category.name}}</h1>
            <category-list-item :category="category"/>

        </div>

</template>

<script>
import ForumList from '@/components/ForumList'
import CategoryListItem from '@/components/CategoryListItem'

export default {
  name: 'Category',
  components: { CategoryListItem, ForumList },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  computed: {
    category () {
      return this.$store.state.categories[this.id]
    }
  }
}
</script>

<style scoped>

</style>
