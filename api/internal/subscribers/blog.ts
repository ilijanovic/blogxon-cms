import { EventEmitter } from 'events'
export const eventEmitter = new EventEmitter()

import { subscriber } from './subscriberFunctions'

let userIp: string

eventEmitter.on('add_ip', async ({ _id, slug }: { _id: string, slug: string }) => {

  if (_id) {
    await subscriber.addIpById(_id, userIp)
  }
  if (slug) {
    await subscriber.addIpBySlug(slug, userIp)
  }
})

eventEmitter.on('set_ip', ({ ip }: { ip: string }) => {
  userIp = ip
})
