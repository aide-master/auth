import { Schema, Document, model } from 'mongoose'

const { String } = Schema.Types

interface Profile extends Document {
  nickname: string
  gender?: string
  birthday?: Date
  address?: string
  zipcode?: string
  email?: string
  avatar?: string
}

const ProfileSchema = new Schema({
  nickname: {
    type: String,
    required: [true, 'name field is required']
  },
  gender: String, // gender
  birthday: Schema.Types.Date, // birthday
  address: String, // address
  zipcode: String, // zip code
  avatar: String, // avatar
  email: String // for notifications, not valid for auth
}, {
  timestamps: true
})

export default model<Profile>('Profile', ProfileSchema)
