{
  'use strict';

  /*referencja do szablonu template oraz books-list*/
  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
      // ex 5 form: '.filters',
    },
      booksCover: {
        images: '.books-list .book_image',
    }
 };

  const classNames = {
    books: {
      favoriteBook: 'favorite .books-list',
    }
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };

  /* funkcja render*/
  function renderInBooks() {

    /*pętla po każdym elemencie - książce z dataSource.books*/
    for (let book of dataSource.books) {
      /*generate HTML na podstawie szablonu oraz danych o konkretnej książce*/
      const generatedHTML = templates.bookTemplate(book);
      /*generowanie elementu DOM na podstawie kodu HTML*/
      const element = utils.createDOMFromHTML(generatedHTML);
      /*find booksList container i dołącz jako nowe dziecko DOM do listy .books-list*/
      const booksListContainer = document.querySelector(select.containerOf.booksList);
      booksListContainer.appendChild(element);
    }
  }
  renderInBooks();


  const favoriteBooks = [];

  console.log(favoriteBooks);

  function initActions() {
    /*referencja do wszystkich elementów .book_image w liście .booksList*/
    const booksContainer = document.querySelector(select.containerOf.booksList);
    const booksImage = booksContainer.querySelectorAll('.book__image');

    //const booksImage = document.querySelectorAll(select.booksCover.images);
    console.log(booksImage);
    /*pętla po każdym elemencie booksImage*/
    for (let image of booksImage) {
      /*nasłuchiwacz uruchamiający funkcję dblclick i zatrzymujący domyślne zachowanie przeglądarki*/
      image.addEventListener('dblclick', function (event) {
        event.preventDefault();
        /*dodanie do klikniętego elementu klasy favorite*/
        image.classList.add('favorite');
        /*pobranie z jego data-id identyfikatora - id książki*/
        const idBook = image.getAttribute('data-id');
        /*dodanie identyfikatora do tablicy favoriteBooks*/
        favoriteBooks.push(idBook);
      });
    }
  }
  initActions();
}

/*
ex 4
      const image = event.target.offsetParent;
      const idBook = image.getAttribute('data-id');

ex 3
if (!image.classList.contains('favorite')) {
  image.classList.add(classNames.books.favoriteBook);
  const idBook = image.getAttribute('data-id');
  favoriteBooks.push(idBook);
} else {
  favoriteBooks.splice(favoriteBooks.indexOf(idBook), 1);
      image.classList.remove(classNames.books.favoriteBook);
}

ex 5
const filters = [];

w initActions:
const booksFiltered = document.querySelectorAll(select.containerOf.form);
booksFiltered.addEventListener('click', function (event)){
  event.preventDefault();
const clickedBook = event.target;
if(clickedBook.type === 'checkbox'){
  if(clikedBook.checked){
    filters.push(clikedBook.value);
  }else {

  }

}
}
*/
