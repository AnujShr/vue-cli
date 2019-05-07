<template>
    <form @submit.prevent="save">
        <div class="form-group">
                    <textarea
                            name=""
                            id=""
                            cols="100"
                            rows="10"
                            class="form-input"
                            v-model="text"
                    ></textarea>
        </div>
        <div class="form-actions">
            <button v-if="isUpdate" class="btn-small btn-ghost" @click.prevent="cancel">Cancel</button>
            <button class="btn-blue">{{isUpdate?'Update': 'Submit post'}}</button>
        </div>
    </form>
</template>

<script>
export default {
  name: 'PostEditor',
  props: {
    threadId: {
      required: false
    },
    post: {
      type: Object,
      validator: obj => {
        const keyIsValid = typeof obj['.key'] === 'string'
        const textIsValid = typeof obj.text === 'string'
        return keyIsValid && textIsValid
      }
    }
  },
  data () {
    return {
      text: this.post ? this.post.text : ''
    }
  },
  computed: {
    isUpdate () {
      return !!this.post
    }
  },
  methods: {
    save () {
      this.persist()
        .then(post => {
          this.$emit('save', { post })
        })
    },
    create () {
      const post = {
        text: this.text,
        threadId: this.threadId
      }
      this.text = ''
      return this.$store.dispatch('createPost', post)
    },
    update () {
      const payload = {
        id: this.post['.key'],
        text: this.text
      }
      return this.$store.dispatch('updatePost', payload)
    },
    persist () {
      return this.isUpdate ? this.update() : this.create()
    },
    cancel () {
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped>

</style>
