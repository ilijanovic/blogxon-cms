import mongoose from 'mongoose'
import { conn } from '../config/connection'
import { EmailInterface } from "../../../types"
const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    index: true,
  },
  created: {
    type: Date,
    required: true,
    default: Date.now,
  },
})

export default conn.model<EmailInterface>('Email', emailSchema)

