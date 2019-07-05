import { Schema, model, Document } from 'mongoose'

const { String } = Schema.Types

interface User extends Document {
  group: string;
  salt?: string;
  password?: string;
}

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

export default model<User>('User', UserSchema)
