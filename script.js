(() => {
  const SESSION_KEY = 'northstarSession';
  const USERS_KEY = 'northstarUsers';
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

  const readUsers = () => {
    try {
      const stored = localStorage.getItem(USERS_KEY);
      const users = stored ? JSON.parse(stored) : [];
      const seeded = users.some((user) => user.email === demoUser.email)
        ? users
        : [...users, demoUser];

      localStorage.setItem(USERS_KEY, JSON.stringify(seeded));
      return seeded;
    } catch (error) {
      return [demoUser];
    }
  };

  const getKnownUser = (email, password) => {
    const users = readUsers();
    return users.find((user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password) || null;
  };

  const updateAuthUI = () => {
    const session = readSession();

    document.querySelectorAll('[data-auth-area]').forEach((authArea) => {
      const loginLink = authArea.querySelector('[data-login-link]');
      const signupLink = authArea.querySelector('[data-signup-link]');
      const userBlock = authArea.querySelector('[data-user-block]');
      const authName = authArea.querySelector('[data-auth-name]');

      if (session) {
        if (loginLink) loginLink.hidden = true;
        if (signupLink) signupLink.hidden = true;
        if (userBlock) userBlock.hidden = false;
        if (authName) authName.textContent = session.name.split(' ')[0];
      } else {
        if (loginLink) loginLink.hidden = false;
        if (signupLink) signupLink.hidden = false;
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

      if (window.location.pathname.endsWith('login.html') || window.location.pathname.endsWith('signup.html')) {
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

      const user = getKnownUser(email, password);
      if (!user) {
        statusMessage.textContent = 'Invalid credentials. Use team@northstar.studio / northstar123 or create a new account.';
        statusMessage.dataset.state = 'error';
        return;
      }

      writeSession({ name: user.name, email: user.email });
      statusMessage.textContent = 'Login successful. Redirecting...';
      statusMessage.dataset.state = 'success';

      setTimeout(() => {
        window.location.href = 'index.html';
      }, 600);
    });
  }

  const signupForm = document.querySelector('[data-signup-form]');
  if (signupForm) {
    const statusMessage = signupForm.querySelector('[data-signup-message]');
    const nameInput = signupForm.querySelector('#name');
    const emailInput = signupForm.querySelector('#email');
    const passwordInput = signupForm.querySelector('#password');
    const confirmPasswordInput = signupForm.querySelector('#confirm-password');

    if (readSession()) {
      window.location.href = 'index.html';
      return;
    }

    signupForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
      const confirmPassword = confirmPasswordInput.value.trim();

      if (!name || !email || !password || !confirmPassword) {
        statusMessage.textContent = 'Please complete all fields.';
        statusMessage.dataset.state = 'error';
        return;
      }

      if (password.length < 6) {
        statusMessage.textContent = 'Password should be at least 6 characters.';
        statusMessage.dataset.state = 'error';
        return;
      }

      if (password !== confirmPassword) {
        statusMessage.textContent = 'Passwords do not match.';
        statusMessage.dataset.state = 'error';
        return;
      }

      const users = readUsers();
      const exists = users.some((user) => user.email.toLowerCase() === email.toLowerCase());
      if (exists) {
        statusMessage.textContent = 'An account with this email already exists.';
        statusMessage.dataset.state = 'error';
        return;
      }

      const newUser = { name, email, password };
      const updatedUsers = [...users, newUser];
      localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
      writeSession(newUser);

      statusMessage.textContent = 'Signup successful. Redirecting...';
      statusMessage.dataset.state = 'success';

      setTimeout(() => {
        window.location.href = 'index.html';
      }, 600);
    });
  }

  updateAuthUI();
})();
