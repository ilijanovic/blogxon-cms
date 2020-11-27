<template>
  <div class="admin">
    <div
      class="shadow-md p-3 rounded-md border container mx-auto mt-20 max-w-xl px-6"
    >
      <h1 class="text-xl my-5">Generate admin account</h1>
      <label class="block mb-1">
        If its your first time, you will need to create an admin acccount. You
        can do it here. Type in your email adress and password. This will be
        your admin account where you can login to the admin panel. After
        successful generation this site won't be available again.</label
      >

      <div class="mb-5 mt-5 text-gray-700">
        <label class="block mb-1" for="forms-helpTextCode">Email</label>
        <input
          class="w-full h-10 py-6 px-4 text-base placeholder-gray-600 border rounded-md focus:outline-none"
          @keyup.enter="login"
          v-model="email"
        />
      </div>
      <div class="my-5 text-gray-700">
        <label class="block mb-1" for="forms-helpTextCode">Password</label>
        <input
          class="w-full h-10 py-6 px-4 text-base placeholder-gray-600 border rounded-md focus:outline-none"
          type="password"
          @keyup.enter="login"
          v-model="password"
        />
      </div>
      <div class="my-5 text-gray-700">
        <label class="block mb-1" for="forms-helpTextCode"
          >Password confirm</label
        >
        <input
          class="w-full h-10 py-6 px-4 text-base placeholder-gray-600 border rounded-md focus:outline-none"
          @keyup.enter="login"
          type="password"
          v-model="passwordConfirm"
        />
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
