import { Schema, Document, model } from 'mongoose'

const { String, ObjectId } = Schema.Types

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
  profile: {
    type: ObjectId,
    required: true,
    unique: true
  },
  salt: String, // salt for password
  password: String // password
}, {
  timestamps: true
})

export default model<User>('User', UserSchema)
