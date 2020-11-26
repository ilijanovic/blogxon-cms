<template>
  <div class="settings">
    <div class="inputbox">
      <div class="title">
        <h2>User</h2>
        <div>
          <NuxtLink to="/dashboard/settings/createUser">
            <primary>Create user</primary>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="usersbox">
      <h2 style="margin-right: auto">Users</h2>
      <div class="users">
        <userCard :user="user" v-for="user in users" :key="user._id" />
      </div>
    </div>
    <authorEdit @refresh="$fetch()" :author="author" />
  </div>
</template>

<script>
import primary from '@/components/dashboard/button/primary'
import userCard from '@/components/dashboard/user/userCard'
import authorEdit from '@/components/dashboard/authorEdit'
import { mapGetters } from 'vuex'
export default {
  layout: 'dashboard',
  data() {
    return {
      author: {},
    }
  },
  components: {
    userCard,
    authorEdit,
  },
  async fetch() {
    try {
      let [users, author] = await Promise.all([
        this.$axios.$get('/api/internal/getUsers'),
        this.$axios.$get('/api/internal/getAuthor'),
      ])
      this.author = author
      this.$store.commit('dashboard/SET_USERS', users)
    } catch ({ response }) {
      this.$store.commit('dashboard/SET_ERROR_MESSAGE', response.data.message)
    }
  },
  computed: {
    ...mapGetters({
      users: 'dashboard/users',
    }),
  },
  head() {
    return {
      title: 'Settings',
    }
  },
}
</script>
<style lang="scss" scoped>
.settings {
  padding: 15px;
  max-width: 1000px;
  margin: 0 auto;
  .preview {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 1px solid #dadada;
  }
  .inputbox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 0 10px -8px black;
    border: 1px solid #dadada;
    border-radius: 6px;
    padding: 15px;
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex: 1;
    }
  }
  .usersbox {
    box-shadow: 0 0 10px -8px black;
    border: 1px solid #dadada;
    border-radius: 6px;
    padding: 15px;
    margin-top: 20px;
    .users {
      display: flex;
      flex-flow: wrap;
      justify-content: center;
    }
  }
  .settingbox {
    margin-top: 1em;

    max-width: 400px;
    input {
      width: 100%;
    }
    textarea {
      resize: none;
      width: 100%;
    }
  }
}
</style>
