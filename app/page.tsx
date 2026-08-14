"use client";

import { useEffect } from "react";

const WA = "https://wa.me/5513997182256?text=Ol%C3%A1%2C%20Everaldo!%20Quero%20solicitar%20minha%20avalia%C3%A7%C3%A3o.";

function Arrow(){ return <span aria-hidden="true">↗</span> }
function WhatsAppIcon(){
  return <svg className="wa-icon" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93a7.898 7.898 0 0 0-2.327-5.607zM7.998 14.52a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.157-.25a6.56 6.56 0 1 1 5.581 3.093zm3.602-4.92c-.197-.099-1.17-.578-1.352-.644-.182-.066-.314-.099-.445.099-.132.197-.511.644-.627.775-.116.132-.231.148-.429.05-.197-.1-.833-.307-1.587-.98-.586-.522-.982-1.168-1.098-1.366-.116-.197-.012-.304.087-.402.088-.088.197-.231.296-.347.099-.115.132-.197.198-.329.066-.132.033-.247-.017-.346-.049-.099-.445-1.073-.61-1.47-.16-.386-.323-.334-.445-.34h-.379c-.132 0-.346.05-.527.247-.182.198-.693.677-.693 1.651s.71 1.915.808 2.047c.099.132 1.397 2.132 3.385 2.992.473.204.842.326 1.129.417.474.151.905.13 1.246.079.38-.057 1.17-.479 1.335-.94.165-.462.165-.858.116-.94-.05-.083-.182-.132-.38-.231z"/></svg>
}
function StageIcon({type}:{type:"assessment"|"strategy"|"progress"|"training"|"nutrition"}){
  if(type==="assessment") return <svg className="stage-icon" viewBox="0 0 48 48" aria-hidden="true"><path d="M16 8h16M18 6v4m12-4v4M11 14h26v25H11zM17 21h14M17 27h9M34 31l4 4 7-9"/></svg>;
  if(type==="strategy") return <svg className="stage-icon" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="16"/><circle cx="24" cy="24" r="8"/><path d="M24 4v8m0 24v8M4 24h8m24 0h8m-20-3 13-10-10 13-3 3z"/></svg>;
  if(type==="progress") return <svg className="stage-icon" viewBox="0 0 48 48" aria-hidden="true"><path d="M8 38h32M11 34l9-10 7 6 11-17"/><path d="M30 13h8v8"/></svg>;
  if(type==="training") return <svg className="stage-icon" viewBox="0 0 48 48" aria-hidden="true"><path d="M4 19v10m6-14v18m28-18v18m6-14v10M10 24h28"/></svg>;
  return <svg className="stage-icon" viewBox="0 0 48 48" aria-hidden="true"><path d="M24 41c10-7 15-15 15-24-9 0-15 4-15 12 0-8-6-12-15-12 0 9 5 17 15 24zM24 29v13"/></svg>;
}
function CTA({children="Solicitar minha avaliação", className=""}:{children?:React.ReactNode,className?:string}){
  return <a className={`cta ${className}`} href={WA} target="_blank" rel="noreferrer"><span>{children}</span><Arrow/></a>
}

export default function Home(){
  useEffect(()=>{
    const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els=[...document.querySelectorAll<HTMLElement>("[data-reveal]")];
    if(reduced){els.forEach(e=>e.classList.add("is-visible"));return}
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("is-visible");io.unobserve(e.target)}}),{threshold:.14});
    els.forEach(e=>io.observe(e));
    let raf=0;
    const move=()=>{raf=0;const y=scrollY;document.documentElement.style.setProperty("--scroll",String(y));document.querySelectorAll<HTMLElement>("[data-speed]").forEach(el=>{const r=el.parentElement?.getBoundingClientRect();if(!r)return;const speed=Number(el.dataset.speed||0);el.style.transform=`translate3d(0,${(r.top-innerHeight/2)*speed}px,0)`})};
    const onScroll=()=>{if(!raf)raf=requestAnimationFrame(()=>{move();const max=document.documentElement.scrollHeight-innerHeight;document.documentElement.style.setProperty("--progress",max?String(scrollY/max):"0")})};
    const onPointer=(e:PointerEvent)=>{document.documentElement.style.setProperty("--mx",e.clientX+"px");document.documentElement.style.setProperty("--my",e.clientY+"px")};
    const magnetic=[...document.querySelectorAll<HTMLElement>(".cta,.wa-float")];
    const enterMag=(e:PointerEvent)=>{const el=e.currentTarget as HTMLElement;const r=el.getBoundingClientRect();el.style.setProperty("--tx",((e.clientX-r.left-r.width/2)*.12)+"px");el.style.setProperty("--ty",((e.clientY-r.top-r.height/2)*.12)+"px")};
    const leaveMag=(e:PointerEvent)=>{const el=e.currentTarget as HTMLElement;el.style.setProperty("--tx","0px");el.style.setProperty("--ty","0px")};
    addEventListener("scroll",onScroll,{passive:true});addEventListener("pointermove",onPointer,{passive:true});magnetic.forEach(el=>{el.addEventListener("pointermove",enterMag);el.addEventListener("pointerleave",leaveMag)});move();onScroll();
    return()=>{io.disconnect();removeEventListener("scroll",onScroll);removeEventListener("pointermove",onPointer);magnetic.forEach(el=>{el.removeEventListener("pointermove",enterMag);el.removeEventListener("pointerleave",leaveMag)});if(raf)cancelAnimationFrame(raf)}
  },[]);

  return <main>
    <div className="scroll-progress" aria-hidden="true"/>
    <div className="cursor-glow" aria-hidden="true"/>
    <header className="header">
      <a className="logo" href="#inicio"><b>EM</b><span>EVERALDO<br/>MONTEIRO</span></a>
      <nav><a href="#metodo">Método</a><a href="#resultados">Autoridade</a><a href="#sobre">Sobre</a></nav>
      <CTA className="header-cta">Avaliação</CTA>
    </header>

    <section className="hero" id="inicio">
      <div className="hero-media"><img data-speed="0.08" src="/everaldo-hero.webp" alt="Everaldo Monteiro, atleta Classic Physique"/></div>
      <div className="hero-overlay"/>
      <div className="blue-orbit orbit-one" data-speed="-0.04"/><div className="blue-orbit orbit-two" data-speed="0.06"/>
      <div className="hero-content">
        <p className="kicker hero-in i1"><span className="kicker-dot"/> Consultoria presencial e online</p>
        <h1 className="hero-in i2"><span>TRANSFORME</span><span>O SEU <i>SHAPE.</i></span></h1>
        <p className="hero-sub hero-in i3">Treino, estratégia alimentar e acompanhamento individual para construir um resultado que você consegue manter.</p>
        <div className="hero-actions hero-in i4"><CTA/><a className="text-link" href="#metodo">Conhecer mais <span>↓</span></a></div>
      </div>
      <div className="hero-proof hero-in i4"><span>ATLETA</span><b>CLASSIC<br/>PHYSIQUE</b><small>EXPERIÊNCIA REAL<br/>ALTA PERFORMANCE</small></div>
      <div className="hero-meta">CLASSIC PHYSIQUE · COACH · ATLETA</div>
      <a className="scroll-cue" href="#dor"><span>SCROLL</span><b>↓</b></a>
    </section>

    <section className="pain section-light" id="dor">
      <div className="section-index">IDENTIFICAÇÃO</div>
      <div className="pain-copy" data-reveal><p className="eyebrow">SEM DIREÇÃO, ESFORÇO VIRA FRUSTRAÇÃO.</p><h2>Seu corpo fala.<br/>O método <i>traduz.</i></h2><p className="lead">Uma estratégia clara conecta o que você faz hoje ao resultado que quer construir amanhã.</p></div>
      <div className="pain-visual reveal-image" data-reveal><img data-speed=".045" loading="lazy" src="/everaldo-dark.webp" alt="Everaldo Monteiro durante preparação"/></div>
      <div className="pain-list" data-reveal><div><span className="pain-mark"/><p>Treinar sem saber se está realmente evoluindo.</p></div><div><span className="pain-mark"/><p>Começar dietas impossíveis de manter.</p></div><div><span className="pain-mark"/><p>Perder consistência por falta de acompanhamento.</p></div></div>
    </section>

    <section className="solution" id="metodo">
      <div className="solution-head" data-reveal><div className="section-index light">O SISTEMA</div><p>ESTRATÉGIA INDIVIDUAL</p><h2>ORIENTAÇÃO CLARA.<br/>AÇÃO <i>PRECISA.</i></h2></div>
      <div className="sticky-wrap">
        <aside><p>O método</p><h3>Clareza para<br/>evoluir de verdade.</h3><CTA className="cta-contextual">Falar com Everaldo</CTA></aside>
        <div className="benefits">
          <article data-reveal><StageIcon type="training"/><div><h4>Treino personalizado</h4><p>Construído para o seu nível, rotina e objetivo — não para uma média genérica.</p></div></article>
          <article data-reveal><StageIcon type="nutrition"/><div><h4>Estratégia alimentar</h4><p>Direção prática para sustentar sua evolução sem depender de extremos.</p></div></article>
          <article data-reveal><StageIcon type="progress"/><div><h4>Acompanhamento próximo</h4><p>Feedback, ajustes e decisões baseadas no seu progresso real.</p></div></article>
        </div>
      </div>
    </section>

    <section className="results" id="resultados">
      <div className="results-head" data-reveal><div><div className="section-index">AUTORIDADE</div><h2>AUTORIDADE<br/>QUE SE <i>constrói.</i></h2></div><p>O processo é vivido todos os dias. Disciplina, técnica e consistência transformam intenção em resultado.</p></div>
      <div className="gallery">
        <figure className="wide reveal-image" data-reveal><div><img data-speed=".04" loading="lazy" src="/everaldo-palco.webp" alt="Everaldo Monteiro competindo"/></div><figcaption><span>COMPETIÇÃO</span><b>CLASSIC PHYSIQUE</b></figcaption></figure>
        <figure className="tall reveal-image" data-reveal><div><img data-speed=".055" loading="lazy" src="/everaldo-trofeus.webp" alt="Everaldo Monteiro com troféus"/></div><figcaption><span>EXPERIÊNCIA REAL</span><b>DISCIPLINA PREMIADA</b></figcaption></figure>
      </div>
    </section>

    <section className="about" id="sobre">
      <div className="about-photo reveal-image" data-reveal><img data-speed=".04" loading="lazy" src="/everaldo-hero.webp" alt="Retrato de Everaldo Monteiro"/></div>
      <div className="about-copy" data-reveal><div className="section-index light">SOBRE</div><p className="eyebrow blue">ATLETA CLASSIC PHYSIQUE</p><h2>EVERALDO<br/><i>MONTEIRO.</i></h2><p>O acompanhamento de quem conhece a alta performance por dentro. Experiência prática para transformar esforço em um plano inteligente, possível e sustentável.</p><a className="instagram" href="https://www.instagram.com/_everaldomonteiro/" target="_blank" rel="noreferrer">@_everaldomonteiro <Arrow/></a></div>
    </section>

    <section className="process section-light">
      <div className="process-head" data-reveal><div className="section-index">A JORNADA</div><h2>SEU CAMINHO.<br/><i>Sem ruído.</i></h2></div>
      <div className="steps journey">
        <article data-reveal><StageIcon type="assessment"/><span>AVALIAÇÃO</span><h3>Entendemos seu momento</h3><p>Seu objetivo, rotina e necessidades formam o ponto de partida.</p></article>
        <article data-reveal><StageIcon type="strategy"/><span>ESTRATÉGIA</span><h3>Construímos seu plano</h3><p>Treino e direcionamento são organizados para a sua realidade.</p></article>
        <article data-reveal><StageIcon type="progress"/><span>ACOMPANHAMENTO</span><h3>Ajustamos sua evolução</h3><p>Feedback e decisões acompanham o progresso real.</p></article>
      </div>
    </section>

    <section className="faq section-light">
      <div className="faq-title" data-reveal><div className="section-index">FAQ</div><h2>DÚVIDAS<br/><i>frequentes.</i></h2></div>
      <div className="faq-list">
        <details data-reveal><summary>O atendimento é online ou presencial?<span>+</span></summary><p>As duas modalidades estão disponíveis. Os detalhes do presencial são confirmados diretamente na avaliação.</p></details>
        <details data-reveal><summary>O plano é individual?<span>+</span></summary><p>Sim. A estratégia considera objetivo, nível atual, rotina e capacidade de execução.</p></details>
        <details data-reveal><summary>Como começo?<span>+</span></summary><p>Clique em solicitar avaliação e fale diretamente com o Everaldo pelo WhatsApp.</p></details>
      </div>
    </section>

    <section className="final-cta">
      <div className="final-glow" data-speed="-.08"/><div className="final-content" data-reveal><p>O PRÓXIMO PASSO É UMA CONVERSA.</p><h2>CLAREZA PARA<br/><i>EVOLUIR DE VERDADE.</i></h2><span>Fale diretamente com Everaldo e solicite sua avaliação.</span><CTA>Quero minha avaliação</CTA></div>
    </section>

    <footer><a className="logo" href="#inicio"><b>EM</b><span>EVERALDO<br/>MONTEIRO</span></a><p>Treino personalizado e acompanhamento presencial ou online.</p><div><a href="https://www.instagram.com/_everaldomonteiro/" target="_blank" rel="noreferrer">Instagram ↗</a><a href={WA} target="_blank" rel="noreferrer">WhatsApp ↗</a></div><small>© 2026 Everaldo Monteiro</small></footer>
    <a className="wa-float" href={WA} target="_blank" rel="noreferrer" aria-label="Solicitar avaliação pelo WhatsApp"><WhatsAppIcon/><span>Solicitar avaliação</span><Arrow/></a>
    <a className="mobile-bar" href={WA} target="_blank" rel="noreferrer"><WhatsAppIcon/><span>Solicitar avaliação</span><b>↗</b></a>
  </main>
}
