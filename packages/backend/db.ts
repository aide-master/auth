import * as mongoose from 'mongoose'

let cached = false

const { dbHost, dbUser, dbPassword } = process.env

const uri = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/test?retryWrites=true&w=majority`

export async function init (): Promise<void> {
  if (!cached) {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      // Buffering means mongoose will queue up operations if it gets
      // disconnected from MongoDB and send them when it reconnects.
      // With serverless, better to fail fast if not connected.
      bufferCommands: false, // Disable mongoose buffering
      bufferMaxEntries: 0 // and MongoDB driver buffering
    })
  }
  cached = true
}
