(() => {
  const SESSION_KEY = 'northstarSession';
  const demoUser = {
    name: 'Maya North',
    email: 'team@northstar.studio',
    password: 'northstar123'
  };

  const readSession = () => {
    try {
      const stored = sessionStorage.getItem(SESSION_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      return null;
    }
  };

  const writeSession = (user) => {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({
      name: user.name,
      email: user.email
    }));
  };

  const clearSession = () => {
    sessionStorage.removeItem(SESSION_KEY);
  };

  const updateAuthUI = () => {
    const session = readSession();

    document.querySelectorAll('[data-auth-area]').forEach((authArea) => {
      const loginLink = authArea.querySelector('[data-login-link]');
      const userBlock = authArea.querySelector('[data-user-block]');
      const authName = authArea.querySelector('[data-auth-name]');

      if (session) {
        if (loginLink) loginLink.hidden = true;
        if (userBlock) userBlock.hidden = false;
        if (authName) authName.textContent = session.name.split(' ')[0];
      } else {
        if (loginLink) loginLink.hidden = false;
        if (userBlock) userBlock.hidden = true;
      }
    });
  };

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

  document.querySelectorAll('[data-logout-button]').forEach((button) => {
    button.addEventListener('click', () => {
      clearSession();
      updateAuthUI();

      if (window.location.pathname.endsWith('login.html')) {
        window.location.href = 'index.html';
      }
    });
  });

  const loginForm = document.querySelector('[data-login-form]');
  if (loginForm) {
    const statusMessage = loginForm.querySelector('[data-login-message]');
    const emailInput = loginForm.querySelector('#email');
    const passwordInput = loginForm.querySelector('#password');

    if (readSession()) {
      window.location.href = 'index.html';
      return;
    }

    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      if (!email || !password) {
        statusMessage.textContent = 'Please enter both email and password.';
        statusMessage.dataset.state = 'error';
        return;
      }

      if (email.toLowerCase() !== demoUser.email || password !== demoUser.password) {
        statusMessage.textContent = 'Invalid credentials. Use team@northstar.studio / northstar123';
        statusMessage.dataset.state = 'error';
        return;
      }

      writeSession({ name: demoUser.name, email: demoUser.email });
      statusMessage.textContent = 'Login successful. Redirecting...';
      statusMessage.dataset.state = 'success';

      setTimeout(() => {
        window.location.href = 'index.html';
      }, 600);
    });
  }

  updateAuthUI();
})();
