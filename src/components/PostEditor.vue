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
        publishedAt: Math.floor(Date.now() / 1000),
        threadId: this.threadId,
        userId: 'ALXhxjwgY9PinwNGHpfai6OWyDu2'
      }
      this.postText = ''
      this.$store.dispatch('createPost', post)
    }

  }
}
</script>

<style scoped>

</style>
