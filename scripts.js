const reduceMotion=matchMedia("(prefers-reduced-motion: reduce)").matches;
const $=(selector,parent=document)=>parent.querySelector(selector);
const $$=(selector,parent=document)=>[...parent.querySelectorAll(selector)];
const announce=(message)=>{const live=$("#site-announcer");if(live)live.textContent=message};
const setAccordion=(item,open)=>{item.classList.toggle("open",open);const button=$(".accordion-button",item);button?.setAttribute("aria-expanded",String(open));if(button?.lastElementChild)button.lastElementChild.textContent=open?"−":"+"};
const setFlow=(flow,answer)=>{const answers=$$(".choice",flow);answers.forEach(item=>item.disabled=true);answer.classList.add(answer.dataset.answer);const feedback=$(".feedback",flow);feedback.innerHTML=answer.dataset.feedback;feedback.classList.add("show");feedback.setAttribute("aria-live","polite");const reset=$(".reset",flow);reset.classList.add("show");announce("Response feedback is available.")};
const resetFlow=flow=>{const feedback=$(".feedback",flow);$$(".choice",flow).forEach(item=>{item.disabled=false;item.classList.remove("correct","caution","wrong")});feedback.classList.remove("show");$(".reset",flow)?.classList.remove("show");announce("Scenario reset.")};
const setupNavigation=()=>{const nav=$(".site-nav");if(!nav)return;nav.id="site-navigation";const button=document.createElement("button");button.className="menu-toggle";button.type="button";button.setAttribute("aria-label","Open site navigation");button.setAttribute("aria-controls",nav.id);button.setAttribute("aria-expanded","false");button.innerHTML="<span></span><span></span><span></span>";nav.before(button)};
const enhanceCards=()=>$$(".card").forEach((card,index)=>{if($(".module-icon",card))return;const icon=document.createElement("span");icon.className="module-icon";icon.setAttribute("aria-hidden","true");icon.textContent=["✦","◌","↗","◆","◈","●"][index%6];card.prepend(icon)});
const enhanceStatus=()=>{if(!$("#site-announcer"))document.body.insertAdjacentHTML("beforeend",'<div id="site-announcer" class="sr-only" aria-live="polite" aria-atomic="true"></div>');$$(".feedback").forEach(item=>item.setAttribute("aria-live","polite"));$$("[data-xp]").forEach(box=>{const bar=$(".xp-bar",box);bar?.setAttribute("role","progressbar");bar?.setAttribute("aria-valuemin","0");bar?.setAttribute("aria-valuemax","100");bar?.setAttribute("aria-valuenow",box.dataset.xp);$("button",box)?.setAttribute("aria-label","Practice to earn pet experience points")})};
const addTeenTools=()=>{if(!location.pathname.endsWith("teens.html"))return;const apps=$("#apps .grid");if(apps&&!$("#danger-cards"))apps.insertAdjacentHTML("afterend",'<section class="accordion" id="danger-cards" aria-label="Expandable app danger guides"><article class="accordion-item"><button class="accordion-button" aria-expanded="false">Instagram: a perfect-looking account wants to “collab” <span aria-hidden="true">+</span></button><div class="accordion-content">Check account history and engagement. Do not pay to be sponsored or send personal information to a new DM.</div></article><article class="accordion-item"><button class="accordion-button" aria-expanded="false">Snapchat: a new person wants a private story or uses a streak <span aria-hidden="true">+</span></button><div class="accordion-content">A streak is not a reason to share more or keep a secret. Pause before moving the conversation.</div></article><article class="accordion-item"><button class="accordion-button" aria-expanded="false">TikTok, Discord, Roblox, or YouTube pressure <span aria-hidden="true">+</span></button><div class="accordion-content">Collab requests, Nitro links, Robux offers, private servers, downloads, and creator impersonation all deserve a pause and an independent check.</div></article></section>');const support=$(".accordion",$("main"));if(support&&!$("#support-flow"))support.insertAdjacentHTML("beforebegin",'<article class="panel flow-card" data-flow id="support-flow"><span class="tag">SUPPORT A FRIEND</span><p class="flow-question">A friend says they are scared to tell anyone. What do you say?</p><div class="choice-list"><button class="choice" data-answer="correct" data-feedback="<b>That keeps them connected.</b> Listen without blame, help save evidence if safe, and help them reach a trusted adult or 988 if they feel trapped.">“I’m with you. Let’s find someone calm to help us think through this.”</button><button class="choice" data-answer="wrong" data-feedback="<b>They need support, not isolation.</b> Keeping it secret can make pressure stronger.">“Do not tell anyone. It will probably go away.”</button></div><div class="feedback"></div><button class="reset" type="button">Try this support choice again</button></article>')};
const addCatalogueFilters=()=>{if(!location.pathname.endsWith("catalogue.html"))return;const grid=$(".section.alt .grid");if(!grid||$(".filters"))return;grid.insertAdjacentHTML("beforebegin",'<div class="filters" role="group" aria-label="Filter training pathways"><button class="filter active" data-filter="all">All pathways</button><button class="filter" data-filter="teen">Teens</button><button class="filter" data-filter="parent">Parents</button><button class="filter" data-filter="senior">Seniors</button></div>');$$(".card",grid).forEach((card,index)=>card.dataset.category=["teen","parent","senior"][index])};
const addParentCarousel=()=>{if(!location.pathname.endsWith("parents.html")||$(".carousel"))return;const zone=$(".no-shame");zone?.insertAdjacentHTML("afterend",'<section class="container section"><span class="eyebrow">What teens wish parents understood</span><div class="carousel panel" aria-roledescription="carousel" aria-label="What teens wish parents understood"><article class="carousel-slide active"><h3>“I need to know I will not get in trouble.”</h3><p>Lead with reassurance before questions or consequences.</p></article><article class="carousel-slide"><h3>“Please stay calm.”</h3><p>A calm first response makes early disclosure more likely.</p></article><div class="carousel-controls"><button type="button" data-direction="-1" aria-label="Show previous message">←</button><button type="button" data-direction="1" aria-label="Show next message">→</button></div></div></section>')};
setupNavigation();addTeenTools();addCatalogueFilters();addParentCarousel();enhanceCards();enhanceStatus();if(location.pathname.endsWith("seniors.html"))document.body.classList.add("senior-page");
document.addEventListener("click",event=>{const target=event.target.closest("button");if(!target)return;if(target.classList.contains("menu-toggle")){const nav=$(".site-nav"),open=nav.classList.toggle("is-open");target.setAttribute("aria-expanded",String(open));target.setAttribute("aria-label",open?"Close site navigation":"Open site navigation");return}if(target.classList.contains("accordion-button")){const item=target.closest(".accordion-item");setAccordion(item,!item.classList.contains("open"));return}if(target.classList.contains("choice")){setFlow(target.closest("[data-flow]"),target);return}if(target.classList.contains("reset")){resetFlow(target.closest("[data-flow]"));return}if(target.closest("[data-xp]")){const box=target.closest("[data-xp]"),next=Math.min(+box.dataset.xp+15,100),bar=$(".xp-bar",box),label=$("[data-xp-label]",box);box.dataset.xp=next;$(".xp-bar i",box).style.width=next+"%";bar?.setAttribute("aria-valuenow",next);label.textContent=next===100?"Level up! New accessory unlocked.":next+" XP toward your next reward";target.textContent=next===100?"Unlocked":"Practice again";announce(label.textContent);return}if(target.classList.contains("filter")){const grid=$(".section.alt .grid"),filter=target.dataset.filter;$$(".filter").forEach(item=>item.classList.toggle("active",item===target));$$(".card",grid).forEach(card=>card.classList.toggle("hidden",filter!=="all"&&card.dataset.category!==filter));announce(filter==="all"?"All pathways shown.":filter+" pathway shown.");return}if(target.dataset.direction){const carousel=target.closest(".carousel"),slides=$$(".carousel-slide",carousel),current=slides.findIndex(slide=>slide.classList.contains("active")),next=(current+Number(target.dataset.direction)+slides.length)%slides.length;slides[current].classList.remove("active");slides[next].classList.add("active");announce("Message "+(next+1)+" of "+slides.length)}});
let resizeTimer;
addEventListener("resize",()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{if(innerWidth>680){$(".site-nav")?.classList.remove("is-open");$(".menu-toggle")?.setAttribute("aria-expanded","false")}},150)},{passive:true});
document.addEventListener("click",event=>{const link=event.target.closest('a[href^="#"]');if(!link||reduceMotion)return;const destination=$(link.getAttribute("href"));if(destination){event.preventDefault();destination.scrollIntoView({behavior:"smooth"});destination.focus({preventScroll:true})}});

// ReadyOnline mock API: front-end training data only; no personal data is collected.
const ReadyOnlineAPI=(()=>{const data={pet:{name:"Luna",xp:35,level:2,reward:"Dark Glasses"},dangers:[{app:"Instagram",flag:"A new account asks for a paid collaboration."},{app:"Snapchat",flag:"A new connection asks for a private story or secrecy."},{app:"Discord",flag:"A Nitro link or private channel asks for a download."}],modules:["ROL-000: Scams Have Always Existed","ROL-Q01: The Daily AI Quiz","ROL-P01-P12: Platform Modules"],conversations:["Thank you for telling me. You are not in trouble.","Can you just listen first?"],standards:["Clear child and teen protections","Meaningful age enforcement","Visible data and safety settings"]};const read=(key,fail=false)=>new Promise((resolve,reject)=>setTimeout(()=>fail?reject(new Error("Unable to load module. Try again.")):resolve(structuredClone(data[key])),280));return{getPetXP:()=>read("pet"),getDangerCards:()=>read("dangers"),getModules:()=>read("modules"),getConversationGuides:()=>read("conversations"),getAccountabilityStandards:()=>read("standards"),addPetXP:amount=>{data.pet.xp=Math.min(data.pet.xp+amount,100);return read("pet")}}})();window.ReadyOnlineAPI=ReadyOnlineAPI;
const themeKey="readyonline-theme";const applyTheme=theme=>{document.documentElement.dataset.theme=theme;const button=$(".theme-toggle");if(button){button.setAttribute("aria-pressed",String(theme==="light"));button.setAttribute("aria-label",theme==="light"?"Switch to dark theme":"Switch to light theme");button.textContent=theme==="light"?"? Light":"? Dark"}};const addThemeToggle=()=>{const nav=$(".site-nav");if(!nav||$(".theme-toggle"))return;const button=document.createElement("button");button.type="button";button.className="theme-toggle button ghost";nav.append(button);applyTheme(localStorage.getItem(themeKey)||"dark")};addThemeToggle();
document.addEventListener("click",event=>{const theme=event.target.closest(".theme-toggle");if(theme){const next=document.documentElement.dataset.theme==="light"?"dark":"light";localStorage.setItem(themeKey,next);applyTheme(next);announce(next+" theme enabled.");return}const link=event.target.closest('a[href$=".html"]');if(link&&link.origin===location.origin&&!reduceMotion){event.preventDefault();document.body.classList.add("page-leave");setTimeout(()=>location.href=link.href,160)}});
document.addEventListener("click",event=>{const xp=event.target.closest("[data-xp] button");if(!xp)return;const box=xp.closest("[data-xp]");box.classList.add("is-updating");ReadyOnlineAPI.addPetXP(15).then(pet=>{box.dataset.xp=pet.xp;$("[data-xp-label]",box).textContent=pet.xp===100?"Level up! "+pet.reward+" unlocked.":pet.xp+" XP toward "+pet.reward;$(".xp-bar",box)?.setAttribute("aria-valuenow",pet.xp);announce("Pet experience updated.")}).catch(()=>announce("Unable to update pet experience. Try again.")).finally(()=>setTimeout(()=>box.classList.remove("is-updating"),500))});
ReadyOnlineAPI.getModules().catch(()=>announce("Unable to load module. Try again."));document.body.classList.add("page-enter");

const addMockSurfaces=()=>{if(location.pathname.endsWith("accountability.html")){const table=$(".standards");if(table){$$("tbody tr",table).forEach(row=>{const cell=$("td",row);if(cell&&!$(".app-tag",cell))cell.insertAdjacentHTML("afterbegin",'<span class="app-tag">APP</span> ')});table.insertAdjacentHTML("afterend",'<section class="comparison-grid" id="api-comparisons" aria-live="polite"><div class="comparison-card"><span class="loading-inline">Loading family expectations</span></div></section>');ReadyOnlineAPI.getAccountabilityStandards().then(items=>{$("#api-comparisons").innerHTML=items.map(item=>`<article class="comparison-card reveal"><b>Families should expect</b><span>${item}</span></article>`).join("")}).catch(()=>{$("#api-comparisons").innerHTML='<div class="alert-banner">Unable to load standards. Try again.</div>'})}}if(location.pathname.endsWith("teens.html")){const cards=$("#danger-cards");if(cards){const status=document.createElement("p");status.className="loading-inline";status.textContent="Loading red flag examples";cards.before(status);ReadyOnlineAPI.getDangerCards().then(items=>{status.textContent=items.length+" red flag examples ready.";status.classList.add("reveal")}).catch(()=>{status.textContent="Unable to load examples. Try again."})}}};addMockSurfaces();

// Session-only progress: intentionally uses sessionStorage and resets when the browser session closes.
const progressKey="readyonline-session-progress";
const petRoster=[{id:"biscuit",name:"?? Biscuit"},{id:"cleo",name:"?? Cleo"},{id:"remy",name:"?? Remy"},{id:"scout",name:"?? Scout"},{id:"finn",name:"?? Finn"},{id:"luna",name:"?? Luna"},{id:"sage",name:"?? Sage"},{id:"tank",name:"?? Tank"}];
const defaultProgress={viewed:[],completed:[],pets:[],xp:0};
const getProgress=()=>{try{return{...defaultProgress,...JSON.parse(sessionStorage.getItem(progressKey)||"{}")}}catch{return{...defaultProgress}}};
const saveProgress=progress=>{sessionStorage.setItem(progressKey,JSON.stringify(progress));return progress};
const updateProgress=changes=>saveProgress({...getProgress(),...changes});
const addPet=moduleId=>{const progress=getProgress();if(progress.completed.includes(moduleId))return progress;const pet=petRoster[progress.pets.length%petRoster.length];progress.completed.push(moduleId);progress.viewed=[...new Set([...progress.viewed,moduleId])];progress.pets.push(pet);progress.xp=Math.min(progress.xp+15,100);return saveProgress(progress)};
const getPets=()=>getProgress().pets;
window.ReadyOnlineSession={getProgress,updateProgress,addPet,getPets};
const renderPets=(container,progress=getProgress())=>{const count=progress.pets.length;container.className="pet-collection "+(count>=6?"pets-6":count>=3?"pets-3":"");container.innerHTML=count?progress.pets.map((pet,index)=>`<div class="pet-token ${index===count-1?"new-pet":""}"><span aria-hidden="true">${pet.name.split(" ")[0]}</span><span>${pet.name.substring(3)}</span></div>`).join(""):'<p class="progress-meta">Complete a module to welcome your first pet to this session.</p>'};
const progressSummary=()=>{const progress=getProgress();return`<p class="session-note">Your progress is saved only for this session. If you close your browser, it resets. Screenshot your progress if you want to keep it.</p><p class="progress-meta"><b>${progress.completed.length}</b> modules completed � <b>${progress.pets.length}</b> pets collected � <b>${progress.xp}</b> XP</p><div class="xp" data-xp="${progress.xp}"><b>Pet Level</b><div class="xp-bar"><i style="width:${progress.xp}%"></i></div><span>${progress.xp}/100 XP</span></div><div class="pet-collection-wrap"></div>`};
const setupProgressUI=()=>{
  if($(".progress-fab"))return;
  document.body.insertAdjacentHTML("beforeend",'<button class="progress-fab" type="button" aria-label="Open My Progress summary">My Progress</button><div class="progress-modal" role="dialog" aria-modal="true" aria-labelledby="progress-title"><section class="progress-dialog"><button class="button ghost close-progress" type="button" aria-label="Close progress summary">Close</button><h2 id="progress-title">My session progress</h2><div class="progress-content"></div><p class="session-note">This is just for your current session. Screenshot your progress if you want to keep it.</p></section></div><div class="screenshot-view" role="dialog" aria-modal="true" aria-labelledby="screenshot-title"><section class="screenshot-card"><h2 id="screenshot-title">ReadyOnline session snapshot</h2><div class="screenshot-content"></div><p>You are building strong instincts online. Share this with someone who supports you.</p><p class="session-note">ReadyOnline does not store your progress. This view is only for your current session.</p><div class="screenshot-actions"><button class="button primary print-snapshot" type="button">Print or save screenshot</button><button class="button secondary close-screenshot" type="button">Back to site</button></div></section></div>');
  const pages={"teens.html":"Teen instinct practice","parents.html":"Parent conversation practice","seniors.html":"Senior scam recognition","catalogue.html":"Training catalogue"};
  const name=location.pathname.split("/").pop();
  if(!pages[name])return;
  const target=$("main .section")||$("main");
  target.insertAdjacentHTML("afterbegin",'<div class="session-note">Your progress is saved only for this session. If you close your browser, it resets.</div>');
  $$(".card",document.querySelector("main")).forEach((card,index)=>{
    if($(".completion-button",card))return;
    const id=`${name||"home"}-${index+1}`;
    card.dataset.moduleId=id;
    card.insertAdjacentHTML("beforeend",`<button class="button secondary completion-button" type="button" data-module="${id}">Mark module complete</button>`);
    if(!getProgress().viewed.includes(id))updateProgress({viewed:[...getProgress().viewed,id]});
  });
  if(name==="teens.html"||name==="catalogue.html")target.insertAdjacentHTML("afterbegin",'<section class="no-shame save-progress"><span class="eyebrow">Save your progress</span><h2>Keep what matters without giving up your privacy.</h2><p>ReadyOnline does not store your progress. If you want to share your pet collection or completed modules with a parent or trusted adult, take a screenshot.</p><button class="button primary screenshot-trigger" type="button">Show Screenshot View</button></section>');
};
const refreshProgress=()=>{const progress=getProgress();$$(".progress-content,.screenshot-content").forEach(container=>{container.innerHTML=progressSummary();renderPets($(".pet-collection-wrap",container),progress)});$$(".completion-button").forEach(button=>{const completed=progress.completed.includes(button.dataset.module);button.textContent=completed?"Completed this session":"Mark module complete";button.setAttribute("aria-pressed",String(completed));button.closest(".card")?.classList.toggle("module-complete",completed)})};
setupProgressUI();refreshProgress();
document.addEventListener("click",event=>{const button=event.target.closest("button");if(!button)return;if(button.classList.contains("progress-fab")){refreshProgress();$(".progress-modal").classList.add("open");$(".close-progress").focus();return}if(button.classList.contains("close-progress")){$(".progress-modal").classList.remove("open");return}if(button.classList.contains("completion-button")){const progress=addPet(button.dataset.module);refreshProgress();button.closest(".card")?.classList.add("module-complete");announce(`Module complete. ${progress.pets.at(-1)?.name||"A pet"} joined your session collection.`);return}if(button.classList.contains("screenshot-trigger")){refreshProgress();$(".screenshot-view").classList.add("open");return}if(button.classList.contains("close-screenshot")){$(".screenshot-view").classList.remove("open");return}if(button.classList.contains("print-snapshot")){window.print()}});

const sessionOnlyNote="Your progress is saved only for this session. If you close your browser, it resets.";
const onboardingSteps=["<span class='eyebrow'>Welcome to ReadyOnline</span><h2>Digital instincts for life.</h2><p>Practice helps you notice pressure, pause before reacting, and choose a move you have already rehearsed.</p><div class='no-shame'><b>No Shame Zone</b><p>Something happening online is never a reason to go through it alone.</p></div>","<span class='eyebrow'>Choose your path</span><h2>Start where life is happening.</h2><div class='path-options'><button class='path-option' data-path='Teen'>Teen: apps, AI, connection, and confidence</button><button class='path-option' data-path='Parent'>Parent: calm conversations and platform awareness</button><button class='path-option' data-path='Senior'>Senior: independence, scams, and account safety</button></div>","<span class='eyebrow'>How training works</span><h2>Learn through real decisions.</h2><p>Foundation modules, daily AI practice, and platform-specific scenarios all follow the same model: notice, recognize, pause, test, and move.</p>",`<span class='eyebrow'>Session-only progress</span><h2>Keep your privacy.</h2><p>${sessionOnlyNote}</p><p>Take a screenshot if you want to keep your progress or share it with someone who supports you.</p>`,"<span class='eyebrow'>Meet your companions</span><h2>Pets make instinct visible.</h2><p>Complete a module, welcome a companion, and watch your collection evolve during this session.</p><p class='session-note'>Your pet evolves only for this session. Screenshot your collection if you want to keep it.</p>"];
const quizQuestions=[{q:"A new account says: �Move this to a private app and do not tell anyone yet.� What is the strongest next move?",a:["Move the chat so you can find out more.","Keep the chat where it is, pause, and talk to someone calm.","Reply quickly so they do not get upset."],correct:1,feedback:"Secrecy and pressure to switch platforms are signals to slow down. Keeping your options and support around you is the move."},{q:"A message says your account will close today unless you use its link. What do you do?",a:["Use the official app or known website, not the message link.","Send the message to friends and ask them to click too.","Enter your password right away."],correct:0,feedback:"Urgency is designed to rush you. Verify through a route you already trust."},{q:"A friend says they feel scared about something online. What helps most?",a:["Tell them to keep it secret so nobody gets in trouble.","Listen without blame and help them reach a trusted adult.","Tell them it is not that serious."],correct:1,feedback:"A calm person beside them creates more choices. Support first, then find the next safe move together."}];
const evolution=progress=>{const n=progress.completed.length,stage=n>=7?4:n>=5?3:n>=3?2:1,label=["Basic companion","Glowing companion","Growing companion","Fully evolved neon companion"][stage-1],pet=progress.pets.at(-1)?.name||"?? Your first companion";return `<div class='evolution stage-${stage}'><span class='evolution-pet' aria-hidden='true'>${pet.split(" ")[0]}</span><b>${label}</b><p class='progress-meta'>${pet}</p><p class='session-note'>Your pet evolves only for this session. Screenshot your collection if you want to keep it.</p></div>`};
const addExperiences=()=>{if($(".onboarding"))return;document.body.insertAdjacentHTML("beforeend",`<div class='onboarding' role='dialog' aria-modal='true' aria-labelledby='onboarding-title'><section class='onboarding-card'><div class='step-dots'></div><div id='onboarding-title' class='onboarding-content'></div><div class='onboarding-actions'><button class='button ghost onboarding-skip' type='button'>Skip for now</button><button class='button primary onboarding-next' type='button'>Next</button></div></section></div><div class='training-overlay' role='dialog' aria-modal='true' aria-labelledby='training-title'><section class='training-card'><button class='button ghost training-close' type='button'>Close training</button><h2 id='training-title'>Your guided training path</h2><p class='session-note'>${sessionOnlyNote}</p><div class='training-path-bar'><i></i></div><div class='training-steps'></div><button class='button primary training-next' type='button'>Complete next module</button><button class='button secondary screenshot-trigger' type='button'>Screenshot My Progress</button></section></div><div class='quiz-overlay' role='dialog' aria-modal='true' aria-labelledby='quiz-title'><section class='quiz-card'><button class='button ghost quiz-close' type='button'>Close quiz</button><div class='step-dots quiz-dots'></div><div id='quiz-title' class='quiz-content'></div></section></div>`);const hero=$(".hero");const page=location.pathname.split("/").pop();if(hero&&(page==='index.html'||page==='catalogue.html'))hero.querySelector("div")?.insertAdjacentHTML("beforeend","<p><button class='button primary pulse-cta start-training' type='button'>Start Training</button></p>");if(hero&&(page==='teens.html'||page==='catalogue.html'))hero.querySelector("div")?.insertAdjacentHTML("beforeend","<button class='button secondary start-quiz' type='button'>Take the instinct quiz</button>")};
let onboardIndex=0,quizIndex=0,quizScore=0,trainingIndex=0;const trainingModules=["ROL-000: Scams Have Always Existed","ROL-Q01: The Daily AI Quiz","ROL-P01: Platform Instinct Practice"];
const renderOnboarding=()=>{const content=$(".onboarding-content"),dots=$(".onboarding .step-dots");content.innerHTML=onboardingSteps[onboardIndex];dots.innerHTML=onboardingSteps.map((_,i)=>`<i class='${i===onboardIndex?'active':''}'></i>`).join("");$(".onboarding-next").textContent=onboardIndex===onboardingSteps.length-1?"Start exploring":"Next"};
const renderTraining=()=>{const progress=getProgress(),steps=$(".training-steps");steps.innerHTML=trainingModules.map((name,i)=>`<div class='training-step ${i<trainingIndex?'done':''}'><span>${i<trainingIndex?'?':'?'}</span><span>${name}</span></div>`).join("");$(".training-path-bar i").style.width=(trainingIndex/trainingModules.length*100)+"%";$(".training-next").textContent=trainingIndex===trainingModules.length?"Training path complete":"Complete next module";$(".training-card .evolution")?.remove();steps.insertAdjacentHTML("afterend",evolution(progress))};
const renderQuiz=()=>{const content=$(".quiz-content"),dots=$(".quiz-dots");if(quizIndex===quizQuestions.length){content.innerHTML=`<div class='quiz-result celebrate'><span class='eyebrow'>Quiz complete</span><h2>Strong work.</h2><p>${quizScore} of ${quizQuestions.length} choices used a strong instinct move.</p><p>${sessionOnlyNote} Take a screenshot if you want to keep your progress or share it.</p><button class='button primary quiz-award' type='button'>Collect session reward</button><button class='button secondary screenshot-trigger' type='button'>Screenshot My Progress</button></div>`;dots.innerHTML="";return}const question=quizQuestions[quizIndex];dots.innerHTML=quizQuestions.map((_,i)=>`<i class='${i===quizIndex?'active':''}'></i>`).join("");content.innerHTML=`<span class='eyebrow'>Instinct check ${quizIndex+1} of ${quizQuestions.length}</span><h2>${question.q}</h2><div class='choice-list'>${question.a.map((answer,i)=>`<button class='quiz-choice' type='button' data-choice='${i}'>${answer}</button>`).join("")}</div>`};
const openOverlay=(selector,render)=>{render();$(selector).classList.add("open");$(selector+" button:not(.ghost)")?.focus()};addExperiences();if(!sessionStorage.getItem("readyonline-onboarded")){renderOnboarding();$(".onboarding").classList.add("open")}
let swipeStart=0;[".onboarding-card",".quiz-card"].forEach(selector=>$(selector)?.addEventListener("touchstart",event=>swipeStart=event.changedTouches[0].screenX,{passive:true}));[".onboarding-card",".quiz-card"].forEach(selector=>$(selector)?.addEventListener("touchend",event=>{if(Math.abs(event.changedTouches[0].screenX-swipeStart)<45)return;if(selector==='.onboarding-card'&&event.changedTouches[0].screenX<swipeStart&&onboardIndex<4){onboardIndex++;renderOnboarding()}if(selector==='.quiz-card'&&event.changedTouches[0].screenX<swipeStart&&quizIndex<quizQuestions.length)renderQuiz()},{passive:true}));
document.addEventListener("click",event=>{const button=event.target.closest("button");if(!button)return;if(button.classList.contains("onboarding-next")){if(onboardIndex<onboardingSteps.length-1){onboardIndex++;renderOnboarding()}else{$(".onboarding").classList.remove("open");sessionStorage.setItem("readyonline-onboarded","true")}return}if(button.classList.contains("onboarding-skip")){$(".onboarding").classList.remove("open");sessionStorage.setItem("readyonline-onboarded","true");return}if(button.classList.contains("start-training")){trainingIndex=0;openOverlay(".training-overlay",renderTraining);return}if(button.classList.contains("training-close")){$(".training-overlay").classList.remove("open");return}if(button.classList.contains("training-next")){if(trainingIndex<trainingModules.length){addPet("guided-"+trainingIndex);trainingIndex++;refreshProgress();renderTraining();announce("Module complete. A pet joined your session.")}else{button.closest(".training-card").classList.add("celebrate");announce("Training path complete. Take a screenshot to share your session progress.")}return}if(button.classList.contains("start-quiz")){quizIndex=0;quizScore=0;openOverlay(".quiz-overlay",renderQuiz);return}if(button.classList.contains("quiz-close")){$(".quiz-overlay").classList.remove("open");return}if(button.classList.contains("quiz-choice")){const question=quizQuestions[quizIndex],choice=+button.dataset.choice;if(choice===question.correct)quizScore++;$$(".quiz-choice").forEach(item=>item.disabled=true);button.classList.add(choice===question.correct?"correct":"caution");button.insertAdjacentHTML("afterend",`<div class='feedback show'>${question.feedback}</div><button class='button primary quiz-next' type='button'>${quizIndex===quizQuestions.length-1?'See result':'Next question'}</button>`);return}if(button.classList.contains("quiz-next")){quizIndex++;renderQuiz();return}if(button.classList.contains("quiz-award")){addPet("instinct-quiz");refreshProgress();button.closest(".quiz-result").classList.add("celebrate");button.textContent="Session reward collected";button.disabled=true;announce("Quiz reward collected. Take a screenshot if you want to keep your progress.")}});

const refreshEvolution=()=>$$('.progress-content,.screenshot-content').forEach(container=>{container.querySelector('.evolution')?.remove();container.insertAdjacentHTML('beforeend',evolution(getProgress()))});refreshEvolution();
document.addEventListener('click',event=>{const path=event.target.closest('.path-option');if(path){$$('.path-option').forEach(item=>item.classList.toggle('selected',item===path));announce(path.dataset.path+' path selected.')}const completion=event.target.closest('.completion-button,.training-next,.quiz-award');if(completion)setTimeout(refreshEvolution,0)});

// Session-only dashboard extensions: no accounts, network calls, or permanent saving.
const instinctKey="readyonline-session-instincts";
const instinctDefaults={quizScore:0,simulationXP:0,challenges:[],badges:[]};
const getInstinctState=()=>{try{return{...instinctDefaults,...JSON.parse(sessionStorage.getItem(instinctKey)||"{}")}}catch{return{...instinctDefaults}}};
const saveInstinctState=state=>{sessionStorage.setItem(instinctKey,JSON.stringify(state));return state};
const petTraits=progress=>{const traits=[];if(progress.completed.length>=1)traits.push("Calm");if(progress.completed.length>=2)traits.push("Alert");if(progress.completed.length>=3)traits.push("Loyal");if(progress.completed.length>=4)traits.push("Curious");if(progress.completed.length>=5)traits.push("Brave");return traits};
const instinctStrength=()=>{const progress=getProgress(),state=getInstinctState();return Math.min(100,progress.completed.length*12+progress.xp+state.quizScore*8+state.simulationXP)};
const awardInstinctXP=(amount,reason)=>{const progress=getProgress();saveProgress({...progress,xp:Math.min(100,progress.xp+amount)});const state=getInstinctState();saveInstinctState({...state,simulationXP:state.simulationXP+amount});refreshProgress();announce(reason+" +"+amount+" session XP.")};
const completeChallenge=id=>{const state=getInstinctState();if(state.challenges.includes(id))return state;state.challenges.push(id);state.badges.push("? Daily Instinct Badge");saveInstinctState(state);awardInstinctXP(10,"Daily challenge complete");return state};
const challengeList=[{id:"flags",title:"Identify 3 red flags",copy:"Notice secrecy, urgency, or pressure before you respond."},{id:"simulation",title:"Complete 1 danger simulation",copy:"Practice a safe move before you need it."},{id:"module",title:"Finish 1 module",copy:"A session module earns a companion and strengthens your instinct."},{id:"friend",title:"Support-a-friend scenario",copy:"Practice staying calm and helping someone reach support."}];
const decorateModules=()=>{const page=location.pathname.split("/").pop();if(!["teens.html","parents.html","seniors.html","catalogue.html"].includes(page))return;const levels=["easy","medium","hard"],labels={easy:"Easy � 10 XP",medium:"Medium � 15 XP",hard:"Hard � 20 XP"};$$("main .card").forEach((card,index)=>{if($(".difficulty",card))return;const level=levels[index%3];card.insertAdjacentHTML("afterbegin",`<span class="difficulty ${level}">${labels[level]}</span>`);card.dataset.difficulty=level})};
const addDashboardNav=()=>{const nav=$(".site-nav");if(nav&&!$('a[href="dashboard.html"]',nav))nav.insertAdjacentHTML("beforeend",'<a href="dashboard.html">Dashboard</a>')};
const renderDashboard=()=>{const mount=$("#dashboard-content");if(!mount)return;const progress=getProgress(),state=getInstinctState(),traits=petTraits(progress),strength=instinctStrength(),stage=progress.completed.length>=7?4:progress.completed.length>=5?3:progress.completed.length>=3?2:1;mount.innerHTML=`<p class="session-note">Your dashboard resets when you close your browser. Screenshot it if you want to keep your progress.</p><div class="dashboard-grid"><article class="dashboard-card wide"><span class="eyebrow">Instinct strength</span><h2>${strength}% ready</h2><div class="strength-meter" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${strength}"><i style="width:${strength}%"></i></div><p class="progress-meta">Built through modules, safe choices, simulations, and quiz practice�all for this session only.</p></article><article class="dashboard-card"><span class="eyebrow">Session XP</span><h2>${progress.xp}/100</h2><div class="xp"><b>Pet Level</b><div class="xp-bar"><i style="width:${progress.xp}%"></i></div></div></article><article class="dashboard-card"><span class="eyebrow">Modules</span><h2>${progress.completed.length} complete</h2><p class="progress-meta">Every completed module awards a session companion.</p></article><article class="dashboard-card wide"><span class="eyebrow">Pet collection � stage ${stage}</span><div class="pet-collection ${progress.pets.length>=6?'pets-6':progress.pets.length>=3?'pets-3':''}">${progress.pets.length?progress.pets.map(p=>`<div class="pet-token"><span>${p.name.split(' ')[0]}</span><span>${p.name.substring(3)}</span></div>`).join(''):'<p class="progress-meta">Complete a module to welcome your first pet.</p>'}</div><div class="trait-list">${traits.length?traits.map(t=>`<span class="trait">${t}</span>`).join(''):'<span class="progress-meta">Traits unlock as modules are completed.</span>'}</div><p class="session-note">Pet traits are session-only. Screenshot your collection if you want to keep it.</p></article><article class="dashboard-card"><span class="eyebrow">Daily Challenge</span><h2>${state.challenges.length}/${challengeList.length}</h2><p class="progress-meta">${state.badges.length?state.badges.join(', '):'Complete a challenge to earn a session badge.'}</p></article></div><section class="section"><div class="challenge-strip">${challengeList.map(c=>`<article class="challenge-card ${state.challenges.includes(c.id)?'complete':''}"><h3>${c.title}</h3><p>${c.copy}</p><button class="button secondary challenge-button" type="button" data-challenge="${c.id}">${state.challenges.includes(c.id)?'Completed this session':'Mark challenge complete'}</button></article>`).join('')}</div></section><button class="button primary screenshot-dashboard" type="button">Screenshot My Dashboard</button>`};
const addDailyChallenge=()=>{if(!location.pathname.endsWith("index.html")||$("#daily-challenge"))return;const hero=$(".hero");hero?.insertAdjacentHTML("afterend",`<section class="container section" id="daily-challenge"><article class="challenge-card"><span class="eyebrow">Daily Challenge � session-only</span><h2>Identify 3 red flags.</h2><p>Spot secrecy, urgency, or pressure in one situation. Your progress resets when you close your browser.</p><button class="button primary challenge-button" type="button" data-challenge="flags">Start this challenge</button></article></section>`) };
const addSimulations=()=>{if(!location.pathname.endsWith("teens.html")||$("#danger-simulations"))return;const mount=$("#apps")||$("main");mount.insertAdjacentHTML("afterend",`<section class="container section" id="danger-simulations"><span class="eyebrow">Danger simulations</span><h2>Practice the <span class="gradient">safe alternative.</span></h2><p class="session-note">Your simulation progress is saved only for this session.</p><div class="simulation-deck"><article class="simulation-card" data-simulation="chat"><span class="app-tag">CHAT SWITCHING</span><h3>�Move this somewhere private. Don�t tell anyone.�</h3><button class="choice simulation-choice" data-safe="true">Keep the conversation where it is, pause, and get a calm second opinion.</button><button class="choice simulation-choice" data-safe="false">Move immediately so they do not lose interest.</button></article><article class="simulation-card" data-simulation="social"><span class="app-tag">SPOTIFY + INSTAGRAM</span><h3>�Everyone is joining. Send your information so we can add you.�</h3><button class="choice simulation-choice" data-safe="true">Check what is being requested and keep personal details private.</button><button class="choice simulation-choice" data-safe="false">Share first so you are not left out.</button></article><article class="simulation-card" data-simulation="deepfake"><span class="app-tag">DEEPFAKE AWARENESS</span><h3>A familiar voice demands money right now.</h3><button class="choice simulation-choice" data-safe="true">Call the person�s known number and verify another way.</button><button class="choice simulation-choice" data-safe="false">Send money before the deadline.</button></article></div></section>`)};
addDashboardNav();decorateModules();addDailyChallenge();addSimulations();renderDashboard();
document.addEventListener("click",event=>{const button=event.target.closest("button");if(!button)return;if(button.classList.contains("simulation-choice")){const card=button.closest(".simulation-card"),safe=button.dataset.safe==="true";$$(".simulation-choice",card).forEach(item=>item.disabled=true);button.classList.add(safe?"correct":"caution");card.insertAdjacentHTML("beforeend",`<div class="feedback show reveal">${safe?"<b>That preserves your options.</b> You paused pressure, checked context, and chose a safer route.":"<b>Pause before you act.</b> Urgency and social pressure are designed to make a fast choice feel necessary."}</div>`);if(safe){awardInstinctXP(8,"Safe instinct practiced");completeChallenge("simulation")}return}if(button.classList.contains("challenge-button")){completeChallenge(button.dataset.challenge);renderDashboard();button.closest(".challenge-card")?.classList.add("complete");button.textContent="Completed this session";return}if(button.classList.contains("screenshot-dashboard")){const shot=$(".screenshot-view");refreshProgress();$(".screenshot-content",shot).insertAdjacentHTML("beforeend",`<div class="screenshot-dashboard">${$("#dashboard-content")?.innerHTML||''}</div>`);shot.classList.add("open");return}if(button.classList.contains("completion-button")){const difficulty=button.closest(".card")?.dataset.difficulty;if(difficulty){awardInstinctXP(difficulty==="hard"?20:difficulty==="medium"?15:10,"Difficulty reward");if(getProgress().completed.length===1)completeChallenge("module");renderDashboard()}}});

if(location.pathname.endsWith("catalogue.html")){const filters=$(".filters");if(filters&&!$(".difficulty-filter")){filters.insertAdjacentHTML("beforeend",'<button class="filter difficulty-filter" data-difficulty="easy">Easy</button><button class="filter difficulty-filter" data-difficulty="medium">Medium</button><button class="filter difficulty-filter" data-difficulty="hard">Hard</button>');document.addEventListener("click",event=>{const filter=event.target.closest(".difficulty-filter");if(!filter)return;const level=filter.dataset.difficulty;$$('.difficulty-filter').forEach(item=>item.classList.toggle('active',item===filter));$$('main .card[data-difficulty]').forEach(card=>card.classList.toggle('hidden',card.dataset.difficulty!==level));announce(level+" difficulty modules shown.")})}}

// Session-only Instinct Mastery activities. No mentor characters, accounts, or backend data.
const masteryKey="readyonline-session-mastery";
const masteryDefaults={story:0,rapidStreak:0,rapidBest:0,redFlags:0,achievements:[]};
const getMastery=()=>{try{return{...masteryDefaults,...JSON.parse(sessionStorage.getItem(masteryKey)||"{}")}}catch{return{...masteryDefaults}}};
const saveMastery=state=>{sessionStorage.setItem(masteryKey,JSON.stringify(state));return state};
const achievementRules=[{id:"red-flag",title:"Red Flag Spotter",test:(p,s,m)=>m.redFlags>0||s.simulationXP>=8},{id:"calm",title:"Calm Communicator",test:(p,s,m)=>s.challenges.includes("friend")||m.story>=1},{id:"shield",title:"Scam Shield",test:(p,s,m)=>p.completed.length>=2||m.rapidBest>=3},{id:"safe",title:"Safe Choices Pro",test:(p,s,m)=>s.quizScore>=2||m.rapidBest>=4},{id:"guardian",title:"Pet Guardian",test:(p,s,m)=>p.pets.length>=3}];
const unlockAchievements=()=>{const progress=getProgress(),state=getInstinctState(),mastery=getMastery();achievementRules.forEach(rule=>{if(rule.test(progress,state,mastery)&&!mastery.achievements.includes(rule.id)){mastery.achievements.push(rule.id);announce(rule.title+" achievement unlocked.")}});return saveMastery(mastery)};
const achievementMarkup=()=>{const mastery=unlockAchievements();return `<section class="dashboard-card wide"><span class="eyebrow">Instinct Mastery � session-only</span><h2>Achievements</h2><p class="session-note">Achievements reset when you close your browser. Screenshot them if you want to keep them.</p><div class="achievement-grid">${achievementRules.map(rule=>`<div class="achievement ${mastery.achievements.includes(rule.id)?'unlocked':''}"><b>${rule.title}</b><br><small>${mastery.achievements.includes(rule.id)?'Unlocked this session':'Keep practicing'}</small></div>`).join('')}</div><button class="button secondary screenshot-achievements" type="button">Screenshot My Achievements</button></section>`};
const refreshMastery=()=>{renderDashboard();const dashboard=$("#dashboard-content");if(dashboard&&!$(".achievement-grid",dashboard))dashboard.insertAdjacentHTML("beforeend",achievementMarkup())};
const storyChapters=[{title:"Chapter 1: The private switch",scenario:"A new account says it needs to move your chat somewhere private and asks you not to tell anyone.",safe:"Keep the chat where it is and take a pause before responding.",tie:"Red flags: secrecy and isolation."},{title:"Chapter 2: The perfect offer",scenario:"An account with a small history offers a paid collaboration but needs your account information today.",safe:"Verify independently and do not give account details to a new DM.",tie:"Manipulation: urgency plus opportunity."},{title:"Chapter 3: The social push",scenario:"A group says everyone is joining now and asks you to share personal information to prove you belong.",safe:"You can belong without sharing personal details. Pause and check what is being requested.",tie:"Social pressure: FOMO is a signal to slow down."}];
const renderStory=()=>{const mount=$("#story-mode");if(!mount)return;const mastery=getMastery(),chapter=Math.min(mastery.story,storyChapters.length-1),item=storyChapters[chapter],complete=mastery.story>=storyChapters.length;mount.innerHTML=complete?`<article class="story-card celebrate"><span class="eyebrow">Story complete</span><h2>You followed the pattern.</h2><p>You practiced pressure, manipulation, and social pressure without shame or rushing.</p><p class="session-note">${sessionOnlyNote} Take a screenshot if you want to keep your Story Mode progress.</p></article>`:`<article class="story-card"><div class="story-progress">${storyChapters.map((_,i)=>`<i class="${i<mastery.story?'done':''}"></i>`).join('')}</div><span class="eyebrow">${item.title}</span><h2>${item.scenario}</h2><p>${item.tie}</p><button class="story-choice" type="button" data-story-safe="true">${item.safe}</button><button class="story-choice" type="button" data-story-safe="false">Respond quickly so the opportunity does not disappear.</button></article>`};
const rapidItems=[{text:"A new account asks you to keep a conversation secret.",safe:false},{text:"You use a company�s official app instead of an unexpected text link.",safe:true},{text:"A familiar voice demands money, so you call their known number first.",safe:true},{text:"You share a verification code because a message feels urgent.",safe:false},{text:"You pause before moving a new conversation to a private app.",safe:true}];
const renderRapid=()=>{const mount=$("#rapid-fire");if(!mount)return;const mastery=getMastery(),index=mastery.rapidIndex||0,item=rapidItems[index%rapidItems.length];mount.innerHTML=`<article class="rapid-card"><div class="rapid-stats"><span>Streak: ${mastery.rapidStreak}</span><span>Best: ${mastery.rapidBest}</span><span>Timer: <b class="rapid-timer">10</b></span></div><span class="eyebrow">Rapid choice</span><h2>${item.text}</h2><div class="rapid-choice-row"><button class="rapid-choice safe" type="button" data-rapid="safe">Safe</button><button class="rapid-choice unsafe" type="button" data-rapid="unsafe">Unsafe</button></div></article>`;let remaining=10;clearInterval(window.rapidTimer);if(!reduceMotion)window.rapidTimer=setInterval(()=>{const timer=$(".rapid-timer");if(!timer)return clearInterval(window.rapidTimer);timer.textContent=--remaining;if(remaining<=0){clearInterval(window.rapidTimer);announce("Time to pause. Try the next situation.")}},1000)};
const renderCreator=()=>{const mount=$("#red-flag-creator");if(!mount)return;mount.innerHTML=`<article class="creator-card"><form class="creator-form"><label>Category<select name="category"><option>Pressure</option><option>Manipulation</option><option>Fake content</option><option>Unsafe request</option></select></label><label>Example behavior<input name="behavior" required placeholder="For example: They say it must happen now"></label><label>Warning signs<textarea name="signs" required placeholder="Secrecy, urgency, payment, private move..."></textarea></label><label>Safe response<textarea name="response" required placeholder="Pause, verify another way, or talk to someone calm."></textarea></label><button class="button primary" type="submit">Build my red flag</button></form><div class="creator-output"></div></article>`;$(".creator-form",mount).addEventListener("submit",event=>{event.preventDefault();const data=new FormData(event.currentTarget),mastery=getMastery();mastery.redFlags++;saveMastery(mastery);awardInstinctXP(8,"Custom red flag created");unlockAchievements();$(".creator-output",mount).innerHTML=`<article class="red-flag-preview reveal"><span class="app-tag">${data.get("category")}</span><h3>Red flag: ${data.get("behavior")}</h3><p><b>Warning signs:</b> ${data.get("signs")}</p><p><b>Safe move:</b> ${data.get("response")}</p><p class="session-note">Your custom red flags are session-only. Screenshot them if you want to keep them.</p></article>`})};
const addMasteryNav=()=>{const nav=$(".site-nav");if(!nav)return;["storymode.html","rapidfire.html","redflagcreator.html"].forEach((page,index)=>{if(!$(`a[href="${page}"]`,nav))nav.insertAdjacentHTML("beforeend",`<a href="${page}">${["Story Mode","Rapid Fire","Red Flag Creator"][index]}</a>`)})};
addMasteryNav();refreshMastery();renderStory();renderRapid();renderCreator();
document.addEventListener("click",event=>{const button=event.target.closest("button");if(!button)return;if(button.classList.contains("story-choice")){const card=button.closest(".story-card"),safe=button.dataset.storySafe==="true";$$(".story-choice",card).forEach(item=>item.disabled=true);button.classList.add(safe?"correct":"caution");card.insertAdjacentHTML("beforeend",`<div class="feedback show">${safe?"<b>Strong move.</b> You paused the pressure and kept your options.":"<b>Try again with a pause.</b> A fast response is what pressure is asking for."}</div>`);if(safe){const mastery=getMastery();mastery.story++;saveMastery(mastery);awardInstinctXP(10,"Story chapter complete");unlockAchievements();setTimeout(()=>{renderStory();refreshMastery()},650)}return}if(button.classList.contains("rapid-choice")){const mastery=getMastery(),item=rapidItems[(mastery.rapidIndex||0)%rapidItems.length],correct=(button.dataset.rapid==="safe")===item.safe;mastery.rapidIndex=(mastery.rapidIndex||0)+1;mastery.rapidStreak=correct?mastery.rapidStreak+1:0;mastery.rapidBest=Math.max(mastery.rapidBest,mastery.rapidStreak);saveMastery(mastery);button.classList.add(correct?"correct":"caution");if(correct)awardInstinctXP(5,"Rapid-fire safe choice");unlockAchievements();setTimeout(()=>{renderRapid();refreshMastery()},400);return}if(button.classList.contains("screenshot-achievements")||button.classList.contains("screenshot-story")||button.classList.contains("screenshot-redflags")){refreshProgress();const shot=$(".screenshot-view");$(".screenshot-content",shot).insertAdjacentHTML("beforeend",`<div class="screenshot-dashboard">${achievementMarkup()}<p>You�re building strong instincts online. Share this with someone who supports you.</p></div>`);shot.classList.add("open")}});

document.addEventListener("click",event=>{const choice=event.target.closest(".story-choice[data-story-safe='true']");if(!choice)return;addPet("story-evolution-"+getMastery().story);refreshProgress();refreshMastery();announce("Story chapter complete. Your session pet collection evolved.")});

// Age is session-only, unverified, and used only to select safe training content.
const ageKey="readyonline-session-age",assignmentKey="readyonline-session-assignment";
const query=new URLSearchParams(location.search);if(query.get("age")){sessionStorage.setItem(ageKey,query.get("age"));if(query.get("modules"))sessionStorage.setItem(assignmentKey,query.get("modules"))}
const getAge=()=>Number(sessionStorage.getItem(ageKey)||0);
const getAgeGroup=age=>age>=60?"senior":age>=18?"young-adult":age>=14?"teen":age>0?"younger":"";
const pathInfo={younger:{label:"7th Grade & Younger",note:"Gentle practice for friendship safety, red flags, simple danger simulations, and pet companions."},teen:{label:"8th�12th Grade",note:"Safe, non-explicit practice for manipulation, social pressure, chat-switching, AI awareness, and supporting a friend."},"young-adult":{label:"18�22 Young Adult",note:"Safe, practical practice for scams, identity protection, digital reputation, and online professionalism."},senior:{label:"Retiree / Senior",note:"Calm, high-contrast practice for scam recognition, passwords, cognitive load, and safe browsing."}};
const ageStep=`<span class='eyebrow'>Age-appropriate path</span><h2>Choose a safe training pace.</h2><div class='age-entry'><label for='session-age'>Your age, or the age a parent/trusted adult entered for you</label><input id='session-age' inputmode='numeric' min='1' max='120' type='number' value='${getAge()||""}'><p class='session-note'>Age is used only to show age-appropriate content. It is not verified and is not stored.</p><button class='button primary save-age' type='button'>Use this age for this session</button></div>`;
if(!onboardingSteps.some(step=>step.includes("session-age")))onboardingSteps.splice(1,0,ageStep);
const safeContentNotice="ReadyOnline does not show explicit content. All scenarios are safe, age-appropriate, and focused on digital instincts.";
const applyAgePath=()=>{const group=getAgeGroup(getAge()),info=pathInfo[group];$$(".age-notice").forEach(item=>item.remove());const main=$("main");if(main)main.insertAdjacentHTML("afterbegin",`<div class='container age-notice'>${safeContentNotice}${info?` <b>${info.label}:</b> ${info.note}`:" Choose an age in onboarding to tailor the path."}${sessionStorage.getItem(assignmentKey)?" This link was created by a parent or trusted adult.":""}</div>`);$$("main .card").forEach((card,index)=>{const groups=card.dataset.ageGroups||["younger","teen","young-adult","senior"];const allowed=!group||groups.includes(group);card.classList.toggle("age-hidden",!allowed);const assigned=sessionStorage.getItem(assignmentKey)?.split(",");if(assigned?.length&&card.dataset.moduleId)card.classList.toggle("age-hidden",!assigned.includes(card.dataset.moduleId))});return group};
const assignAgeGroups=()=>{const groupOrder=[["younger","teen"],["teen","young-adult"],["young-adult","senior"],["senior"]];$$("main .card").forEach((card,index)=>{if(!card.dataset.ageGroups)card.dataset.ageGroups=groupOrder[index%groupOrder.length].join(",")})};
const addParentRouting=()=>{if(!location.pathname.endsWith("parents.html")||$(".assignment-builder"))return;const main=$("main");main?.insertAdjacentHTML("beforeend",`<section class='container section assignment-builder'><span class='eyebrow'>Parent or trusted-adult routing</span><h2>Create a safe training link.</h2><p>Age is used only to show age-appropriate content. It is not verified and is not stored. The link carries only the selected age and module choices�progress remains session-only for the child.</p><label>Child's age <input class='assigned-age' type='number' min='1' max='120' inputmode='numeric'></label><fieldset><legend>Assign modules</legend><label><input type='checkbox' value='catalogue.html-1' checked> Foundation instincts</label><label><input type='checkbox' value='catalogue.html-2' checked> AI and safe content</label><label><input type='checkbox' value='catalogue.html-3'> Platform pressure practice</label></fieldset><button class='button primary generate-assignment' type='button'>Generate training link</button><div class='assignment-link' aria-live='polite'>Choose an age and modules to create a link.</div></section>`) };
const adaptActivities=()=>{const group=getAgeGroup(getAge());if(!group)return;const sets={younger:{story:[{title:"A new game friend",scenario:"Someone in a game asks you to leave the group and join a private space.",safe:"Stay with the group and tell a trusted adult if the request feels confusing.",tie:"Friendship safety: safe friends do not need secrecy."}],rapid:[{text:"A friend says you have to keep a game chat secret.",safe:false},{text:"You ask a trusted adult before clicking a surprise link.",safe:true}]},teen:{story:storyChapters,rapid:rapidItems},"young-adult":{story:[{title:"A job offer arrives fast",scenario:"A new contact says you must share account details today to secure a job opportunity.",safe:"Use an official company channel and never share account information through an unexpected message.",tie:"Professionalism: real opportunities do not require rushed secrets."}],rapid:[{text:"You verify a job offer through an official company website.",safe:true},{text:"You send a verification code to keep a professional opportunity.",safe:false}]},senior:{story:[{title:"The urgent account alert",scenario:"A text says your account is locked and asks you to use its link right now.",safe:"Open the official app or call the number you already know.",tie:"Tech can feel fast. Your pause is still the right move."}],rapid:[{text:"You call the number on your card after an unexpected account alert.",safe:true},{text:"You use a package text link to enter payment details.",safe:false}]}};const set=sets[group];if(set){storyChapters.splice(0,storyChapters.length,...set.story);rapidItems.splice(0,rapidItems.length,...set.rapid);renderStory();renderRapid();const category=$(".creator-form select[name='category']");if(category){category.innerHTML=(group==="younger"?["Friendship safety","Unexpected link","Pressure"]:group==="senior"?["Phishing","Account alert","Unexpected request"]:["Pressure","Manipulation","Fake content","Unsafe request"]).map(item=>`<option>${item}</option>`).join("")}}};
assignAgeGroups();addParentRouting();applyAgePath();adaptActivities();
document.addEventListener("click",event=>{const button=event.target.closest("button");if(!button)return;if(button.classList.contains("save-age")){const age=Number($("#session-age")?.value);if(age<1||age>120){announce("Enter an age from 1 to 120.");return}sessionStorage.setItem(ageKey,String(age));applyAgePath();adaptActivities();announce("Age-appropriate training path selected for this session.");return}if(button.classList.contains("generate-assignment")){const age=Number($(".assigned-age")?.value),modules=$$(".assignment-builder input[type='checkbox']:checked").map(item=>item.value);if(age<1||age>120){announce("Enter a child's age to create the link.");return}const url=new URL("catalogue.html",location.href);url.searchParams.set("age",age);url.searchParams.set("modules",modules.join(","));$(".assignment-link").textContent=url.href;announce("Session-only training link created.")}});

const welcomeKey="readyonline-session-welcome";
const addFeedback=()=>{let footer=$(".site-footer")||$("body > footer");const link='<a class="feedback-button" href="https://forms.cloud.microsoft/r/yKYN515r8L" target="_blank" rel="noopener noreferrer" title="Share your thoughts to help improve ReadyOnline." aria-label="Feedback: share your thoughts to help improve ReadyOnline, opens in a new tab">Feedback</a>';if(!footer){document.body.insertAdjacentHTML("beforeend",`<footer class="site-footer"><div class="container footer-content"><span>ReadyOnline</span><div class="footer-links"></div></div></footer>`);footer=$(".site-footer")}if(!$(".feedback-button",footer)){const links=$(".footer-links",footer);if(links)links.insertAdjacentHTML("beforeend",link);else footer.insertAdjacentHTML("beforeend",link)}};
const addWelcome=()=>{if(sessionStorage.getItem(welcomeKey)||$(".welcome-screen"))return;document.body.insertAdjacentHTML("beforeend",`<section class="welcome-screen" role="dialog" aria-modal="true" aria-labelledby="welcome-title"><div class="welcome-card"><div class="welcome-mark" aria-hidden="true">?</div><span class="eyebrow">Digital instincts for life</span><h1 id="welcome-title">Welcome to ReadyOnline</h1><p>This is a practice space to build digital instincts and explore online safety.</p><p class="session-note">Your progress is saved only for this session. If you close your browser, it resets.</p><p>Take screenshots if you want to keep your pet collection or completed modules.</p><button class="button primary enter-readyonline" type="button">Enter ReadyOnline</button></div></section>`);$(".enter-readyonline")?.focus()};
addFeedback();addWelcome();
document.addEventListener("click",event=>{if(!event.target.closest(".enter-readyonline"))return;sessionStorage.setItem(welcomeKey,"seen");document.body.classList.add("page-leave");setTimeout(()=>location.href="index.html",160)});

(() => {
  const learnMore = document.querySelector('.learn-more-section');
  if (!learnMore) return;

  const cards = [...learnMore.querySelectorAll('.technical-document')];
  const closeCard = card => {
    if (!card.open) return;
    const summary = card.querySelector('summary');
    const startHeight = card.offsetHeight;
    const endHeight = summary.offsetHeight;
    card.style.overflow = 'hidden';
    const animation = card.animate(
      [{ height: `${startHeight}px` }, { height: `${endHeight}px` }],
      { duration: 300, easing: 'ease-in-out' }
    );
    animation.onfinish = () => {
      card.open = false;
      card.style.height = '';
      card.style.overflow = '';
    };
  };

  cards.forEach(card => {
    const summary = card.querySelector('summary');
    summary.addEventListener('click', event => {
      if (card.open) {
        event.preventDefault();
        closeCard(card);
      }
    });
    card.addEventListener('toggle', () => {
      if (card.open) cards.filter(other => other !== card).forEach(closeCard);
    });
    card.addEventListener('pointerdown', event => {
      if (event.pointerType !== 'touch') return;
      card.classList.add('is-tapped');
      window.setTimeout(() => card.classList.remove('is-tapped'), 350);
    });
  });

  if (!('IntersectionObserver' in window)) {
    cards.forEach(card => card.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  cards.forEach(card => observer.observe(card));
})();

(() => {
  const sharedNavigation = () => {
    const nav = document.querySelector(".site-nav");
    if (nav) {
      const before = nav.querySelector(".nav-cta");
      [
        ["about.html", "About Us"],
        ["contact.html", "Contact"]
      ].forEach(([href, label]) => {
        if (!nav.querySelector(`a[href="${href}"]`)) {
          const link = document.createElement("a");
          link.href = href;
          link.textContent = label;
          nav.insertBefore(link, before);
        }
      });
    }

    document.querySelectorAll(".footer-links").forEach(footer => {
      [
        ["about.html", "About Us"],
        ["contact.html", "Contact"]
      ].forEach(([href, label]) => {
        if (!footer.querySelector(`a[href="${href}"]`)) {
          const link = document.createElement("a");
          link.href = href;
          link.textContent = label;
          footer.append(link);
        }
      });
    });
  };

  const initializePetExperience = () => {
    document.querySelectorAll("[data-xp]").forEach(box => {
      const xp = Number(box.dataset.xp);
      const bar = box.querySelector(".xp-bar i");
      if (bar && Number.isFinite(xp)) {
        bar.style.width = "0%";
        requestAnimationFrame(() => {
          bar.style.width = `${xp}%`;
        });
      }
    });
  };

  const initializeFeedbackForm = () => {
    const form = document.querySelector("[data-contact-form]");
    if (!form) return;

    form.addEventListener("submit", event => {
      event.preventDefault();
      const status = form.querySelector("[data-form-status]");
      if (status) {
        status.textContent = "Thanks for sharing. This feedback form is a placeholder and does not send information yet.";
      }
    });
  };

  sharedNavigation();
  initializePetExperience();
  initializeFeedbackForm();
})();

(() => {
  const cards = document.querySelectorAll('.card, .module, .danger-card, .pet-card, .learning-card, .objective-card, .accountability-card, .technical-document');
  cards.forEach(card => {
    card.classList.add('interactive-card');
    card.addEventListener('pointerdown', event => {
      if (event.pointerType !== 'touch') return;
      card.classList.add('is-tapped');
      window.setTimeout(() => card.classList.remove('is-tapped'), 300);
    });
  });

  const revealTargets = document.querySelectorAll('main .section-heading, main .learn-more-header, main .grid, main .xp, main .learning-section, main .accountability-section, main .learn-more-section');
  if (!('IntersectionObserver' in window)) {
    revealTargets.forEach(target => target.classList.add('is-revealed'));
  } else {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px' });
    revealTargets.forEach(target => {
      target.classList.add('scroll-reveal');
      revealObserver.observe(target);
    });
  }

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || link.target || link.hasAttribute('download') || event.defaultPrevented) return;
    const destination = new URL(link.href, window.location.href);
    if (destination.origin !== window.location.origin || destination.pathname !== window.location.pathname || destination.hash) return;
    event.preventDefault();
    document.body.classList.add('page-leaving');
    window.setTimeout(() => { window.location.href = destination.href; }, 180);
  });
})();

(() => {
  document.addEventListener('click', event => {
    const button = event.target.closest('.accordion-button');
    if (!button) return;
    const item = button.closest('.accordion-item');
    const group = button.closest('.accordion');
    if (!item || !group) return;
    window.setTimeout(() => {
      if (!item.classList.contains('open')) return;
      group.querySelectorAll('.accordion-item.open').forEach(other => {
        if (other !== item) other.classList.remove('open');
      });
    }, 0);
  });
})();

(() => {
  const typeLoop = element => {
    const text = element.dataset.typing;
    if (!text || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let position = 0;
    let deleting = false;
    const tick = () => {
      element.textContent = deleting ? text.slice(0, position--) : text.slice(0, position++);
      if (!deleting && position > text.length) {
        deleting = true;
        window.setTimeout(tick, 1500);
        return;
      }
      if (deleting && position < 0) {
        deleting = false;
        position = 0;
      }
      window.setTimeout(tick, deleting ? 45 : 90);
    };
    tick();
  };

  document.querySelectorAll(".site-footer p:not([data-typing])").forEach(footerText => {
    footerText.dataset.typing = footerText.textContent.trim() || "Pause · Think · Act";
  });
  document.querySelectorAll("[data-typing]").forEach(typeLoop);

  document.querySelectorAll("[data-companion-gallery]").forEach(gallery => {
    const status = document.querySelector("[data-companion-status]");
    gallery.addEventListener("click", event => {
      const card = event.target.closest("[data-companion]");
      if (!card) return;
      gallery.querySelectorAll("[data-companion]").forEach(item => item.classList.toggle("is-selected", item === card));
      if (status) status.textContent = `${card.dataset.companion} is ready with a ${card.dataset.power}.`;
    });
  });
})();

// ReadyOnline Master Context: Section 14 - Crisis Support Placement
(() => {
  fetch("data/crisis-resources.json")
    .then(response => response.ok ? response.json() : Promise.reject())
    .then(data => {
      const primary = data.resources[0];
      document.querySelectorAll(".site-nav").forEach(nav => {
        let control = nav.querySelector(".crisis-link");
        if (!control) {
          control = document.createElement("a");
          control.className = "crisis-link";
          nav.append(control);
        }
        control.href = primary.href;
        control.textContent = "Get help: " + primary.contact;
        control.setAttribute("aria-label", primary.name + ": " + primary.contact);
      });
    })
    .catch(() => {});
})();
