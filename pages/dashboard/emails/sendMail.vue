<template>
  <div class="dashboard">
    <h1>Send email</h1>
    <div class="inputbox">
      <div class="inputbox">
        <small>From</small>
        <input v-model="from" type="text" />
      </div>
      <div class="inputbox">
        <small>Subject</small>
        <input v-model="subject" type="text" />
      </div>
      <div class="inputbox">
        <small>Message</small>
        <textarea v-model="text" name="" id="" cols="30" rows="10"></textarea>
      </div>
      <primary @click.native="send" style="margin-left: auto">Send</primary>
    </div>
  </div>
</template>
<script>
import primary from '@/components/dashboard/button/primary'
export default {
  head() {
    return {
      title: 'Dashboard send mail',
    }
  },
  data() {
    return {
      from: '',
      text: '',
      subject: '',
    }
  },
  methods: {
    async send() {
      try {
        await this.$axios.$post('/api/internal/sendMail', {
          subject: this.subject,
          from: this.from,
          text: this.text,
        })
      } catch ({ response }) {}
    },
  },
  components: {
    primary,
  },
  layout: 'dashboard',
}
</script>
<style lang="scss" scoped>
.dashboard {
  padding: 15px;
  max-width: 900px;
  margin: 20px auto;
  h1 {
    margin-bottom: 1em;
  }
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
      align-items: center;
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
}
</style>
