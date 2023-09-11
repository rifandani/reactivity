const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    const image = /** @type {HTMLImageElement} */ (entry.target);

    if (entry.isIntersecting) {
      image.src = image.dataset.src || '';

      observer.unobserve(image);
    }
  });
});

const divObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    const div = entry.target;

    if (entry.isIntersecting) {
      div.className = 'become-image';

      observer.unobserve(div);
    } else {
      div.className = 'become-nothing';
    }
  });
});

/**
 * progressive enhancement
 */
// const inViewport = (selector) => {
//   const element = document.querySelector(selector);
//   const elementBoundingClientRect = element && element.getBoundingClientRect();
//   const offset = 50;

//   if (elementBoundingClientRect) {
//     return (
//       elementBoundingClientRect.top - offset >= 0 &&
//       elementBoundingClientRect.bottom > 0 &&
//       elementBoundingClientRect.bottom + offset <= window.innerHeight
//     );
//   } else {
//     return false;
//   }
// };

// document.onscroll = () => {
//   if (inViewport('.lazy-image')) {
//     // replace image sources
//   }
// };
