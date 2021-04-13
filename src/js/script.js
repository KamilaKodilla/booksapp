{
  'use strict';

  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
      filters: '.filters',
    },
    booksCover: {
      images: '.books-list .book_image',
    }
  };

  const classNames = {
    books: {
      favoriteBook: 'favorite .books-list',
      hidden: 'hidden',
    }
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };

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

      //const ratingBgc = determineRattingBgc(rating);
      //const ratingWidth = rating * 10;
    }
  }
  renderInBooks();


  const favoriteBooks = [];

  function initActions() {
    /*referencja do wszystkich elementów .book_image w liście .booksList*/
    const booksContainer = document.querySelector(select.containerOf.booksList);
    const booksImage = booksContainer.querySelectorAll('.book__image');

    /*pętla po każdym elemencie booksImage*/
    for (let image of booksImage) {
      /*nasłuchiwacz uruchamiający funkcję dblclick i zatrzymujący domyślne zachowanie przeglądarki*/
      image.addEventListener('click', function (event) {
        event.preventDefault();
        const idBook = image.getAttribute('data-id');
        console.log(idBook);
        if (!favoriteBooks.includes(idBook)) {
          console.log("blad");
          image.classList.add('favorite');
          favoriteBooks.push(idBook);
        } else {
          image.classList.remove('favorite');
          favoriteBooks.splice(favoriteBooks.indexOf(idBook), 1);
        }
      });
    }
/*
    const filters = [];

    const booksFiltered = document.querySelector(select.containerOf.form);
    console.log(booksFiltered);
    booksFiltered.addEventListener('click', function (event) {
      event.preventDefault();
      const clickedBook = event.target;
      if (clickedBook.type === 'checkbox') {
        if (clikedBook.checked) {
          filters.push(clikedBook.value);
        } else {
          filters.splice(filters.indexOf(clickedBook.value), 1)
        }
      }
      filterBooks();
    });*/
  }
  initActions();

/*
  // ex 5
  function filterBooks() {
    for (let book of dataSource.books) {
      let shouldBeHidden = false;
      for (const filter of filters) {
        if (!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
      if (shouldBeHidden = true) {
        const image = document.querySelector('.book_image[data-id="' + book.id + '"]');
        image.classList.add('hidden');
      } else {
        const image = document.querySelector('.book_image[data-id="' + book.id + '"]');
        image.classList.remove('hidden');
      }
    }
  }

  //6
  function determineRattingBgc(rating) {
    const background = '';
    if (rating < 6) {
      background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    }
    if (rating > 6 && rating <= 8) {
      background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    }
    if (rating > 8 && rating <= 9) {
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    }
    if (rating > 9) {
      background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
    return background;
  }
*/
}
/*
 ex 4
  const image = event.target.offsetParent;
*/
