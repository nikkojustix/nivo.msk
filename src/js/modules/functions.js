export function isWebp() {
  function testWebP(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  }

  testWebP(function (support) {
    let className = support == true ? 'webp' : 'no-webp';
    document.querySelector('html').classList.add(className);
  });
}

export function toggleMobileMenu(e) {
  e.preventDefault();
  const menu = document.querySelector('.menu');
  const btnInner = document.querySelector('.burger__btn-inner');
  const body = document.querySelector('body');
  menu.classList.toggle('menu--active');
  btnInner.classList.toggle('burger__btn-inner--active');
  body.classList.toggle('locked');
}

export function tabs(btnClass, itemClass, activeModifire) {
  const btns = document.querySelectorAll(`.${btnClass}`);
  const items = document.querySelectorAll(`.${itemClass}`);

  function showContent(i = 0) {
    btns[i].classList.add(`${btnClass}--${activeModifire}`);
    items[i].classList.add(`${itemClass}--${activeModifire}`);
  }
  function hideContent() {
    items.forEach((item) => {
      item.classList.remove(`${itemClass}--${activeModifire}`);
    });
    btns.forEach((btn) => {
      btn.classList.remove(`${btnClass}--${activeModifire}`);
    });
  }

  hideContent();
  showContent();

  btns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      hideContent();
      showContent(i);
    });
  });
}

export function accordion() {
  const groups = document.querySelectorAll('.accordion__group');
  groups.forEach((group) => {
    const items = group.children;
    for (const item of items) {
      const trigger = item.querySelector('.accordion__trigger');
      const num = item.querySelector('.accordion__trigger-num');
      if (item.querySelectorAll('.accordion__item').length > 0) {
        num.textContent = item.querySelectorAll('.accordion__item').length;
      } else {
        num.textContent = item.querySelectorAll('.accordion__link').length;
      }
      const content = item.querySelector('.accordion__content');
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        if (item.classList.contains('accordion__item--active')) {
          item.classList.remove('accordion__item--active');
          trigger.ariaExpanded = false;
          content.style.maxHeight = 0;
        } else {
          for (const item of items) {
            item.classList.remove('accordion__item--active');
            item.querySelector('.accordion__trigger').ariaExpanded = false;
            item.querySelector('.accordion__content').style.maxHeight = 0;
          }
          item.classList.add('accordion__item--active');
          content.style.maxHeight = content.scrollHeight + 'px';
          if (item.parentNode.parentNode.classList.contains('accordion__content')) {
            item.parentNode.parentNode.style.maxHeight = item.parentNode.parentNode.scrollHeight + content.scrollHeight + 'px';
          }
          trigger.ariaExpanded = true;
        }
      });
    }
  });
}

export function calcPrice() {
  const priceValue = document.querySelector('.product__price-value');
  const costPerKilo = +priceValue.dataset.value;
  const filmThickness = parseFloat(
    document
      .querySelector('h1')
      .innerText.replace(/[^0-9,\,]/g, '')
      .replace(',', '.')
  );
  const filmWidth = +document.querySelector('.form__select[name="width"]').value;
  const filmLength = +document.querySelector('.form__select[name="length"]').value;
  parseFloat('Полиолефиновая плёнка POLYXFILMS (полурукав 12,5 мкм)'.replace(/[^0-9,\,]/g, '').replace(',', '.'));

  let price = filmWidth * filmThickness * filmLength * 0.000001 * costPerKilo;
  if (document.querySelector('h1').innerText.includes('полурукав')) {
    price *= 2;
  }
  price *= filmThickness === 35 ? 0.93 : 0.92;
  priceValue.innerText = Math.round(price).toLocaleString() + ' руб';
  return [filmWidth, filmLength];
}

export function bindModal(trigger, modal, close) {
  trigger = document.querySelectorAll(trigger);
  modal = document.querySelector(modal);
  close = document.querySelectorAll(close);

  var openModalFunc = openModal(modal);
  const body = document.body;
  if (trigger != null) {
    trigger.forEach((trig) => {
      trig.addEventListener('click', openModalFunc, false);
    });
  }
  close.forEach((closeBtn) => {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
      body.classList.remove('locked');
    });
  });
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      body.classList.remove('locked');
    }
  });
}

const openModal = function (modal) {
  return function () {
    event.preventDefault();
    modal.style.display = 'flex';
    document.body.classList.add('locked');
  };
};

export function unbindModal(trigger, form) {
  trigger = document.querySelector(trigger);
  form = document.querySelector(form);

  const body = document.body;
  if (trigger != null) {
    const newBtn = trigger.cloneNode(true);
    form.removeChild(trigger);
    form.appendChild(newBtn);
  }
}

const headerCart = document.querySelector('.header__links-item--cart');

const cart = {
  items: [],
  get totalQuantity() {
    return this.items.reduce(function (sum, item) {
      return sum + item.quantity;
    }, 0);
  },
  addItem: function (item) {
    this.items.push(item);
    this.updateCartUI();
  },
  updateCartUI: function () {
    if (this.totalQuantity > 0) {
      headerCart.classList.add('cart-not-empty');
      headerCart.dataset.count = this.totalQuantity;
    } else if (headerCart.classList.contains('cart-not-empty')) {
      headerCart.classList.remove('cart-not-empty');
    }
    localStorage.setItem('nivo-cart', JSON.stringify(this.items));
    console.log('Корзина обновлена. Количество товаров: ' + this.totalQuantity);
  },
};

export function addToCart(e) {
  const item = e.target.closest('.control');
  const productToAdd = {
    id: item.dataset.id,
    name: 'name',
    price: 10000,
    quantity: 1,
  };
  cart.addItem(productToAdd);
  headerCart.dataset.count = cart.totalQuantity;
  showCounter(item);
}

export function increaseQuantity(e) {
  const btn = e.target;
  const value = btn.previousElementSibling;
  value.value++;
  // headerCart.dataset.count++;
  const control = btn.closest('.control');
  cart.items.find((item) => item.id === control.dataset.id).quantity++;
  cart.updateCartUI();
}
export function decreaseQuantity(e) {
  const btn = e.target;
  const value = btn.nextElementSibling;
  const control = btn.closest('.control');
  if (value.value == 1) {
    hideCounter(control);
    cart.items = cart.items.filter((item) => item.id !== control.dataset.id);
    // headerCart.dataset.count--;
    cart.updateCartUI();
    return;
  }
  value.value--;
  // headerCart.dataset.count--;
  cart.items.find((item) => item.id === control.dataset.id).quantity--;
  cart.updateCartUI();
}

function showCounter(control) {
  control.classList.add('control--show-counter');
}

function hideCounter(control) {
  control.classList.remove('control--show-counter');
}

export function fromStorage(id) {
  const quantity = cart.items.find((item) => item.id === id);
  console.log(quantity);
  if (!quantity) {
    return null;
  }

  return quantity.quantity;
}

export function checkStorage() {
  const ls = JSON.parse(localStorage.getItem('nivo-cart'));
  if (ls && ls.length > 0) {
    ls.forEach((item) => {
      cart.addItem(item);
    });
    return true;
  }
  return false;
}
