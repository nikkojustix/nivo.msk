import * as flsFunctions from './modules/functions.js';
import { Splide } from '@splidejs/splide';
// import { link } from 'fs';
// import fslightbox from 'fslightbox';

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

const footerItemTitles = document.querySelectorAll('.footer__item-title');
footerItemTitles.forEach((title) => {
  title.addEventListener('click', (e) => {
    e.currentTarget.classList.toggle('footer__item-title--active');
    e.currentTarget.nextElementSibling.classList.toggle('footer__menu--active');
  });
});

let topSliderImg, topSliderTitle;

if (document.querySelector('.top__slider-img') != null && document.querySelector('.top__slider-title') != null) {
  topSliderImg = new Splide('.top__slider-img', {
    type: 'fade',
    height: '550px',
    rewind: true,
    speed: 400,
    autoplay: true,
    pauseOnFocus: true,
    pauseOnHover: true,
    breakpoints: {
      767: {
        destroy: true,
      },
    },
  });

  topSliderTitle = new Splide('.top__slider-title', {
    type: 'fade',
    rewind: true,
    speed: 400,
    width: '100%',
    autoplay: true,
    autoHeight: true,
    arrows: false,
    pagination: false,
    pauseOnFocus: true,
    pauseOnHover: true,
    breakpoints: {
      767: {
        arrows: true,
      },
    },
  });

  topSliderTitle.sync(topSliderImg);
  topSliderTitle.mount();
  topSliderImg.mount();
}

if (document.querySelector('.tabs__btn') != null) {
  flsFunctions.tabs('tabs__btn', 'tabs__item', 'active');
}

const category = document.querySelector('#category');
const calcCategories = document.querySelectorAll('#category ~ .form__category');
const filmType = document.querySelector('#film-type');
const calcFilmTypes = document.querySelectorAll('.form__film-type');

if (category != null) {
  category.addEventListener('change', () => {
    flsFunctions.unbindModal('.open-modal-calc', '.form--calc');
    flsFunctions.bindModal('.open-modal-calc', `.modal--${category.value}`, '.modal__close');
  });
}

let equipSlider;
if (document.querySelector('.equip__slider') != null) {
  equipSlider = new Splide('.equip__slider', {
    type: 'fade',
    rewind: true,
    speed: 400,
    width: 780,
    autoplay: true,
    autoHeight: true,
    arrows: true,
    pagination: false,
    pauseOnFocus: true,
    pauseOnHover: true,
  });
  equipSlider.mount();
}

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

if (document.querySelector('.product__tabs-btn') != null) {
  flsFunctions.tabs('product__tabs-btn', 'product__tabs-item', 'active');
}

flsFunctions.accordion();

let filmOptions = [];

if (document.querySelector('.form--calc-film-price') != null) {
  const form = document.querySelector('.form--calc-film-price');
  filmOptions = flsFunctions.calcPrice();
  const orderModal = document.querySelector('.form--order-modal');
  const inputWidth = document.createElement('input');
  inputWidth.type = 'hidden';
  inputWidth.name = 'width';
  inputWidth.value = filmOptions[0];
  orderModal.insertBefore(inputWidth, orderModal.firstChild);
  const inputLength = document.createElement('input');
  inputLength.type = 'hidden';
  inputLength.name = 'length';
  inputLength.value = filmOptions[1];
  orderModal.insertBefore(inputLength, orderModal.firstChild);
  form.addEventListener('change', () => {
    filmOptions = flsFunctions.calcPrice();
    inputWidth.value = filmOptions[0];
    inputLength.value = filmOptions[1];
  });
}

// flsFunctions.bindModal('.open-modal-callback', '.modal--callback', '.modal__close');

// flsFunctions.bindModal('.open-modal-order', '.modal--order', '.modal__close');
