const toggleButton = document.getElementById('toggleButton');
const message = document.getElementById('message');

const DARK_MODE_KEY = 'darkMode';
const LAST_TURN_OFF_KEY = 'lastTurnOff';
const LAST_TURN_ON_KEY = 'lastTurnOn';


function toggleDarkMode() {
  const darkMode = localStorage.getItem(DARK_MODE_KEY) === 'true';

  if (darkMode) {
    document.body.style.backgroundColor = '#f5f5f5';
    toggleButton.textContent = 'Turn off';
    const lastTurnOn = new Date(localStorage.getItem(LAST_TURN_ON_KEY));
    message.textContent = `Last turn on: ${formatDate(lastTurnOn)}`;

    localStorage.setItem(DARK_MODE_KEY, 'false');
    localStorage.removeItem(LAST_TURN_OFF_KEY);
  } else {
    document.body.style.backgroundColor = '#222';
    toggleButton.textContent = 'Turn on';
    const lastTurnOff = new Date();
    message.textContent = `Last turn off: ${formatDate(lastTurnOff)}`;

    localStorage.setItem(DARK_MODE_KEY, 'true');
    localStorage.setItem(LAST_TURN_OFF_KEY, lastTurnOff);
    localStorage.setItem(LAST_TURN_ON_KEY, new Date());
  }
}

function formatDate(date) {
  const options = { 
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };

  return date.toLocaleString('en-US', options);
}

toggleButton.addEventListener('click', toggleDarkMode);

function restoreStateFromLocalStorage() {
  const darkMode = localStorage.getItem(DARK_MODE_KEY) === 'true';
  const lastTurnOff = localStorage.getItem(LAST_TURN_OFF_KEY);
  const lastTurnOn = localStorage.getItem(LAST_TURN_ON_KEY);

  if (darkMode) {
    document.body.style.backgroundColor = '#222';
    toggleButton.textContent = 'Turn on';

    if (lastTurnOff) {
      const lastTurnOffDate = new Date(lastTurnOff);
      message.textContent = `Last turn off: ${formatDate(lastTurnOffDate)}`;
    }
  } else {
    document.body.style.backgroundColor = '#f5f5f5';
    toggleButton.textContent = 'Turn off';

    if (lastTurnOn) {
      const lastTurnOnDate = new Date(lastTurnOn);
      message.textContent = `Last turn on: ${formatDate(lastTurnOnDate)}`;
    }
  }
}

// Call restoreStateFromLocalStorage on page load
document.addEventListener('DOMContentLoaded', restoreStateFromLocalStorage);
