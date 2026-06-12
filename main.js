/* ============================================================
   AI Supply Chains — site logic
   Hash-based tab navigation + data-driven panelist / lit lists.
   ============================================================ */

/* ---------- Data ---------- */

const PANELISTS = [
  // Panel 1 — Power, Regulation, & Law in AI Supply Chains
  {
    panel: 1,
    name: "Blair Attard-Frost",
    url: "https://www.blairaf.com/",
    blurb: "AI governance, policy, and value chains.",
    confirmed: true,
  },
  {
    panel: 1,
    name: "Jennifer Cobbe",
    url: "https://www.jennifercobbe.com/",
    blurb: "Law and accountability in algorithmic supply chains.",
    confirmed: false,
  },
  {
    panel: 1,
    name: "Anjali Mazumder",
    url: "https://www.turing.ac.uk/people/researchers/anjali-mazumder",
    blurb: "AI and justice, human rights, and public policy.",
    confirmed: false,
  },
  // Panel 2 — Challenges in Studying, Building, and Tooling AI Supply Chains
  {
    panel: 2,
    name: "Stephen Casper",
    url: "https://stephencasper.com/",
    blurb: "Open models in AI supply chains; AI safety.",
    confirmed: true,
  },
  {
    panel: 2,
    name: "Karrie Karahalios",
    url: "https://www.karriekarahalios.com/",
    blurb:
      "Cross-organizational deployment; building and studying how people build AI systems in many settings.",
    confirmed: true,
  },
  {
    panel: 2,
    name: "Luis Oala",
    url: "https://luisoala.net/",
    blurb:
      "Industry perspective; focus on agents and composing datasets across AI supply chains.",
    confirmed: true,
  },
];

const LITERATURE = [
  {
    authors: "Cen, Hopkins, Ilyas, Madry, Struckman & Videgaray",
    year: 2023,
    title: "AI supply chains (and why they matter)",
    venue: "On AI Deployment",
    url: "https://aipolicy.substack.com/p/supply-chains-2",
    summary:
      "An accessible introduction to AI supply chains and the reasons they deserve attention from researchers and policymakers.",
  },
  {
    authors: "Cobbe, Veale & Singh",
    year: 2023,
    title: "Understanding accountability in algorithmic supply chains",
    venue: "ACM FAccT 2023",
    url: "https://dl.acm.org/doi/10.1145/3593013.3594073",
    summary:
      "Examines how accountability is distributed — and obscured — across the many actors involved in algorithmic supply chains.",
  },
  {
    authors: "Hopkins, Cen, Struckman, Ilyas, Videgaray & Madry",
    year: 2025,
    title: "AI supply chains: An emerging ecosystem of AI actors, products, and services",
    venue: "AAAI/ACM AIES, Vol. 8, 1266–1277",
    url: "https://ojs.aaai.org/index.php/AIES/article/view/36637",
    summary:
      "Formal modeling and empirical evaluation of AI supply chains as an emerging ecosystem.",
  },
  {
    authors: "Hopkins, Struckman, Driss & Madry",
    year: 2026,
    title: "When should model updates be adopted?",
    venue: "Working paper",
    url: null,
    summary:
      "Studies the downstream consequences of upstream model updates and when adopters should incorporate them.",
  },
  {
    authors: "Hopkins, Struckman, Klyman & Silbey",
    year: 2025,
    title: "Recourse, repair, reparation, & prevention: A stakeholder analysis of AI supply chains",
    venue: "ACM FAccT 2025, 209–227",
    url: "https://dl.acm.org/doi/10.1145/3715275.3732033",
    summary:
      "A stakeholder analysis of power asymmetries and sources of harm across AI supply chains.",
  },
  {
    authors: "Neumann & Singh",
    year: 2026,
    title: "AI safety evaluations need to consider cascading effects",
    venue: "arXiv preprint",
    url: "https://arxiv.org",
    summary:
      "Argues that safety evaluations must account for cascading failures across composed AI systems.",
  },
  {
    authors: "Singh, Cobbe & Norval",
    year: 2019,
    title: "Decision provenance: Harnessing data flow for accountable systems",
    venue: "IEEE Access 7, 6562–6574",
    url: "https://doi.org/10.1109/ACCESS.2018.2887201",
    summary:
      "Proposes tracking data flows ('decision provenance') as a mechanism for accountability in interconnected systems.",
  },
  {
    authors: "Singh, Powles, Pasquier & Bacon",
    year: 2015,
    title: "Seeing through the clouds: Data flow management and compliance in cloud computing",
    venue: "IEEE Cloud Computing 2(4), 24–32",
    url: "https://doi.org/10.1109/MCC.2015.69",
    summary:
      "Early work on managing data flows and compliance across cloud service chains.",
  },
  {
    authors: "Widder & Nafus",
    year: 2023,
    title: "Dislocated accountabilities in the “AI supply chain”: Modularity and developers' notions of responsibility",
    venue: "Big Data & Society 10(1)",
    url: "https://doi.org/10.1177/20539517231177620",
    summary:
      "Shows how modularity in AI development dislocates developers' sense of responsibility along the supply chain.",
  },
  {
    authors: "Widder, Nafus, Dabbish & Herbsleb",
    year: 2022,
    title: "Limits and possibilities for “ethical AI” in open source: A study of deepfakes",
    venue: "ACM FAccT 2022, 2035–2046",
    url: "https://doi.org/10.1145/3531146.3533779",
    summary:
      "Examines what open-source norms can — and cannot — do for ethics in AI supply chains, through the case of deepfakes.",
  },
  {
    authors: "Widder, Whittaker & West",
    year: 2024,
    title: "Why 'open' AI systems are actually closed, and why this matters",
    venue: "Nature 635, 827–833",
    url: "https://doi.org/10.1038/s41586-024-08141-1",
    summary:
      "Argues that 'openness' in AI rarely redistributes power, given concentration elsewhere in the supply chain.",
  },
];

/* ---------- Tab navigation (hash-based) ---------- */

const TABS = ["home", "tutorial"];

function showTab(name) {
  if (!TABS.includes(name)) name = "home";
  TABS.forEach((tab) => {
    const panel = document.getElementById("tab-" + tab);
    if (panel) panel.hidden = tab !== name;
  });
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.nav === name);
  });
  window.scrollTo(0, 0);
}

function currentTabFromHash() {
  return window.location.hash.replace("#", "") || "home";
}

window.addEventListener("hashchange", () => showTab(currentTabFromHash()));

/* ---------- Rendering ---------- */

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function renderVideos() {
  const row = document.getElementById("video-row");
  if (!row) return;
  PANELISTS.forEach((p) => {
    const card = el("div", "video-card");
    const thumb = el("div", "video-thumb", "Coming soon");
    const caption = el("div", "video-caption");
    caption.appendChild(el("strong", null, p.name));
    caption.appendChild(el("span", null, "Panel " + p.panel));
    card.appendChild(thumb);
    card.appendChild(caption);
    row.appendChild(card);
  });
}

function renderPanelists() {
  document.querySelectorAll(".panelist-list").forEach((list) => {
    const panel = Number(list.dataset.panel);
    PANELISTS.filter((p) => p.panel === panel).forEach((p) => {
      const item = el("li");
      const name = el("a", "panelist-name", p.name);
      name.href = p.url;
      name.target = "_blank";
      name.rel = "noopener";
      item.appendChild(name);
      if (!p.confirmed) item.appendChild(el("span", "panelist-tbd", "TBD"));
      item.appendChild(el("span", "panelist-blurb", p.blurb));
      list.appendChild(item);
    });
  });
}

function renderLiterature() {
  const list = document.getElementById("lit-list");
  if (!list) return;
  LITERATURE.forEach((entry) => {
    const item = el("li");

    let titleNode;
    if (entry.url) {
      titleNode = el("a", "lit-entry-title", entry.title);
      titleNode.href = entry.url;
      titleNode.target = "_blank";
      titleNode.rel = "noopener";
    } else {
      titleNode = el("span", "lit-entry-title", entry.title);
    }
    item.appendChild(titleNode);

    item.appendChild(
      el("span", "lit-entry-meta", " — " + entry.authors + " (" + entry.year + "), " + entry.venue + ".")
    );
    item.appendChild(el("span", "lit-entry-summary", entry.summary));
    list.appendChild(item);
  });
}

/* ---------- Init ---------- */

document.addEventListener("DOMContentLoaded", () => {
  renderVideos();
  renderPanelists();
  renderLiterature();
  showTab(currentTabFromHash());
});
