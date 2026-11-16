    (() => {
      const overlay = document.getElementById('overlay');
      const openButton = document.getElementById('open-btn');
      const envelope = document.getElementById('envelope');
      const closeButton = document.getElementById('close-btn');
      const replayButton = document.getElementById('replay-btn');
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      let previousFocus = null;
      function shower() {
        if (prefersReduced) return;
        const colors = ['#f4a5bb','#f8d2dc','#d4ab68','#91c5e5','#ffffff','#c18da7'];
        for (let i=0; i<85; i++) {
          const piece = document.createElement('i');
          piece.className = 'confetti';
          piece.style.left = `${20 + Math.random()*60}%`;
          piece.style.top = `${10 + Math.random()*12}%`;
          piece.style.background = colors[Math.floor(Math.random()*colors.length)];
          piece.style.borderRadius = Math.random()>.5 ? '50%' : '2px';
          piece.style.width = `${5 + Math.random()*8}px`;
          piece.style.height = `${6 + Math.random()*12}px`;
          piece.style.setProperty('--dx', `${(Math.random()-.5)*window.innerWidth*1.7}px`);
          piece.style.setProperty('--dy', `${window.innerHeight*.65 + Math.random()*window.innerHeight*.6}px`);
          piece.style.setProperty('--spin', `${Math.random()*1200-600}deg`);
          piece.style.setProperty('--duration', `${2.3+Math.random()*1.8}s`);
          document.body.appendChild(piece);
          piece.addEventListener('animationend', () => piece.remove(), {once:true});
        }
      }
      function openCard() {
        previousFocus = document.activeElement;
        overlay.classList.add('show');
        overlay.setAttribute('aria-hidden','false');
        document.body.style.overflow = 'hidden';
        closeButton.focus();
        shower();
      }
      function closeCard() {
        overlay.classList.remove('show');
        overlay.setAttribute('aria-hidden','true');
        document.body.style.overflow = '';
        previousFocus?.focus();
      }
      openButton.addEventListener('click', openCard);
      envelope.addEventListener('click', openCard);
      envelope.addEventListener('keydown', e => {if(e.key==='Enter'||e.key===' '){e.preventDefault();openCard();}});
      closeButton.addEventListener('click', closeCard);
      replayButton.addEventListener('click', shower);
      overlay.addEventListener('click', e => {if(e.target===overlay)closeCard();});
      document.addEventListener('keydown', e => {
        if(e.key==='Escape' && overlay.classList.contains('show'))closeCard();
        if(e.key==='Tab' && overlay.classList.contains('show')){
          const focusable = [closeButton,replayButton];
          if(e.shiftKey && document.activeElement===focusable[0]) {e.preventDefault();focusable[1].focus();}
          if(!e.shiftKey && document.activeElement===focusable[1]) {e.preventDefault();focusable[0].focus();}
        }
      });
      if(!prefersReduced){
        for(let i=0;i<9;i++){
          const p=document.createElement('span');p.className='petal';
          p.style.left=`${Math.random()*100}%`;
          p.style.animationDuration=`${12+Math.random()*13}s`;
          p.style.animationDelay=`${Math.random()*-22}s`;
          p.style.setProperty('--dx',`${(Math.random()-.5)*240}px`);
          document.body.appendChild(p);
        }
      }
    })();
