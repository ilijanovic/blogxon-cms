export default function({ redirect, store }) {
  if (!store.state.logged) {
    redirect('/admin')
  }
}
