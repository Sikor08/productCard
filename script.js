// Добавление и удаление пагинации(точек) в зависимости от колличества фото
let products = document.querySelectorAll('.product'); 
if(products){
    products.forEach(el =>{
        let currentProduct = el
        const imageSwitchItems = currentProduct.querySelectorAll('.image-switch__item');
        const imagePagination = currentProduct.querySelector('.image-pagination');
        if(imageSwitchItems.length > 1){
            imageSwitchItems.forEach((el, index) =>{
            el.setAttribute('data-index', index);
            imagePagination.innerHTML += `<li class="image-pagination__item ${index == 0 ? 'image-pagination__item--active' : ''}" data-index=${index}></li>`
            el.addEventListener('mouseenter', (e) =>{
                currentProduct.querySelectorAll('.image-pagination__item').forEach(el =>(el.classList.remove('image-pagination__item--active')))
                currentProduct.querySelector(`.image-pagination__item[data-index="${e.currentTarget.dataset.index}"]`).classList.add('image-pagination__item--active')
            })
            el.addEventListener('mouseleave', (e) =>{
                currentProduct.querySelectorAll('.image-pagination__item').forEach(el =>(el.classList.remove('image-pagination__item--active')))
                currentProduct.querySelector(`.image-pagination__item[data-index="0"]`).classList.add('image-pagination__item--active')
            })
        });
    }
    });
}

// Фильтр цены. 
const fixedBlock = document.querySelector('.filters-price'),
      filters = document.querySelector('.filters'),
      gutter = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--gutter')),
      container = document.querySelector('.container'),
      offsetLeft =  container.offsetLeft + gutter,
      filtersOffsetTop = filters.offsetTop,
      filtersWidth = filters.offsetWidth;
      smallOffset = gutter;

console.log(smallOffset)      

const fixedScrollBlock = () =>{
    let scrollDistance = window.scrollY;
    if(scrollDistance > (filtersOffsetTop - smallOffset) && scrollDistance <= (filters.offsetHeight + filtersOffsetTop)){
        fixedBlock.style.left = `${offsetLeft}px`;
        fixedBlock.style.width = `${filtersWidth}px`;
        fixedBlock.classList.remove('absolute');
        fixedBlock.classList.add('fixed')
    }else{
        fixedBlock.style.left = `0px`;
        fixedBlock.style.width = "100%";
        fixedBlock.classList.remove('fixed')
    }
    if(scrollDistance >= (filtersOffsetTop - smallOffset) + filters.offsetHeight - fixedBlock.offsetHeight){
        fixedBlock.classList.add('absolute');
        fixedBlock.style.left = `0px`;
        fixedBlock.style.width = "100%";

        fixedBlock.classList.remove('fixed');
        }
};      
window.addEventListener('scroll', fixedScrollBlock);
      
    //Корзина
  
