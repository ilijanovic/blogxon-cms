
import mongoose from 'mongoose'
import { conn } from '../config/connection'
import { ModelSubscriptionInterface } from "../../../types"
const subscriptionSchema = new mongoose.Schema({
  endpoint: {
    type: String,
  },
  keys: {
    type: Object,
  },
  created: {
    type: Date,
    required: true,
    default: Date.now,
  },
})

export default conn.model<ModelSubscriptionInterface>('Subscription', subscriptionSchema)



