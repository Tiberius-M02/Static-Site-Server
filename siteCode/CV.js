(function(){
  "use strict";

  const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const ICONS = {
    mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
    phone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L15 12l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2z"/></svg>',
    pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.4"/></svg>',
    link:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 15L15 9"/><path d="M11 6l1-1a4 4 0 0 1 6 6l-1 1"/><path d="M13 18l-1 1a4 4 0 0 1-6-6l1-1"/></svg>',
    camera:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7l1.5-3h5L16 7"/><circle cx="12" cy="13.5" r="3.4"/></svg>',
    download:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3v13"/><path d="M7 11l5 5 5-5"/><path d="M5 20h14"/></svg>'
  };

  const SECTIONS = [
    {id:"despre", num:"01", label:"Despre mine"},
    {id:"experienta", num:"02", label:"Experiență"},
    {id:"educatie", num:"03", label:"Educație"},
    {id:"competente", num:"04", label:"Competențe"},
    {id:"proiecte", num:"05", label:"Proiecte"},
    {id:"limbi", num:"06", label:"Limbi străine"},
    {id:"hobbies", num:"07", label:"Hobby-uri"}
  ];

  /* ---------------------------------------------------------------
     Editează valorile de mai jos direct în cod — acesta e singurul
     loc din care se modifică acum conținutul CV-ului.
  ----------------------------------------------------------------*/
  const state = {
    name: "Morar Tiberius",
    title: "Student UTCN AC",
    tagline: "O propoziție scurtă despre cine ești și ce te definește profesional.",
    photo: "img.jpg",
    contact: {
      email: "tibimorar06@gmail.com",
      phone: "+40 747382002",
      location: "Bistrița, România",
      linkedin: "linkedin.com/in/tiberius-morar-074891366/",
      github: "github.com/Tiberius-M02"
    },
    about: "I am a student of Automation and Applied Informatics with a passion for embedded systems, IoT, and hardware development. I have practical experience in C/C++ programming and working with microcontrollers. I am a team-oriented individual, motivated to contribute efficient technical solutions to practical projects.",
    experience: [
      {role:"Analyst Assistant", company:"Rombat Technology Research and Innovation Department ", period:"27.06.2022 - 22.07.2022", location:"Oraș",
        bullets:["Development of embedded systems for production line optimization, Efficient handling of industrial lasers"]}
    ],
    education: [
      {degree:"Titlul diplomei / specializarea", school:"Numele universității", period:"2019 — 2023",
        details:"Detalii suplimentare — mențiuni, lucrare de licență etc. (opțional)"}
    ],
    skills: [
      {category:"HARDWARE/EMBEDDED:", items:"Arduino, ESP32, 3D Modeling, Soldering"},
      {category:"Programming languages:", items:"C, C++, C#, Bash, Java"},
      {category:"Software & tools:", items:"Git/GitHub, Linux, VSCode, Vim"}
    ],
    projects: [
      {name:"Solar inteligent", description:"Va urma", link:"https://github.com/Tiberius-M02/Smart-Solar", tags:"ESP32, ArduinoCloud"}
    ],
    languages: [
      {name:"Română", level:"Nativ"},
      {name:"Engleză", level:"B2"},
      {name:"Franceză", level:"A1"},
      {name:"Germană", level:"A1"},
    ],
    hobbies: "Tennis, Reading, Movies, Mountain hiking"
  };

  let navObserver = null;
  const app = document.getElementById("app");

  function escapeHtml(str){
    return String(str ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  }
  function ro(txt){ return escapeHtml(txt); }

  /* ---------------- templates ---------------- */

  function tField(opts){
    const {value, cls, placeholder} = opts;
    return `<input type="text" class="field ${cls}" value="${ro(value)}" readonly placeholder="${ro(placeholder||"")}">`;
  }

  function tTextarea(opts){
    const {value, cls, placeholder} = opts;
    return `<textarea class="field ${cls}" readonly placeholder="${ro(placeholder||"")}">${ro(value)}</textarea>`;
  }

  function renderRail(){
    const photoBlock = state.photo
      ? `<img class="photo" src="${state.photo}" alt="Fotografie profil">`
      : `<div class="photo-empty">${ICONS.camera}</div>`;

    const contactFields = [
      {key:"email", icon:ICONS.mail, href: v => "mailto:"+v},
      {key:"phone", icon:ICONS.phone, href: v => "tel:"+v.replace(/\s+/g,"")},
      {key:"location", icon:ICONS.pin, href: null},
      {key:"linkedin", icon:ICONS.link, href: v => v.startsWith("http") ? v : "https://"+v},
      {key:"github", icon:ICONS.link, href: v => v.startsWith("http") ? v : "https://"+v}
    ];

    const contactRows = contactFields.map(cf => {
      const val = state.contact[cf.key] || "";
      if(!val) return "";
      const inner = cf.href ? `<a href="${ro(cf.href(val))}" target="_blank" rel="noopener noreferrer">${ro(val)}</a>` : `<span>${ro(val)}</span>`;
      return `<div class="contact-row">${cf.icon}${inner}</div>`;
    }).join("");

    const navTabs = SECTIONS.map((s,i) =>
      `<button type="button" class="nav__tab" data-action="nav" data-target="${s.id}" data-index="${i}">
        <span class="nav__num">${s.num}</span><span class="nav__label">${s.label}</span>
      </button>`).join("");

    return `
      <aside class="rail">
        <div class="photo-block">${photoBlock}</div>

        <div class="id-block">
          ${tField({value:state.name, cls:"field--h1", placeholder:"Numele tău"})}
          ${tField({value:state.title, cls:"field--jobtitle", placeholder:"Titlul profesional"})}
          ${tTextarea({value:state.tagline, cls:"field--tagline", placeholder:"O propoziție despre tine"})}
        </div>

        <div class="contact-list">${contactRows}</div>

        <div class="rail-spacer"></div>

        <nav class="nav" aria-label="Secțiuni CV">
          <div class="nav__indicator"></div>
          ${navTabs}
        </nav>

        <div class="rail-foot">
          <button type="button" class="icon-btn" data-action="print" aria-label="Descarcă / printează CV-ul" title="Descarcă / printează">${ICONS.download}</button>
        </div>
      </aside>`;
  }

  function sectionHead(num, label){
    return `<div class="section__head"><span class="section__num">${num}</span><h2 class="section__title">${label}</h2><div class="section__rule"></div></div>`;
  }

  function renderDespre(){
    return `
      <section class="section" id="despre">
        ${sectionHead("01","Despre mine")}
        ${tTextarea({value:state.about, cls:"field--about", placeholder:"Scrie câteva propoziții despre tine..."})}
      </section>`;
  }

  function renderExperienceItem(exp){
    const bullets = (exp.bullets||[]).map(b => `
      <div class="bullet-row">
        <span class="bullet-dot"></span>
        ${tField({value:b, cls:"field--bullet", placeholder:"Descrie o realizare concretă"})}
      </div>`).join("");

    return `
      <article class="card">
        <div class="card__row card__row--head">
          ${tField({value:exp.role, cls:"field--role", placeholder:"Poziția ta"})}
          <span class="card__sep">·</span>
          ${tField({value:exp.company, cls:"field--company", placeholder:"Compania"})}
        </div>
        <div class="card__row card__row--meta">
          ${tField({value:exp.period, cls:"field--mono", placeholder:"Ian 2023 — Prezent"})}
          ${tField({value:exp.location, cls:"field--mono", placeholder:"Oraș"})}
        </div>
        <div class="bullets">${bullets}</div>
      </article>`;
  }

  function renderExperienta(){
    const items = state.experience.length
      ? state.experience.map(e => renderExperienceItem(e)).join("")
      : `<p class="empty-note">Nicio experiență adăugată încă.</p>`;
    return `
      <section class="section" id="experienta">
        ${sectionHead("02","Experiență")}
        ${items}
      </section>`;
  }

  function renderEducationItem(ed){
    return `
      <article class="card">
        <div class="card__row card__row--head">
          ${tField({value:ed.degree, cls:"field--degree", placeholder:"Diploma / specializarea"})}
        </div>
        <div class="card__row card__row--meta" style="margin-top:4px;">
          ${tField({value:ed.school, cls:"field--school", placeholder:"Universitatea"})}
          ${tField({value:ed.period, cls:"field--mono", placeholder:"2019 — 2023"})}
        </div>
        ${tTextarea({value:ed.details, cls:"field--details", placeholder:"Detalii suplimentare (opțional)"})}
      </article>`;
  }

  function renderEducatie(){
    const items = state.education.length
      ? state.education.map(e => renderEducationItem(e)).join("")
      : `<p class="empty-note">Nicio educație adăugată încă.</p>`;
    return `
      <section class="section" id="educatie">
        ${sectionHead("03","Educație")}
        ${items}
      </section>`;
  }

  function renderSkillGroup(sk){
    const tagList = (sk.items||"").split(",").map(s=>s.trim()).filter(Boolean);
    return `
      <div class="skill-group">
        <div class="skill-group__head">
          ${tField({value:sk.category, cls:"field--category", placeholder:"Categorie"})}
        </div>
        <div class="tags">${tagList.map(t=>`<span class="tag">${ro(t)}</span>`).join("")}</div>
      </div>`;
  }

  function renderCompetente(){
    const items = state.skills.length
      ? state.skills.map(s => renderSkillGroup(s)).join("")
      : `<p class="empty-note">Nicio competență adăugată încă.</p>`;
    return `
      <section class="section" id="competente">
        ${sectionHead("04","Competențe")}
        ${items}
      </section>`;
  }

  function renderProjectItem(p){
    const tagList = (p.tags||"").split(",").map(s=>s.trim()).filter(Boolean);
    return `
      <article class="card">
        <div class="card__row card__row--head">
          ${tField({value:p.name, cls:"field--role", placeholder:"Numele proiectului"})}
        </div>
        ${tTextarea({value:p.description, cls:"field--desc", placeholder:"Descriere scurtă"})}
        ${p.link ? `<a class="project-link" href="${ro(p.link.startsWith('http')?p.link:'https://'+p.link)}" target="_blank" rel="noopener noreferrer">${ICONS.link}${ro(p.link)}</a>` : ""}
        ${tagList.length ? `<div class="tags">${tagList.map(t=>`<span class="tag">${ro(t)}</span>`).join("")}</div>` : ""}
      </article>`;
  }

  function renderProiecte(){
    const items = state.projects.length
      ? state.projects.map(p => renderProjectItem(p)).join("")
      : `<p class="empty-note">Niciun proiect adăugat încă.</p>`;
    return `
      <section class="section" id="proiecte">
        ${sectionHead("05","Proiecte")}
        ${items}
      </section>`;
  }

  function renderLangRow(l){
    return `
      <div class="lang-row">
        ${tField({value:l.name, cls:"field--langname", placeholder:"Limba"})}
        ${tField({value:l.level, cls:"field--langlevel", placeholder:"Nivel"})}
      </div>`;
  }

  function renderLimbi(){
    const items = state.languages.length
      ? state.languages.map(l => renderLangRow(l)).join("")
      : `<p class="empty-note">Nicio limbă adăugată încă.</p>`;
    return `
      <section class="section" id="limbi">
        ${sectionHead("06","Limbi străine")}
        ${items}
      </section>`;
  }

  function renderHobbies(){
    const tagList = (state.hobbies||"").split(",").map(s=>s.trim()).filter(Boolean);
    return `
      <section class="section" id="hobbies">
        ${sectionHead("07","Hobby-uri")}
        ${tagList.length ? `<div class="tags">${tagList.map(t=>`<span class="tag">${ro(t)}</span>`).join("")}</div>` : `<p class="empty-note">Niciun hobby adăugat încă.</p>`}
      </section>`;
  }

  function render(){
    app.innerHTML = `
      <div class="shell">
        ${renderRail()}
        <main class="content">
          ${renderDespre()}
          ${renderExperienta()}
          ${renderEducatie()}
          ${renderCompetente()}
          ${renderProiecte()}
          ${renderLimbi()}
          ${renderHobbies()}
        </main>
      </div>`;

    autoResizeAll();
    setupScrollSpy();

    requestAnimationFrame(() => {
      document.querySelectorAll(".section").forEach(s => {
        if(s.getBoundingClientRect().top < window.innerHeight * 0.85) s.classList.add("is-visible");
      });
    });
  }

  function autoResize(el){
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  }
  function autoResizeAll(){
    document.querySelectorAll("textarea.field").forEach(autoResize);
  }

  function setupScrollSpy(){
    if(navObserver) navObserver.disconnect();
    const tabs = Array.from(document.querySelectorAll(".nav__tab"));
    const indicator = document.querySelector(".nav__indicator");

    function setActive(id){
      let activeIndex = 0;
      tabs.forEach((t,i) => {
        const on = t.dataset.target === id;
        t.classList.toggle("is-active", on);
        if(on) activeIndex = i;
      });
      if(indicator && tabs[activeIndex]){
        indicator.style.transform = `translateY(${tabs[activeIndex].offsetTop}px)`;
        indicator.style.height = tabs[activeIndex].offsetHeight + "px";
      }
    }

    navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add("is-visible");
          setActive(entry.target.id);
        }
      });
    }, {rootMargin: "-35% 0px -55% 0px", threshold: 0});

    document.querySelectorAll(".section").forEach(s => navObserver.observe(s));
    if(tabs.length) setActive(SECTIONS[0].id);
  }

  /* ---------------- event delegation ---------------- */

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if(!btn) return;
    const action = btn.dataset.action;

    if(action === "nav"){
      const target = document.getElementById(btn.dataset.target);
      if(target) target.scrollIntoView({behavior: REDUCED_MOTION ? "auto" : "smooth", block:"start"});
    } else if(action === "print"){
      window.print();
    }
  });

  window.addEventListener("resize", autoResizeAll);

  render();
})();