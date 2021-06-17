import modalFilmCard from '../templates/modalFilmCard.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import APi from '../apiServises/apiService';
import * as lib from './userLibrary';
import refs from './refs';
import { createInfoObj } from '../apiServises/normalizeResults';

// async function getFullMovieInfoById(id) {
//   try {
//     const initialData = await APi.getMovieInfoById(id);
//     const fullInfo = createInfoObj(initialData);
//     return { ...fullInfo };
//   } catch (error) {
//     console.log('error in getFullMovieInfoById(id) :>> ', error);
//   }
// }

// refs.cardList.addEventListener('click', openModal);
// refs.closeModalBtn.addEventListener('click', closeModal);
// refs.watchedBtn.addEventListener('click', onWatchedBtnClick);
// refs.queueBtn.addEventListener('click', onQueueBtnClick);

// let targetFilm;
// export async function openModal(event) {
//   event.preventDefault();
//   const targetID = event.target.closest('LI').id;
//   console.log('targetID :>> ', targetID);
//   // console.log('targetFilm before:>> ', lib.targetFilm);
//   targetFilm = await getFullMovieInfoById(targetID);
//   // console.log('selectedFilm :>> ', selectedFilm);
//   // console.log('targetFilm before:>> ', targetFilm);
//   // targetFilm = { ...selectedFilm };
//   // console.log('targetFilm after:>> ', targetFilm);
//   // refs.watchedBtn.addEventListener('click', lib.onWatchedBtnClick);
//   // refs.queueBtn.addEventListener('click', lib.onQueueBtnClick);
//   clearModal();
//   refs.modalInfoContainer.innerHTML = modalFilmCard(targetFilm);
//   lib.getCorrectButtons(targetID);
//   showModal();
// }

// function showModal() {
//   refs.backdrop.classList.remove('is-hidden');
//   window.addEventListener('keydown', closeModalByEscape);
// }
// function closeModal() {
//   refs.backdrop.classList.add('is-hidden');
//   window.removeEventListener('keydown', closeModalByEscape);
//   // refs.watchedBtn.removeEventListener('click', lib.onWatchedBtnClick);
//   // refs.queueBtn.removeEventListener('click', lib.onQueueBtnClick);
// }

// function clearModal() {
//   refs.modalInfoContainer.innerHTML = '';
// }
// // window.addEventListener('keydown', closeModalByEscape);
// // window.removeEventListener('keydown', closeModalByEscape);
// function closeModalByEscape(event) {
//   if (event.code === 'Escape') {
//     closeModal();
//   }
//   return;
// }

// function onWatchedBtnClick() {
//   const action = lib.checkWatchedDataAction();
//   console.log('action :>> ', action);
//   if (action === 'add') {
//     console.log('targetFilm in listener:>> ', targetFilm);
//     lib.addFilmToWatched(targetFilm);
//     console.log('targetFilm :>> ', targetFilm);
//     lib.renderRemoveFromWatched();
//     return;
//   }
//   if (action === 'remove') {
//     lib.removeFilmFromWatched(targetFilm);
//     console.log('targetFilm :>> ', targetFilm);
//     lib.renderAddToWatched();
//     return;
//   }
// }

// function onQueueBtnClick() {
//   const action = lib.checkQueueDataAction();
//   if (action === 'add') {
//     lib.addFilmToQueue(targetFilm);
//     console.log('targetFilm :>> ', targetFilm);
//     lib.renderRemoveFromQueue();
//     return;
//   }
//   if (action === 'remove') {
//     lib.removeFilmFromQueue(targetFilm);
//     console.log('targetFilm :>> ', targetFilm);
//     lib.renderAddToQueue();
//     return;
//   }
// }
const apiKey = 'a6a422d110dec9c7fa9eeee757b6f274';

// const cardItems= document.querySelector('.card__item');
// cardItems.addEventListener('click', openModal);

function getMovieInfoById(movie_id) {
  // console.log(movie_id)
  const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}&language=en`;
  return fetch(url)
    .then(response => response.json())
    .then(data => ({
      ...data,
      popularity_rate: data.popularity.toFixed(1),
    }))
    .catch(error => console.log(error));
}

export const openModal = e => {
  document.body.classList.add('blocked-scroll');
  document.body.classList.remove('opened-scroll');
  e.preventDefault();
  getMovieInfoById(e.currentTarget.id).then(data => {
    if (e.target.nodeName !== 'IMG') return;
    const markup = modalFilmCard(data);
    const modal = basicLightbox.create(markup);

    modal.show();

    const closeBtn = document.querySelector('.modal-close-btn');
    closeBtn.addEventListener('click', closeModal);

    window.addEventListener('keydown', closeModalHandler);

    function closeModalHandler(e) {
      const body = document.querySelector('body');
      document.body.classList.remove('blocked-scroll');
      document.body.classList.add('opened-scroll');
      if (e.code === 'Escape') {
        modal.close();
        window.removeEventListener('keydown', closeModalHandler);
      }
    }

    function closeModal(e) {
      modal.close();
      // const body = document.querySelector('body');
      document.body.classList.remove('blocked-scroll');
      document.body.classList.add('opened-scroll');
      window.removeEventListener('keydown', closeModalHandler);
    }

    // function addRemoveScroll(e) {
    //   document.body.classList.add('blocked-scroll');
    //   document.body.classList.remove('opened-scroll');
    // }

    const basicModal = document.querySelector('.basicLightbox');

    basicModal.addEventListener('click', closeOpenModal);

    function closeOpenModal(e) {
      document.body.classList.remove('blocked-scroll');
      document.body.classList.add('opened-scroll');
    }
  });
};
