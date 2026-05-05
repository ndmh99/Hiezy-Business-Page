/**
 * HIEZY Inspiration Hub Engine
 * Handles the 3D card swapping and content rendering for the Inspiration gallery.
 */

const InspirationEngine = (function() {
  let config = {
    containerId: 'inspiration-content',
    stackId: 'inspiration-stack'
  };

  /**
   * Generates the HTML for a project card stack
   */
  function generateStackHTML(data) {
    return `
      <div class="lg:col-span-7 relative group mb-12 lg:mb-0" id="${config.stackId}">
        <div class="invisible w-full aspect-[16/10]"></div>
        <div id="card-a" class="inspiration-card pos-front rounded-2xl border border-border bg-white p-2 shadow-2xl cursor-zoom-in" onclick="openInspirationLightbox('${data.img1}')">
          <img src="${data.img1}" class="rounded-xl w-full aspect-[16/10] object-cover" alt="Page 1">
        </div>
        <div id="card-b" class="inspiration-card pos-behind rounded-2xl border border-border bg-white p-2 shadow-xl cursor-pointer" onclick="InspirationEngine.swapCards(this)">
          <img src="${data.img2}" class="rounded-xl w-full aspect-[16/10] object-cover" alt="Page 2">
        </div>
        <div class="absolute -bottom-6 right-10 carousel-controls-container flex items-center gap-2">
          <button onclick="cycleProject(-1)" aria-label="Previous portfolio project" class="h-12 w-12 rounded-full bg-white border border-border shadow-lg flex items-center justify-center text-ink hover:text-accent hover:border-accent transition-all active:scale-95">
            <i class="ti ti-arrow-left"></i>
          </button>
          <button onclick="cycleProject(1)" aria-label="Next portfolio project" class="h-12 w-12 rounded-full bg-white border border-border shadow-lg flex items-center justify-center text-ink hover:text-accent hover:border-accent transition-all active:scale-95">
            <i class="ti ti-arrow-right"></i>
          </button>
        </div>
      </div>
    `;
  }

  /**
   * Generates the HTML for project info text
   */
  function generateInfoHTML(data) {
    const tags = data.tags.map((tag, i) => 
      `<span class="px-3 py-1 ${i === 0 ? 'bg-accent/10 text-accent' : 'bg-slate-100 text-slate2'} rounded-full text-[10px] font-bold uppercase tracking-widest">${tag}</span>`
    ).join('');

    return `
      <div class="lg:col-span-5 flex flex-col justify-center">
        <div class="flex items-center gap-3 mb-6">${tags}</div>
        <h3 class="font-display text-3xl sm:text-4xl font-extrabold text-ink mb-6">${data.title}</h3>
        <p class="text-lg text-slate2 leading-relaxed mb-8">${data.description}</p>
        <a href="inspirations.html" class="mt-6 inline-flex items-center justify-center gap-2 bg-white border border-ink px-5 py-2.5 font-sansita text-base font-semibold text-ink shadow-[4px_4px_0px_0px_#0b1220] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#0b1220] active:translate-x-[0px] active:translate-y-[0px] active:shadow-[2px_2px_0px_0px_#0b1220] focus-ring">
          Explore gallery <i class="ti ti-arrow-right"></i>
        </a>
      </div>
    `;
  }

  return {
    render: function(data) {
      const container = document.getElementById(config.containerId);
      if (!container) return;

      container.classList.add('inspiration-exit');
      setTimeout(() => {
        container.innerHTML = generateStackHTML(data) + generateInfoHTML(data);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            container.classList.remove('inspiration-exit');
          });
        });
      }, 400);
    },

    swapCards: function(clickedElement) {
      const cardA = document.getElementById('card-a');
      const cardB = document.getElementById('card-b');
      if (!cardA || !cardB) return;

      const isAFront = cardA.classList.contains('pos-front');
      const frontCard = isAFront ? cardA : cardB;
      const behindCard = isAFront ? cardB : cardA;

      if (clickedElement !== behindCard || frontCard.classList.contains('animate-slide-back')) return;

      frontCard.classList.add('animate-slide-back');
      behindCard.classList.add('animate-swing-front');

      setTimeout(() => {
        frontCard.classList.remove('pos-front', 'animate-slide-back', 'cursor-zoom-in');
        frontCard.classList.add('pos-behind');
        frontCard.onclick = () => InspirationEngine.swapCards(frontCard);

        behindCard.classList.remove('pos-behind', 'animate-swing-front');
        behindCard.classList.add('pos-front', 'cursor-zoom-in');
        
        // Use the actual image data from project context or just get it from the img tag
        const frontImgSrc = behindCard.querySelector('img').src;
        behindCard.onclick = () => openInspirationLightbox(frontImgSrc);
      }, 800);
    }
  };
})();
