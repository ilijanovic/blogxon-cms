<template>
  <div class="author">
    <div
      style="display: flex; align-items: center; justify-content: space-between"
    >
      <h1>Create user</h1>
    </div>

    <div class="inputbox">
      <div class="description">
        <small>Email</small>
      </div>
      <input @keyup.enter="create" v-model="email" />
    </div>
    <div class="inputbox">
      <div class="description">
        <small>Password</small>
      </div>
      <input @keyup.enter="create" type="password" v-model="password" />
    </div>
    <div class="inputbox">
      <div class="description">
        <small>Password again</small>
      </div>
      <input @keyup.enter="create" type="password" v-model="passwordConfirm" />
    </div>
    <primary
      :loading="loading"
      :disabled="loading"
      @click.native="create"
      style="margin-left: auto"
      >Create</primary
    >
    <errorModal v-if="errorMessage" :text="errorMessage" />
  </div>
</template>

<script>
import primary from '@/components/dashboard/button/primary'
import errorModal from '@/components/dashboard/modals/error'

export default {
  layout: 'dashboard',
  components: {
    errorModal,
    primary,
  },
  data() {
    return {
      loading: false,
      email: '',
      password: '',
      passwordConfirm: '',
      errorMessage: '',
    }
  },

  methods: {
    async create() {
      this.errorMessage = ''
      this.loading = true
      try {
        await this.$axios.$post('/api/internal/createUser', {
          password: this.password,
          passwordConfirm: this.passwordConfirm,
          email: this.email,
        })
        this.$router.push('/dashboard/settings')
        this.loading = false
      } catch ({ response }) {
        this.loading = false
        let { message } = response.data
        this.errorMessage = message
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.author {
  padding: 15px;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  .inputbox {
    margin: 20px 0;
    textarea {
      resize: none;
      width: 100%;
      height: 100px;
    }
    .description {
      display: flex;
      justify-content: space-between;
    }
    input {
      width: 100%;
    }
    small {
      padding: 6px;
      border-radius: 6px;
      display: block;
      font-size: 16px;
      color: grey;
    }
  }
  .preview {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid #dadada;
    display: flex;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
    svg {
      margin: auto;
      color: grey;
    }
    input {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      opacity: 0;
      cursor: pointer;
    }
  }
}
</style>
