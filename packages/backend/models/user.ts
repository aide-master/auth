import { Schema, model } from 'mongoose'

const { String } = Schema.Types

const UserSchema = new Schema({
  group: { // user group
    type: String,
    required: [true, 'group field is required']
  },
  salt: String, // salt for password
  password: String // password
}, {
  timestamps: true
})

export default model('User', UserSchema)
