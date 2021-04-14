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
      images: '.book__image',
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

  /* class Bookslist {
    constructor(){
      const thisBooksList = this;

      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.renderInBooks();
      thisBooksList.initAction();
      thisBooksList.determineRatingBgc();
    }
    initData(){
      const thisBooksList = this;
      this.data = dataSource.books;
    }

    getElements(){
      const thisBooksList = this;
      thisBooksList.booksListContainer = document.querySelector(select.containerOf.booksList);
      thisBooksList.booksContainer = document.querySelector(select.containerOf.booksList);
      thisBooksList.booksFiltered = document.querySelector(select.containerOf.filters);
      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];
    }

    renderInBooks(){
      const thisBooksList = this;

      for (let book of thisBooksList.data) {
        book.ratingBgc = determineRattingBgc(book.rating);
        book.ratingWidth = book.rating * 10;
        const generatedHTML = templates.bookTemplate(book);

        const element = utils.createDOMFromHTML(generatedHTML);

        thisBooksList.booksListContainer.appendChild(element);
      }
    }

    initActions(){
      const thisBooksList = this;

      thisBooks.List.booksContainer.addEventListener('click', function (event) {
        event.preventDefault();
        const image = event.target.offsetParent;
        const idBook = image.getAttribute('data-id');
          if (!favoriteBooks.includes(idBook)) {
            image.classList.add('favorite');
            thisBooksList.favoriteBooks.push(idBook);
          }else {
            image.classList.remove('favorite');
            thisBooksList.favoriteBooks.splice(favoriteBooks.indexOf(idBook), 1);
          }
      });

      thisBooksList.booksFiltered.addEventListener('change', function (event) {
      event.preventDefault();
      const clickedForm = event.target;
      if (clickedForm.type === 'checkbox' && clickedForm.tagName === 'INPUT' && clickedForm.name === 'filter') {
        if (clickedForm.checked == true) {
          thisBooksList.filters.push(clickedForm.value);
        } else {
          thisBooksList.filters.splice(filters.indexOf(clickedForm.value), 1)
        }
      }
      thisBooksList.filterBooks();
    });
    }

    filterBooks(){
      const thisBooksList = this;

      for (let book of thisBooksList.data) {
        let shouldBeHidden = false;
        for (const filter of filters) {
          if (!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }
        if (shouldBeHidden) {
          const bookCover = document.querySelector('.book__image[data-id="' + book.id + '"]');
          bookCover.classList.add('hidden');
        } else {
          const bookCover = document.querySelector('.book__image[data-id="' + book.id + '"]');
          bookCover.classList.remove('hidden');
        }
      }
    }

    determineRatingBgc(rating){
      const thisBooksList = this;

      let background = '';
      if (rating < 6) {
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      }else if (rating > 6 && rating <= 8) {
        background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if (rating > 8 && rating <= 9) {
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (rating > 9) {
        background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
      return background;
    }
  }
  const app = {
    init: function(){
      new BooksList();
    }
  };
  app.init();
  */

  function renderInBooks() {

    /*pętla po każdym elemencie - książce z dataSource.books*/
    for (let book of dataSource.books) {
      /*generate HTML na podstawie szablonu oraz danych o konkretnej książce*/
      const ratingBgc = determineRatingBgc(book.rating);
      const ratingWidth = book.ratingBgc * 10;
      const generatedHTML = templates.bookTemplate({
        id: book.id,
        name: book.name,
        price: book.price,
        image: book.image,
        rating: book.rating,
        ratingBgc,
        ratingWidth,
      });

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
        const bookCover = document.querySelector('.book__image[data-id="' + book.id + '"]');
        bookCover.classList.add('hidden');
      } else {
        const bookCover = document.querySelector('.book__image[data-id="' + book.id + '"]');
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
