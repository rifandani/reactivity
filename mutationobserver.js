/** @type {MutationCallback} */
const mutationCallback = (mutations) => {
  for (const mutation of mutations) {
    if (
      mutation.type !== 'attributes' ||
      mutation.attributeName !== 'data-theme'
    )
      return;

    const body = /** @type {HTMLElement} */ (mutation.target);
    const newTheme = body.getAttribute('data-theme'); // new value

    body.className =
      newTheme === 'light' ? 'bg-white text-black' : 'bg-black text-white';
  }
};

const observer = new MutationObserver(mutationCallback);
