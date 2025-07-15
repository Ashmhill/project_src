const themeSelector = document.getElementById('themeSelector');
const logo = document.getElementById('logo');

function changeTheme() {
  const selectedTheme = themeSelector.value;

  if (selectedTheme === 'dark') {
    document.body.classList.add('dark');
    logo.src = 'Images/white_logo.png'; // Change logo to white
  } else {
    document.body.classList.remove('dark');
    logo.src = 'Images/blue_logo.webp'; // Change logo to blue
  }
}

themeSelector.addEventListener('change', changeTheme);