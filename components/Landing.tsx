"use client";

import { useRef, useState } from "react";
import { content, sharedFaq, urgency, type Role } from "@/lib/content";
import SignupForm from "./SignupForm";

const ROLES: Role[] = ["contractor", "supplier"];

export default function Landing() {
  const [role, setRole] = useState<Role | null>(null);
  const pickRef = useRef<HTMLElement>(null);

  function choose(r: Role, scroll = false) {
    setRole(r);
    if (scroll) requestAnimationFrame(() => pickRef.current?.scrollIntoView());
  }

  const c = role ? content[role] : null;

  return (
    <>
      <header className="bar">
        <div className="wrap">
          <a className="logo" href="/">Build<span>Match</span></a>
        </div>
      </header>

      <section className="hero">
        <div className="half c">
          <p className="kicker">For contractors</p>
          <h1>{content.contractor.heroTag}</h1>
          <p className="line">{content.contractor.heroLine}</p>
          <button className="btn accent" onClick={() => choose("contractor", true)}>I&apos;m a contractor</button>
        </div>
        <div className="half s">
          <p className="kicker">For suppliers</p>
          <h1>{content.supplier.heroTag}</h1>
          <p className="line">{content.supplier.heroLine}</p>
          <button className="btn primary" onClick={() => choose("supplier", true)}>I&apos;m a supplier</button>
        </div>
        <p className="hero-theme">AI turns your drawings and BOQ into ready-to-send RFQs</p>
      </section>

      <main className="wrap">
        <section className="pick" ref={pickRef} id="start">
          <h2>Which one are you?</h2>
          <div className="roles" role="radiogroup" aria-label="I am a">
            {ROLES.map((r) => (
              <button key={r} type="button" role="radio" aria-checked={role === r} className="role" onClick={() => choose(r)}>
                <b>{content[r].label}</b>
                <span>{content[r].pickLine}</span>
              </button>
            ))}
          </div>
          {!role && <p className="pick-hint">Pick one to see what BuildMatch does for you.</p>}
        </section>

        {c && role && (
          <section className="rc" key={role}>
            <div className="rc-head">
              <h2>{c.headline}</h2>
              <p>{c.subhead}</p>
            </div>

            <div className="magnet">
              <div className="magnet-l">
                <p className="kicker">{c.magnetKicker}</p>
                <h3>{c.magnetTitle}</h3>
                <p>{c.magnetText}</p>
              </div>
              <div className="magnet-r">
                <SignupForm role={role} cta={c.cta} />
              </div>
            </div>

            <div className="proof">
              {c.proof.map((p) => (
                <div key={p.title}>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              ))}
            </div>

            <ol className="steps">
              {c.steps.map((s) => <li key={s}>{s}</li>)}
            </ol>

            <div className="price">
              <div className="p"><h3>Price</h3><p>{c.price}</p></div>
              <div className="u"><h3>Why now</h3><p>{urgency}</p></div>
            </div>

            <div className="faq">
              <h2>Questions</h2>
              {[...c.faq, ...sharedFaq].map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="foot">
        <div className="wrap">
          <span>BuildMatch connects contractors and suppliers.</span>
          <a href="/guide">Free guide: BOQ to RFQ</a>
        </div>
      </footer>
    </>
  );
}
