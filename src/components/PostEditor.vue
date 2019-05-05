<template>
    <form @submit.prevent="save">
        <div class="form-group">
                    <textarea
                            name=""
                            id=""
                            cols="30"
                            rows="10"
                            class="form-input"
                            v-model="postText"
                    ></textarea>
        </div>
        <div class="form-actions">
            <button class="btn-blue">Submit post</button>
        </div>
    </form>

</template>

<script>
export default {
  name: 'PostEditor',
  props: {
    threadId: {
      required: true
    }
  },
  data () {
    return {
      postText: ''
    }
  },
  methods: {
    save () {
      const post = {
        text: this.postText,
        threadId: this.threadId
      }
      this.postText = ''
      this.$store.dispatch('createPost', post)
    }

  }
}
</script>

<style scoped>

</style>
