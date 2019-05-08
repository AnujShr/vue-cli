<template>
    <div class="col-full push-top">
        <h1>Welcome to the Forum</h1>
        <category-list
                :categories="categories"
        />
    </div>

</template>

<script>

import CategoryList from '@/components/CategoryList'

export default {
  name: 'PageHome',
  components: {
    CategoryList
  },
  computed: {
    categories () {
      return Object.values(this.$store.state.categories)
    }
  },
  beforeCreate () {
    this.$store.dispatch('fetchAllCategories')
      .then(cateogires => {
        cateogires.forEach(category => this.$store.dispatch('fetchForums', {ids: Object.keys(category.forums)}))
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
