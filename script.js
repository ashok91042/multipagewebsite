(() => {
  const menuButton = document.querySelector('[data-menu-button]');
  const navigation = document.querySelector('[data-primary-navigation]');

  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      navigation.toggleAttribute('data-open', !isOpen);
    });

    navigation.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        menuButton.setAttribute('aria-expanded', 'false');
        navigation.removeAttribute('data-open');
      }
    });
  }

  document.querySelectorAll('[data-current-year]').forEach((year) => {
    year.textContent = new Date().getFullYear();
  });
})();
