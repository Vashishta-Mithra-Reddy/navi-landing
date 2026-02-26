import { NextResponse } from "next/server"

export const runtime = "edge"

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyWr-eQVlkpWt1yaeqCuy6nvtJCO9eT3cZRqhissW8mbmCazmKsCt2oG6ydZfTeCqAu/exec"
const API_SECRET = process.env.INVITE_API_KEY
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  if (!API_SECRET) {
    console.error("Missing INVITE_API_KEY environment variable")
    return NextResponse.json({ error: "Server configuration error." }, { status: 500 })
  }

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

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      redirect: "follow", // CRITICAL: Google Apps Script uses a 302 redirect to serve the actual response
      headers: {
        // CRITICAL: Bypasses the preflight CORS check that triggers the HTML error
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        mail: email,
        secret: API_SECRET
      }),
    })

    // Safety net: Check if Google still returned an HTML error page (usually means bad deployment URL or permissions)
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("text/html")) {
      const htmlErrorText = await response.text();
      console.error("Google Script returned HTML instead of JSON. Check your Web App deployment URL and ensure access is set to 'Anyone'.", htmlErrorText.substring(0, 100));
      return NextResponse.json({ error: "Upstream Google Script configuration error." }, { status: 502 })
    }

    const data = await response.json()

    if (data.status === "error") {
      console.error("Error from Google Script:", data.message)
      return NextResponse.json({ error: "Failed to save invite." }, { status: 500 })
    }

    return NextResponse.json({ status: "ok" })
    
  } catch (error) {
    console.error("Invite submission error:", error)
    return NextResponse.json({ error: "Something went wrong while contacting the server." }, { status: 500 })
  }
}