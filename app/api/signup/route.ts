import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { buildEmails } from "@/lib/emails";
import type { Role } from "@/lib/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ROLES: Role[] = ["contractor", "supplier"];

function env(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing environment variable ${name}`);
  return v;
}

export async function POST(req: Request) {
  let body: { email?: unknown; role?: unknown; company?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  // Honeypot: real people never fill the hidden "company" field. Pretend it worked.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const role = ROLES.includes(body.role as Role) ? (body.role as Role) : null;
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }
  if (!role) {
    return NextResponse.json({ error: "Please pick contractor or supplier." }, { status: 400 });
  }

  // 1) Save the lead. This is the only step that can fail the sign-up.
  let isNew = true;
  try {
    const supabase = createClient(env("SUPABASE_URL"), env("SUPABASE_SECRET_KEY"), {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { error } = await supabase.from("leads").insert({ email, role });
    if (error) {
      if (error.code === "23505") isNew = false; // already signed up
      else throw error;
    }
  } catch (err) {
    console.error("signup: could not save lead", err);
    return NextResponse.json({ error: "We couldn't save your sign-up. Please try again." }, { status: 500 });
  }

  // 2) Send emails. Failures are logged and never undo the sign-up.
  if (isNew) {
    try {
      const resend = new Resend(env("RESEND_API_KEY"));
      const from = process.env.EMAIL_FROM || "BuildMatch <onboarding@resend.dev>";
      const siteUrl = (process.env.SITE_URL || new URL(req.url).origin).replace(/\/+$/, "");
      const now = Date.now();

      for (const mail of buildEmails(role, siteUrl)) {
        try {
          const { error } = await resend.emails.send({
            from,
            to: email,
            subject: mail.subject,
            text: mail.text,
            html: mail.html,
            ...(mail.delayMinutes > 0
              ? { scheduledAt: new Date(now + mail.delayMinutes * 60_000).toISOString() }
              : {}),
          });
          if (error) console.error(`signup: email "${mail.subject}" failed`, error);
        } catch (err) {
          console.error(`signup: email "${mail.subject}" failed`, err);
        }
      }
    } catch (err) {
      console.error("signup: email setup failed", err);
    }
  }

  return NextResponse.json({ ok: true });
}
