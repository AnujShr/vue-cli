<template>
    <div>
        <category-list-item
                v-for="category in categories"
                :category="category"
                :key="category['.key']"
        />
    </div>
</template>

<script>
import CategoryListItem from './CategoryListItem'

export default {
  name: 'CategoryList',
  components: { CategoryListItem },
  props: {
    categories: {
      required: true,
      type: Array
    }
  }
}
</script>
a
<style scoped>

</style>
