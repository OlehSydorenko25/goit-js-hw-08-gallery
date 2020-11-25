import gallery from './gallery-items.js';

const galleryRef = document.querySelector('.gallery');
const lightboxOverlayRef = document.querySelector('.lightbox__overlay');
const lightboxImageRef = document.querySelector('.lightbox__image');
const lightboxButtonRef = document.querySelector('.lightbox__button');
const lightboxRef = document.querySelector('.lightbox');
let IMGindex;

const tegsGalleryArr = gallery.map(({ preview, original, description }, index) => {
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
    imgElement.setAttribute('data-index', index)

    aElement.appendChild(imgElement);
    liElement.appendChild(aElement);

    return liElement;
})

galleryRef.append(...tegsGalleryArr)

galleryRef.addEventListener('click', onOpenModal)
lightboxButtonRef.addEventListener('click', onCloseModal)
lightboxOverlayRef.addEventListener('click', onCloseModal)

function onOpenModal(event) {
    const image = event.target;
    if (image.nodeName !== 'IMG') {
        return
    }

    window.addEventListener('keydown', onCloceModalESC)
    window.addEventListener('keydown', onChangeImg)
    event.preventDefault();
    lightboxRef.classList.add('is-open')

    lightboxImageRef.setAttribute('src', image.getAttribute('data-source'))
    IMGindex = parseInt(event.target.getAttribute('data-index'))
}

function onChangeImg(event) {
    if (event.code === 'ArrowRight') {
        IMGindex += 1;

        if (IMGindex >= gallery.length) {
            IMGindex = 0
        }
        lightboxImageRef.setAttribute('src', gallery[IMGindex].original)
        
    } else if (event.code === 'ArrowLeft') {
        IMGindex -= 1;
        if (IMGindex <= -1) {
            IMGindex = gallery.length - 1
        }
        lightboxImageRef.setAttribute('src', gallery[IMGindex].original)
    }
}
    
function onCloseModal() {
    lightboxImageRef.setAttribute('alt', '');
    lightboxImageRef.setAttribute('src', '');
    lightboxRef.classList.remove('is-open');
    window.removeEventListener('keydown', onCloceModalESC);
    IMGindex = 0;
}

function onCloceModalESC(event) {
    if (event.code === 'Escape') {
        onCloseModal();
    }
}
