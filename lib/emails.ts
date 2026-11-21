import type { Role } from "./content";

export type Email = { subject: string; text: string; html: string; delayMinutes: number };

const shell = (body: string) =>
  `<div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.55;color:#0f172a;max-width:560px">${body}<p style="color:#64748b;font-size:13px;margin-top:28px">BuildMatch connects contractors and suppliers.</p></div>`;

const button = (href: string, label: string) =>
  `<p><a href="${href}" style="display:inline-block;background:#f5a11c;color:#0b2542;font-weight:bold;text-decoration:none;padding:12px 20px;border-radius:6px">${label}</a></p>`;

/** The three emails, in order. Delays are minutes after sign-up. */
export function buildEmails(role: Role, siteUrl: string): Email[] {
  const guide = `${siteUrl}/guide`;
  const start = `${siteUrl}/#start`;
  const contractor = role === "contractor";

  const welcome: Email = {
    delayMinutes: 0,
    subject: "Your free guide: turn your BOQ into a ready RFQ",
    text: [
      "Thanks for joining BuildMatch.",
      "",
      `Here is your free guide: ${guide}`,
      "",
      "It has four prompts you can paste into any AI chat tool, plus a short checklist. It takes about 5 minutes.",
      contractor
        ? "Use it on your next BOQ or drawing schedule."
        : "It shows how contractors build the RFQs you will receive, so you can see what they ask for.",
    ].join("\n"),
    html: shell(
      `<p>Thanks for joining BuildMatch.</p>
       <p>Here is your free guide. It has four prompts you can paste into any AI chat tool, plus a short checklist. It takes about 5 minutes.</p>
       ${button(guide, "Open the free guide")}
       <p>${contractor ? "Use it on your next BOQ or drawing schedule." : "It shows how contractors build the RFQs you will receive, so you can see what they ask for."}</p>`,
    ),
  };

  const tip: Email = contractor
    ? {
        delayMinutes: 2,
        subject: "The step most RFQs skip",
        text: [
          "Quick tip from the guide.",
          "",
          "Before you send an RFQ, look for items with no spec, no standard, no unit or no quantity. Each gap turns into a vague quote or an extra email.",
          "",
          `Step 2 of the guide finds these gaps for you: ${guide}`,
        ].join("\n"),
        html: shell(
          `<p>Quick tip from the guide.</p>
           <p>Before you send an RFQ, look for items with no spec, no standard, no unit or no quantity. Each gap turns into a vague quote or an extra email.</p>
           <p>Step 2 of the guide finds these gaps for you.</p>
           ${button(guide, "Open step 2")}`,
        ),
      }
    : {
        delayMinutes: 2,
        subject: "How BuildMatch picks your leads",
        text: [
          "Quick note on how matching works.",
          "",
          "When a contractor publishes an RFQ, BuildMatch compares each line to the products suppliers list, by category and item. You only see RFQs that match what you stock.",
          "",
          "So the clearer your product list, the better your matches. Name the item the way a contractor would write it on a BOQ.",
        ].join("\n"),
        html: shell(
          `<p>Quick note on how matching works.</p>
           <p>When a contractor publishes an RFQ, BuildMatch compares each line to the products suppliers list, by category and item. You only see RFQs that match what you stock.</p>
           <p>So the clearer your product list, the better your matches. Name the item the way a contractor would write it on a BOQ.</p>`,
        ),
      };

  const offer: Email = contractor
    ? {
        delayMinutes: 4,
        subject: "Skip the prompts: drawings and BOQ straight to RFQ",
        text: [
          "The guide does one package at a time, by hand.",
          "",
          "BuildMatch does it from your drawings or BOQ: it writes the RFQs, sends them to matched suppliers, and lines up the quotes side by side with the best price highlighted. Suppliers don't see your name until you hire.",
          "",
          "Joining and posting RFQs is free. You pay only when you use the Drawings / BOQ to RFQ tool.",
          "",
          `Start free: ${start}`,
        ].join("\n"),
        html: shell(
          `<p>The guide does one package at a time, by hand.</p>
           <p>BuildMatch does it from your drawings or BOQ: it writes the RFQs, sends them to matched suppliers, and lines up the quotes side by side with the best price highlighted. Suppliers don't see your name until you hire.</p>
           <p>Joining and posting RFQs is free. You pay only when you use the Drawings / BOQ to RFQ tool.</p>
           ${button(start, "Start free")}`,
        ),
      }
    : {
        delayMinutes: 4,
        subject: "At least 10 qualified leads, or you don't pay",
        text: [
          "BuildMatch works like a sales team for suppliers.",
          "",
          "You list your products once. We send you RFQs from contractors who need them. You reply with a quote inside BuildMatch, and you see the contractor's name when they hire you.",
          "",
          "It's a monthly subscription with a minimum of 10 qualified leads. Fewer than that, no charge.",
          "",
          `Get started: ${start}`,
        ].join("\n"),
        html: shell(
          `<p>BuildMatch works like a sales team for suppliers.</p>
           <p>You list your products once. We send you RFQs from contractors who need them. You reply with a quote inside BuildMatch, and you see the contractor's name when they hire you.</p>
           <p>It's a monthly subscription with a minimum of 10 qualified leads. Fewer than that, no charge.</p>
           ${button(start, "Get started")}`,
        ),
      };

  return [welcome, tip, offer];
}
