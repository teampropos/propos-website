import { promises as fs } from "fs";
import path from "path";

const FILE_PATH = path.join(process.cwd(), "waitlist.json");

async function loadWaitlist(): Promise<string[]> {
  try {
    const data = await fs.readFile(FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveWaitlist(emails: string[]): Promise<void> {
  await fs.writeFile(FILE_PATH, JSON.stringify(emails, null, 2));
}

export async function POST(request: Request) {
  const body = await request.json();
  const email = body.email?.trim()?.toLowerCase();

  if (!email || !email.includes("@")) {
    return Response.json({ error: "Invalid email" }, { status: 400 });
  }

  const waitlist = await loadWaitlist();

  if (waitlist.includes(email)) {
    return Response.json({ message: "Already on the list" });
  }

  waitlist.push(email);
  await saveWaitlist(waitlist);

  return Response.json({ message: "Added to waitlist" });
}
