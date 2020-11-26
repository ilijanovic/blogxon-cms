export default async function ({ $axios, redirect }) {
  let host =
    process.env.NODE_ENV === 'production'
      ? process.env.HOST
      : `http://localhost:3000`
  let adminExist = await $axios.$get(host + '/api/internal/adminExist')
  if (adminExist) return redirect('/')
}
