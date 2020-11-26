import mongoose from 'mongoose'
import { conn } from '../config/connection'
import { BadgeInterface } from "../../../types"
const badgeSchema = new mongoose.Schema({
    path: {
        type: String
    }
})

export default conn.model<BadgeInterface>('Badge', badgeSchema)

