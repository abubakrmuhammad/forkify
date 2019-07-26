// DOM Elements
export const elements = {
  searchForm: document.querySelector('.search'),
  searchInput: document.querySelector('.search__field'),
  results: document.querySelector('.results'),
  resultsList: document.querySelector('.results__list'),
  resultsPages: document.querySelector('.results__pages'),
  recipe: document.querySelector('.recipe'),
  shoppingList: document.querySelector('.shopping__list'),
  likesMenu: document.querySelector('.likes__field'),
  likesList: document.querySelector('.likes__list'),
  selectors: {
    loader: 'loader'
  }
};

// Render the loader as a child element
export const renderLoader = parent => {
  // Loader markup
  const loader = `
    <div class='${elements.selectors.loader}'>
      <svg>
        <use xlink:href="img/icons.svg#icon-cw"></use>
      </svg>
    </div>
  `;

  // Insert the loader in HTML
  parent.insertAdjacentHTML('afterbegin', loader);
};

// Remove the loader from UI
export const clearLoader = () => {
  // Select the loader
  const loader = document.querySelector(`.${elements.selectors.loader}`);

  // Check if there is a loader
  if (loader) {
    // Remove the loader
    loader.parentNode.removeChild(loader);
  }
};
