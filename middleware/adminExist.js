import { config } from '~/config'

export default async function ({ $axios, redirect }) {
  let host =
    process.env.NODE_ENV === 'production'
      ? config.domain
      : `http://localhost:${config.port}`
  let adminExist = await $axios.$get(host + '/api/internal/adminExist')
  if (adminExist) return redirect('/')
}
