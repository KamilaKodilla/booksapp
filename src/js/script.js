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
      images: '.book_image',
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
      book.ratingBgc = determineRattingBgc(book.rating);
      book.ratingWidth = book.rating * 10;

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

  function initActions() {
    /*referencja do wszystkich elementów .book_image w liście .booksList*/
    const booksContainer = document.querySelector(select.containerOf.booksList);
    //const booksImage = booksContainer.querySelectorAll('.book__image');

    /*pętla po każdym elemencie booksImage*/
    //for (let image of booksImage) {
    /*nasłuchiwacz uruchamiający funkcję dblclick i zatrzymujący domyślne zachowanie przeglądarki*/
    booksContainer.addEventListener('click', function (event) {
      event.preventDefault();
      const image = event.target.offsetParent;
      const idBook = image.getAttribute('data-id');
      if (!favoriteBooks.includes(idBook)) {
        image.classList.add('favorite');
        favoriteBooks.push(idBook);
      } else {
        image.classList.remove('favorite');
        favoriteBooks.splice(favoriteBooks.indexOf(idBook), 1);
      }
    });

    const booksFiltered = document.querySelector(select.containerOf.filters);
    console.log(booksFiltered);
    booksFiltered.addEventListener('change', function (event) {
      event.preventDefault();
      const clickedForm = event.target;
      console.log(clickedForm);
      if (clickedForm.type === 'checkbox' && clickedForm.tagName === 'INPUT' && clickedForm.name === 'filter') {
        if (clickedForm.checked == true) {
          filters.push(clickedForm.value);
        } else {
          filters.splice(filters.indexOf(clickedForm.value), 1)
        }
      }
      filterBooks();
    });

  }

  initActions();

  const filters = [];

  function filterBooks() {
    for (let book of dataSource.books) {
      let shouldBeHidden = false;
      for (const filter of filters) {
        if (!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
      if (shouldBeHidden) {
        const bookCover = document.querySelector('.book_image[data-id="' + book.id + '"]');
        bookCover.classList.add('hidden');
      } else {
        const bookCover = document.querySelector('.book_image[data-id="' + book.id + '"]');
        bookCover.classList.remove('hidden');
      }
    }
  };


  function determineRattingBgc(rating) {
    let background = '';
    if (rating < 6) {
      background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (rating > 6 && rating <= 8) {
      background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (rating > 8 && rating <= 9) {
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if (rating > 9) {
      background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
    return background;
  }

}
