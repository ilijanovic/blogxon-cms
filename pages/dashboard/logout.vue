<script>
export default {
  async asyncData({ $axios, req, store, redirect }) {
    store.commit('SET_TOKEN', null)
    store.commit('SET_LOGIN', false)
    store.commit('SET_USER', null)
    await $axios.$post('/api/internal/eraseCookie')
    redirect('/')
  },
}
</script>