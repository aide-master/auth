import * as mongoose from 'mongoose'

let conn: mongoose.Connection | null = null

const { dbHost, dbUser, dbPassword } = process.env

const uri = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/test?retryWrites=true&w=majority`

export async function init () {
  if (conn == null) {
    conn = await mongoose.createConnection(uri, {
      // Buffering means mongoose will queue up operations if it gets
      // disconnected from MongoDB and send them when it reconnects.
      // With serverless, better to fail fast if not connected.
      bufferCommands: false, // Disable mongoose buffering
      bufferMaxEntries: 0 // and MongoDB driver buffering
    })
  }
}

export async function getConnection (): Promise<mongoose.Connection> {
  await init()
  return conn!
}
