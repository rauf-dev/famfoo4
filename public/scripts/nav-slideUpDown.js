
let lastScrollTop = 0;
const navBar = document.getElementById('navigation-bar-scroll');

window.addEventListener(
  'scroll',
  function () {
    let st = window.pageYOffset
    if (st > lastScrollTop) {
      // downscroll code
      console.log('Scrolling Down');
      navBar.classList.remove('navigation-is-visible');
      navBar.classList.add('navigation-is-hidden');
    } else {
      // upscroll code
      console.log('Scrolling Up');
      navBar.classList.remove('navigation-is-hidden')
      navBar.classList.add('navigation-is-visible');
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    //   if (navBar.scroll()) {
    //     console.log('scrolled');
    //   }
  },
  false
);


