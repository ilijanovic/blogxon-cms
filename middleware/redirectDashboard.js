export default function ({ store, redirect }) {
  if (store.state.logged) {
    redirect('/dashboard/overview')
  }
}
