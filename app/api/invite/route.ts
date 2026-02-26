import { promises as fs } from "fs"
import path from "path"
import { NextResponse } from "next/server"

export const runtime = "nodejs"

const inviteFilePath = path.join(process.cwd(), "data", "invites.json")
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type InviteRecord = {
  email: string
  createdAt: string
}

const readInvites = async () => {
  try {
    const data = await fs.readFile(inviteFilePath, "utf8")
    const parsed = JSON.parse(data)
    return Array.isArray(parsed) ? (parsed as InviteRecord[]) : []
  } catch {
    return []
  }
}

const writeInvites = async (invites: InviteRecord[]) => {
  await fs.mkdir(path.dirname(inviteFilePath), { recursive: true })
  await fs.writeFile(inviteFilePath, JSON.stringify(invites, null, 2), "utf8")
}

export async function POST(request: Request) {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  const email =
    typeof (payload as { email?: unknown }).email === "string"
      ? (payload as { email: string }).email.trim().toLowerCase()
      : ""

  if (!email || !emailPattern.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 })
  }

  const invites = await readInvites()
  const exists = invites.some((invite) => invite.email === email)

  if (!exists) {
    invites.push({ email, createdAt: new Date().toISOString() })
    await writeInvites(invites)
  }

  return NextResponse.json({ status: "ok", alreadyInvited: exists })
}
