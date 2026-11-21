import type { Metadata } from "next";
import CopyButton from "@/components/CopyButton";
import "./guide.css";

export const metadata: Metadata = {
  title: "Turn Your BOQ Into a Ready RFQ | BuildMatch",
  description: "Four prompts and a checklist to turn your BOQ or drawing schedules into clean, comparable RFQs in 5 minutes.",
};

const steps = [
  {
    title: "Sort your BOQ into supplier packages",
    why: "Each supplier only sees the items they actually supply.",
    prompt:
      "Here is my Bill of Quantities (or the material schedules from my drawings) for [project name]. Group every line item into supplier packages (for example: steel, concrete, MEP, finishes, specialised equipment). Show it as a table with these columns: Package, Item, Description, Unit, Quantity. Don't change any quantities.\n\n[paste BOQ]",
  },
  {
    title: "Find gaps before suppliers do",
    why: "Missing specs lead to vague quotes and back-and-forth emails.",
    prompt:
      "Look at the table above. List every item that is missing a specification, brand or standard, unit, quantity, or delivery need. For each one, write the question I should answer before I send it out for pricing.",
  },
  {
    title: "Write the RFQ for one package",
    why: "Repeat this for each package from step 1.",
    prompt:
      "Write a short, professional Request for Quotation for the [package name] package. Include: project name [ ], site location [ ], the item table, a quote deadline of [date], a delivery window of [dates], payment terms [ ], and a request for unit prices, lead times, validity period and any exclusions. Keep it to one page.",
  },
  {
    title: "Get replies you can compare",
    why: "Set up the comparison before quotes arrive, not after.",
    prompt:
      "Make a quote comparison table for [package name] with these columns: Supplier, Unit Price per item, Total, Lead Time, Validity, Exclusions, Notes. Leave it blank so I can fill it in as quotes arrive.",
  },
];

const checks = [
  "Every item has a unit and a quantity",
  "Specs or standards are named, not left as \"or equal\"",
  "The deadline and delivery dates are clear",
  "You asked for lead time and exclusions",
  "The same RFQ goes to every supplier, so quotes are comparable",
];

function Highlight({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\[[^\]]*\])/g).map((part, i) =>
        part.startsWith("[") ? <span key={i} className="g-fill">{part}</span> : part,
      )}
    </>
  );
}

export default function Guide() {
  return (
    <div className="g-page">
      <a className="g-back" href="/">← BuildMatch</a>
      <main className="g-sheet">
        <header>
          <p className="kicker g-eyebrow">Prompt pack · Contractors · 5 minutes</p>
          <h1 className="g-title">Turn Your <span className="g-hl">BOQ</span> Into a Ready RFQ</h1>
          <p className="g-lede">Four prompts you can paste into any AI chat tool to turn your Bill of Quantities into clean, comparable requests for quotation.</p>
        </header>

        <dl className="g-need">
          <dt>You need</dt>
          <dd>Your BOQ, or the material schedules from your drawings (Excel, PDF or copied text), the project name, your quote deadline, and any AI chat tool.</dd>
        </dl>

        <ol className="g-steps">
          {steps.map((s) => (
            <li key={s.title} className="g-step">
              <div>
                <h2>{s.title}</h2>
                <p className="g-why">{s.why}</p>
                <div className="g-prompt">
                  <CopyButton text={s.prompt} />
                  <pre><Highlight text={s.prompt} /></pre>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <section className="g-checks">
          <h2>Check before you hit send</h2>
          <ul>
            {checks.map((c, i) => (
              <li key={c}>
                <label className="g-check">
                  <input type="checkbox" id={`c${i}`} />
                  <span>{c}</span>
                </label>
              </li>
            ))}
          </ul>
        </section>

        <p className="g-offer">
          Want this done straight from your drawings and BOQ, sent to matched suppliers, with quotes coming back side by side?{" "}
          <a href="/#start">That&apos;s what BuildMatch does: start free today.</a>
        </p>
      </main>
    </div>
  );
}
