<template>
  <div class="admin">
    <div class="login">
      <h1>Generate admin account</h1>
      <small style="margin: 20px 0"
        >If its your first time, you will need to create an admin acccount. You
        can do it here. Type in your email adress and password. This will be
        your admin account where you can login to the admin panel. After
        successful generation this site won't be available again.</small
      >
      <div class="inputbox">
        <small>Email</small>
        <input @keyup.enter="login" v-model="email" />
      </div>
      <div class="inputbox">
        <small>Password</small>
        <input @keyup.enter="login" type="password" v-model="password" />
      </div>
      <div class="inputbox">
        <small>Password confirm</small>
        <input @keyup.enter="login" type="password" v-model="passwordConfirm" />
      </div>
      <primary
        :disabled="loading"
        :loading="loading"
        @click.native="login"
        style="margin-left: auto"
        >Login</primary
      >
      <errorModal v-if="errorMessage" :text="errorMessage" />
    </div>
  </div>
</template>
<script>
import errorModal from '@/components/dashboard/modals/error'
import primary from '@/components/dashboard/button/primary'
export default {
  data() {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
      loading: false,
      errorMessage: '',
    }
  },
  methods: {
    async login() {
      this.loading = true
      this.errorMessage = ''
      try {
        await this.$axios.$post('/api/internal/generateAdmin', {
          email: this.email,
          password: this.password,
          passwordConfirm: this.passwordConfirm,
        })
      } catch ({ response }) {
        let { message } = response.data
        this.errorMessage = message
      }
      this.loading = false
    },
  },
  middleware: 'adminExist',
  components: {
    primary,
    errorModal,
  },
}
</script>
<style lang="scss" scoped>
.login {
  margin: 30px auto;
  max-width: 600px;
  width: 100%;
  padding: 15px;
  small {
    font-size: 16px;
    color: grey;
    display: block;
  }
  .inputbox {
    margin: 20px 0;
    input {
      width: 100%;
    }
  }
}
</style>
