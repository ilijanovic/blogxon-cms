import mongoose from 'mongoose'
import { conn } from '../config/connection'
import { config } from '../../../config'
import { UserModelInterface } from "../../../types"
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    required: true,
    default: Date.now,
  },
  disabled: {
    type: Boolean,
    default: false
  },
  author: {
    name: {
      type: String,
      trim: true,
      maxlength: config.name_length,
      default: "",
    },
    bio: {
      type: String,
      trim: true,
      maxlength: config.bio_length,
      default: "",
    },
    githubLink: {
      type: String,
      trim: true,
      default: null
    },
    stackoverflowLink: {
      type: String,
      trim: true,
      default: null
    },
    twitterLink: {
      type: String,
      trim: true,
      default: null
    },
    image: {
      type: String,
      trim: true,
      default: null
    },
    image_webp: {
      type: String,
      trim: true,
      default: null
    },
  },
})

export default conn.model<UserModelInterface>('User', userSchema)

