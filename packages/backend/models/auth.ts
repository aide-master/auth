import { Schema, Document, model } from 'mongoose'

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
  id: { // auth id
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

AuthSchema.index({ group: 1, type: 1, id: 1 }, { unique: true })

export default model<Auth>('Auth', AuthSchema)
