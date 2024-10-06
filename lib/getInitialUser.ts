import { currentUser } from "@clerk/nextjs/server"
import { sql } from "@vercel/postgres"
import { redirect } from "next/navigation"

export const getInitialUser = async () => {
  const user = await currentUser()
  if (!user) return redirect("/sign-in")
  
  const dbUser = await sql`SELECT * FROM USERS WHERE clerkId = ${user.id}`

  if (dbUser.rows.length > 0) return dbUser.rows[0];

  const fullname = user.firstName + " " + user.lastName ?? " ";
  const email = user.emailAddresses[0].emailAddress
  const clerkId = user.id

  const {rows} = await sql`INSERT INTO USERS (clerkId, fullname, email) VALUES (${clerkId}, ${fullname}, ${email}) RETURNING *`
  return rows[0];

}