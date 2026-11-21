export type Role = "contractor" | "supplier";

type Faq = { q: string; a: string };

type RoleContent = {
  label: string;
  pickLine: string;
  heroTag: string;
  heroLine: string;
  headline: string;
  subhead: string;
  magnetKicker: string;
  magnetTitle: string;
  magnetText: string;
  cta: string;
  proof: { title: string; text: string }[];
  steps: string[];
  price: string;
  faq: Faq[];
};

export const content: Record<Role, RoleContent> = {
  contractor: {
    label: "Contractor",
    pickLine: "I buy materials and equipment for projects.",
    heroTag: "We'll be your procurement team.",
    heroLine: "AI turns your drawings and BOQ into ready-to-send RFQs.",
    headline: "Your drawings in. Ready RFQs out.",
    subhead:
      "Upload drawings or a BOQ. BuildMatch writes the RFQs, sends them to matched suppliers and lines up the quotes for you.",
    magnetKicker: "Main tool",
    magnetTitle: "Drawings / BOQ to RFQ",
    magnetText:
      "Get early access to the tool, plus our free guide right now: turn your BOQ into a clean RFQ in 5 minutes.",
    cta: "Get the free guide",
    proof: [
      { title: "Drawings or BOQ in", text: "Upload PDF, DWG or XLSX. The RFQ is written for you." },
      { title: "Only matched suppliers", text: "Your RFQ goes to suppliers who stock those items." },
      { title: "Quotes side by side", text: "Best price highlighted. Shortlist, compare, hire." },
    ],
    steps: [
      "Upload your drawings or BOQ",
      "Check the RFQ and publish",
      "Matched suppliers send quotes",
      "Compare side by side and hire",
    ],
    price: "Free to join and post RFQs. You pay only when you use the Drawings / BOQ to RFQ tool.",
    faq: [
      {
        q: "As a contractor, do I pay to post RFQs?",
        a: "No. Joining, posting RFQs, receiving quotes and comparing them are all free.",
      },
      {
        q: "Is there a charge for the Drawings / BOQ to RFQ tool?",
        a: "Yes. It's the one paid part for contractors. You pay when you use it to turn drawings or a BOQ into RFQs. Typing an RFQ yourself stays free.",
      },
      {
        q: "Will suppliers see my company name?",
        a: "No. Suppliers see an alias like Contractor #C-4821. Your name and email are shown only to the supplier you hire.",
      },
      {
        q: "What files can I upload?",
        a: "PDF, DWG and XLSX files, up to 25 MB each.",
      },
      {
        q: "Who receives my RFQ?",
        a: "Only suppliers whose products match your items, by category and item.",
      },
    ],
  },
  supplier: {
    label: "Supplier",
    pickLine: "I sell materials or specialised equipment.",
    heroTag: "We'll be your sales team.",
    heroLine: "Real RFQs from contractors who need what you stock.",
    headline: "RFQs that match what you stock.",
    subhead:
      "List your products once. BuildMatch sends you RFQs from contractors who need them, and you reply with a quote in minutes.",
    magnetKicker: "Main offer",
    magnetTitle: "Qualified leads, guaranteed",
    magnetText:
      "At least 10 qualified leads, or you don't pay. Join the list to get started, plus our free guide on how contractors build RFQs.",
    cta: "Get qualified leads",
    proof: [
      { title: "Only matching RFQs", text: "You see RFQs for items in your product list. No cold leads." },
      { title: "10 leads or no charge", text: "If we don't deliver the minimum, you don't pay." },
      { title: "Win on price and service", text: "Both sides stay anonymous until the contractor hires." },
    ],
    steps: [
      "List your products and categories",
      "Get matched RFQs",
      "Send your quote (BOQ)",
      "Get hired and see the contractor",
    ],
    price: "Monthly subscription with a minimum of 10 qualified leads. Fewer than that, no charge.",
    faq: [
      {
        q: "Will I pay if I don't get leads?",
        a: "No. We guarantee a minimum of 10 qualified leads. If you get fewer, there's no charge.",
      },
      {
        q: "What counts as a qualified lead?",
        a: "A published RFQ from a contractor that matches a product you list, by category and item.",
      },
      {
        q: "Can I see who the contractor is?",
        a: "Not at first. You see an alias. When the contractor hires you, both sides see each other's company name and email.",
      },
      {
        q: "How do I reply to an RFQ?",
        a: "Send a quote inside BuildMatch: pick your product for each line, then add unit price, availability and delivery date.",
      },
      {
        q: "Can I see if my quote was viewed?",
        a: "Yes. Each quote shows its status: Sent, Viewed, Shortlisted, Accepted or Rejected.",
      },
    ],
  },
};

export const sharedFaq: Faq[] = [
  {
    q: "What happens after I sign up?",
    a: "You get the free guide straight away by email and on screen, then two short emails with tips.",
  },
  {
    q: "Do you share my email?",
    a: "No. We use it only to send you the guide and BuildMatch updates.",
  },
];

export const urgency =
  "Top contractors and suppliers, including your competitors, are already on board. Every week you wait, they get the RFQs and quotes first.";
