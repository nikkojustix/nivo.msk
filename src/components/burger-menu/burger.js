// mobile menu
const menuBtn = document.querySelector('.menu-btn');
menuBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const menu = document.querySelector('.menu');
  const menuList = document.querySelector('.menu__list');
  menu.classList.add('menu--opened');
  document.body.classList.add('locked');
  menuList.style.transform = 'translateX(0)';
  menu.addEventListener('click', (e) => {
    if (e.target === menu) {
      menuList.style.transform = 'translateX(-100%)';
      menu.classList.remove('menu--opened');
      document.body.classList.remove('locked');
    }
  });
});
