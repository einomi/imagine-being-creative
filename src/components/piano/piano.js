import gsap from 'gsap';

class Piano {
  constructor() {
    const textEls = Array.from(document.querySelectorAll('[data-text] p'));

    textEls?.forEach((textEl) => {
      const text = textEl.textContent;
      const splitText = text
        ?.split('')
        .join('</span><span aria-hidden="true" data-letter>');
      textEl.innerHTML = `<span aria-hidden="true" data-letter>${splitText}</span>`;

      const letters = textEl.querySelectorAll('[data-letter]');

      gsap.fromTo(
        letters,
        {
          alpha: 0,
          y: 10,
        },
        {
          alpha: 1,
          y: 0,
          duration: 0.35,
          ease: 'sine.out',
          stagger: 0.1,
        }
      );

      gsap.to(letters, {
        duration: 0.1,
        ease: 'none',
        repeat: -1,

        // rotate on random angle between -5 and 5
        rotation: () => gsap.utils.random(-5, 5),

        yoyo: true,
        stagger: 0.1,
        repeatRefresh: true,
      });

      letters.forEach((letter) => {
        letter.addEventListener('mouseenter', () => {
          gsap.to(letter, {
            scale: 1.2,
            duration: 0.05,
            ease: 'sine.out',
          });
        });

        letter.addEventListener('mouseleave', () => {
          gsap.to(letter, {
            scale: 1,
            duration: 0.05,
            ease: 'sine.out',
          });
        });
      });
    });
  }
}

export default Piano;
