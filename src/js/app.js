import * as flsFunctions from './modules/functions.js';
import { Splide } from '@splidejs/splide';
// import { link } from 'fs';
// import fslightbox from 'fslightbox';

if (flsFunctions.checkStorage()) {
  const controls = document.querySelectorAll('.control');
  const totalSumEl = document.querySelector('.cart__total-value');
  let totalSum = 0;
  controls.forEach((control) => {
    const itemData = flsFunctions.fromStorage(control.dataset.id);
    if (itemData !== null) {
      control.classList.add('control--show-counter');
      control.querySelector('.control__value').value = itemData.quantity;
      if (itemData.quantity <= 1 && control.closest('.cart')) {
        control.querySelector('.control__minus').setAttribute('disabled', 'disabled');
      }
      if (control.nextElementSibling) {
        const cartItemSum = control.nextElementSibling.querySelector('.cart__item-sum-value');
        if (cartItemSum) {
          const sum = itemData.price * itemData.quantity;
          cartItemSum.innerText = sum;
          totalSum += sum;
        }
      }
    }
  });
  if (totalSumEl) {
    totalSumEl.innerHTML = totalSum;
  }
}

flsFunctions.isWebp();

const burgerBtn = document.querySelector('.burger');
burgerBtn.addEventListener('click', flsFunctions.toggleMobileMenu);

const dropBtns = document.querySelectorAll('.menu__link--submenu');
const submenus = document.querySelectorAll('.submenu');
dropBtns.forEach((dropBtn) => {
  dropBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const menuLink = e.target;
    const subMenu = e.target.nextElementSibling;
    if (menuLink.classList.contains('menu__link--active')) {
      menuLink.classList.remove('menu__link--active');
      subMenu.classList.remove('submenu--open');
      document.removeEventListener('click', closeSubmenu);
    } else {
      dropBtns.forEach((btn) => {
        btn.classList.remove('menu__link--active');
        btn.nextElementSibling.classList.remove('submenu--open');
      });
      menuLink.classList.add('menu__link--active');
      subMenu.classList.add('submenu--open');
      document.addEventListener('click', closeSubmenu);
    }
    function closeSubmenu(event) {
      if (!event.target.classList.contains('submenu')) {
        submenus.forEach((submenu) => {
          submenu.classList.remove('submenu--open');
          submenu.previousElementSibling.classList.remove('menu__link--active');
        });
        document.removeEventListener('click', closeSubmenu);
      }
    }
  });
});

// const submenuLinks = document.querySelectorAll('.submenu__link--submenu');
// submenuLinks.forEach((link) => {
//   link.addEventListener('click', (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     e.target.classList.toggle('submenu__link--active');
//     e.target.nextElementSibling.classList.toggle('submenu__list--active');
//     console.log();
//   });
// });

document.querySelector('.current-year').innerHTML = new Date().getFullYear();

// scroll to top
const scrollBtn = document.querySelector('.scroll-to-top');
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 200) {
    scrollBtn.style.visibility = 'visible';
    scrollBtn.style.opacity = '1';
  } else {
    scrollBtn.style.visibility = 'hidden';
    scrollBtn.style.opacity = '0';
  }
});
scrollBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

const footerItemTitles = document.querySelectorAll('.footer__item-title');
footerItemTitles.forEach((title) => {
  title.addEventListener('click', (e) => {
    e.currentTarget.classList.toggle('footer__item-title--active');
    e.currentTarget.nextElementSibling.classList.toggle('footer__menu--active');
  });
});

if (document.querySelector('.top.splide') != null) {
  new Splide('.top', {
    type: 'loop',
    arrows: false,
    height: 'calc(100svh - 70px)',
    cover: true,
    autoplay: true,
    pauseOnFocus: true,
    pauseOnHover: true,
    classes: {
      page: 'splide__pagination__page top__pagination-btn',
    },
  }).mount();
}

if (document.querySelector('.product__tab') != null) {
  flsFunctions.tabs('product__tab', 'product__tab-content', 'active');
}

const addToCartBtns = document.querySelectorAll('.control__add-to-cart');
const plusBtns = document.querySelectorAll('.control__plus');
const minusBtns = document.querySelectorAll('.control__minus');
const removeBtns = document.querySelectorAll('.control__remove');

addToCartBtns.forEach((btn) => {
  btn.addEventListener('click', flsFunctions.addToCart);
});

plusBtns.forEach((btn) => {
  btn.addEventListener('click', flsFunctions.increaseQuantity);
});

minusBtns.forEach((btn) => {
  btn.addEventListener('click', flsFunctions.decreaseQuantity);
});

removeBtns.forEach((btn) => {
  btn.addEventListener('click', flsFunctions.removeFromCart);
});

let productSlider;
let productThumbs;
if (document.querySelector('.product__main-image') != null && document.querySelector('.product__thumbs') != null) {
  productSlider = new Splide('.product__main-image', {
    fixedWidth: 380,
    fixedHeight: 300,
    type: 'fade',
    rewind: true,
    pagination: false,
    arrows: false,
    breakpoints: {
      767: {
        fixedWidth: 280,
        fixedHeight: 150,
      },
    },
  });

  productThumbs = new Splide('.product__thumbs', {
    fixedWidth: 100,
    fixedHeight: 80,
    cover: true,
    gap: 10,
    perPage: 3,
    rewind: false,
    pagination: false,
    isNavigation: true,
    breakpoints: {
      767: {
        fixedWidth: 70,
        fixedHeight: 50,
      },
    },
  });

  productSlider.sync(productThumbs);
  productSlider.mount();
  productThumbs.mount();
}

flsFunctions.accordion();

// flsFunctions.bindModal('.open-modal-callback', '.modal--callback', '.modal__close');

// flsFunctions.bindModal('.open-modal-order', '.modal--order', '.modal__close');
