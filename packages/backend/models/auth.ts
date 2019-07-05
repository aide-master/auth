import { Schema, model, Document } from 'mongoose'

const { String, ObjectId } = Schema.Types

interface Auth extends Document {
  group: string;
  type: string;
  id: string;
  userId: string;
}

const AuthSchema = new Schema({
  group: { // user group
    type: String,
    required: true
  },
  type: { // auth type
    type: String,
    required: true
  },
  id: { // auth type
    type: String,
    required: true
  },
  userId: { // foreign key to user
    type: ObjectId,
    required: true
  }
}, {
  timestamps: true
})

export default model<Auth>('Auth', AuthSchema)
