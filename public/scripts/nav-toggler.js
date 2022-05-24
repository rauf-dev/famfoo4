// ANIMAMES MOBILE NAV TOGGLER, HAMBURGER TO AN X

const btn = document.getElementById('menu-btn');
const nav = document.getElementById('menu');
const navbar = document.getElementById('navbar-black-mobile');
const hamburgerTopX = document.getElementById('hamburgerTopX')
const hamburgerBottomX = document.getElementById('hamburgerBottomX')

function navToggle() {
  btn.classList.toggle('open')
  nav.classList.toggle('hidden')
  navbar.classList.toggle('color-me-black')
  hamburgerTopX.classList.toggle('color-me-white')
  hamburgerBottomX.classList.toggle('color-me-white')
  document.body.classList.toggle('no-scroll')
}

btn.addEventListener('click', navToggle)
