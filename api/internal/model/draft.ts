import mongoose from 'mongoose'
import { conn } from '../config/connection'
import { config } from '../../../config'
import { DraftInterface } from "../../../types"
const draftSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    maxlength: config.title_length,
  },
  description: {
    type: String,
    trim: true,
    maxlength: config.description_length,
  },
  thumbnail: {
    type: String,
    trim: true,
  },
  thumbnail_webp: {
    type: String,
    trim: true,
  },
  structuredDataType: {
    type: String,
  },
  keywords: {
    type: Array,
  },
  author: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
})

export default conn.model<DraftInterface>('Draft', draftSchema)

