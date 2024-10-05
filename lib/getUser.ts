import { sql } from "@vercel/postgres"

export const getUserByEmail = async (email: string) => {
  try {
    const res = await sql`SELECT FROM users WHERE email = ${email}`
    if (res?.rows?.length < 0) return 0;
    return res.rows[0];    
  } catch  {
    return null
  }
}

export const getUserById = async (id: string) => {
  try {
    const res = await sql`SELECT FROM users WHERE id = ${id}`
    if (res?.rows?.length < 0) return 0;
    return res.rows[0];    
  } catch  {
    return null
  }
}