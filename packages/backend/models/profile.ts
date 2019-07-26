import { Schema, Document, model } from 'mongoose'

const { String } = Schema.Types

interface Profile extends Document {
  nickname: string
  gender?: string
  birthday?: Date
  address?: string
  zipcode?: string
  email?: string
}

const ProfileSchema = new Schema({
  nickname: {
    type: String,
    required: [true, 'name field is required']
  },
  gender: String, // zip code
  birthday: Schema.Types.Date, // zip code
  address: String, // zip code
  zipcode: String, // zip code
  email: String // for notifications, not valid for auth
}, {
  timestamps: true
})

export default model<Profile>('Profile', ProfileSchema)
