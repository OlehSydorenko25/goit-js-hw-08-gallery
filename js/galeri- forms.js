import gallery from './gallery-items.js';

const galleryRef = document.querySelector('.gallery');
const lightboxOverlayRef = document.querySelector('.lightbox__overlay');
const lightboxContentRef = document.querySelector('.lightbox__content');
const lightboxImageRef = document.querySelector('.lightbox__image');
const lightboxButtonRef = document.querySelector('.lightbox__button');
const imageRef = document.querySelector('.gallery__item');
const lightboxRef = document.querySelector('.lightbox');

const tegsGalleryArr = gallery.map(({ preview, original, description }) =>  {
    const liElement = document.createElement('li');
    liElement.classList.add('gallery__item');

    const aElement = document.createElement('a');
    aElement.classList.add('gallery__link');
    aElement.setAttribute('href', original)

    const imgElement = document.createElement('img');
    imgElement.classList.add('gallery__image');
    imgElement.setAttribute('src', preview)
    imgElement.setAttribute('alt', description)
    imgElement.setAttribute('data-source', original)

    aElement.appendChild(imgElement);
    liElement.appendChild(aElement);

    return liElement;
})

galleryRef.append(...tegsGalleryArr)

galleryRef.addEventListener('click', onOpenModal)
lightboxButtonRef.addEventListener('click', onCloseModal)
window.addEventListener('keydown', onCloseModal)
lightboxOverlayRef.addEventListener('click', onCloseModal)

function onOpenModal(event) {
    const image = event.target;

    if (image.nodeName !== 'IMG') {
        return
    }
    event.preventDefault();
    lightboxRef.classList.add('is-open')

    lightboxImageRef.setAttribute('src', image.getAttribute('data-source'))
}

function onCloseModal() {
    lightboxImageRef.setAttribute('alt', '');
    lightboxImageRef.setAttribute('src', '');
    lightboxRef.classList.remove('is-open')
}
