const productsBtn = document.querySelectorAll('.product__btn');
const cartProductsList = document.querySelector('.cart-content__list');
const cart = document.querySelector('.cart');
const cartQuantity = document.querySelector('.cart__quantity');
const fullPrice = document.querySelector('.fullPrice');
let price = 0;

//Присвоение id 
const randomId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2,15);
};

// Price
const priceWithOutSpaces = (str) => {
    return str.replace(/\s/g, '');
};

const normalPrice = (str) => {
    return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};


//Функции суммирования и вычитания кол-ва товаров

const plusFullPrice = (currentPrice) => {
    return price += currentPrice;
}

const minusFullPrice = (currentPrice) => {
    return price -= currentPrice;
}

const printFullPrice = () => {
    fullPrice.textContent = `${normalPrice(price)}`
}

const printQuantity = () => {
    let length = cartProductsList.children.length;
    cartQuantity.textContent = length;
    length > 0 ? cart.classList.add('active') : cart.classList.remove('active')
};



const generateCartProduct = (img, title, price, id) => {
    return `
    <li class="cart-content__item">
    <article class="cart-content__product cart-product" data-id="${id}">
        <img class="cart-product__img" src="${img}" alt="">
        <div class="cart-product__text">
            <h3 class="cart-product__title">${title}</h3>
            <span class="cart-product__price">${normalPrice(price)} $</span>
        </div>
        <button class="cart-product__delete" aria-label="Удалить товар"></button>
    </article>
</li>
    `
};

const deleteProducts = (productParent) => {
    // Получим id 
    let id = productParent.querySelector('.cart-product').dataset.id;
    // Вновь активировать кнопку купить
    document.querySelector(`.product[data-id="${id}"]`).querySelector('.product__btn').disabled = false;

    // Вычесть из общей стоимости
    let currentPrice = parseInt(priceWithOutSpaces(productParent.querySelector('.cart-product__price').textContent));
    minusFullPrice(currentPrice);
    // Вывести цену
    printFullPrice();
    // Удалить товар
    productParent.remove()
    // Вывести колличество
    printQuantity();

};

productsBtn.forEach(el => {
    el.closest('.product').setAttribute('data-id', randomId());
    el.addEventListener('click', (e) => {
        let self = e.currentTarget;
        let parent = self.closest('.product');
        let id = parent.dataset.id;
        let img = parent.querySelector('.image-switch__img img').getAttribute('src');
        let title = parent.querySelector('.product__title').textContent;
        let priceNumber = parseInt(priceWithOutSpaces(parent.querySelector('.product-price__current').textContent));

   
    // добавляем в корзину
cartProductsList.insertAdjacentHTML('afterbegin', generateCartProduct(img, title, priceNumber, id));
    // считаем сумму
    plusFullPrice(priceNumber);
    console.log(price);
printQuantity();
    // считаем колличество
printFullPrice();
// деактивируем кнопку добавить
self.disabled = true;
   });   
});

cartProductsList.addEventListener('click', (e) => {
    if(e.target.classList.contains('cart-product__delete')){
        deleteProducts(e.target.closest('.cart-content__item'));
    }
});

