import { Schema, model } from 'mongoose'

const { String, Date } = Schema.Types

const ProfileSchema = new Schema({
  nickname: {
    type: String,
    required: [true, 'name field is required']
  },
  gender: String, // zip code
  birthday: Date, // zip code
  address: String, // zip code
  zipcode: String, // zip code
  email: String // for notifications, not valid for auth
}, {
  timestamps: true
})

export default model('Profile', ProfileSchema)
