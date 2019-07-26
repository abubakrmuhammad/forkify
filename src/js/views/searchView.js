// Import Stuff
import { elements } from './base';

// Render a recipe
const renderRecipe = recipe => {
  // Recipe markup
  const markup = `
  <li>
    <a class="results__link" href="#${recipe.recipe_id}">
      <figure class="results__fig">
        <img src="${recipe.image_url}" alt="${recipe.title}" />
      </figure>
      <div class="results__data">
        <h4 class="results__name">${limitRecipeTitle(recipe.title, 15)}</h4>
        <p class="results__author">${recipe.publisher}</p>
      </div>
    </a>
  </li>
  `;

  // Insert the recipe in the HTML
  elements.resultsList.insertAdjacentHTML('beforeend', markup);
};

// Generate a Pagination Button
const createButton = (currentPage, type) => `
  <button
    class="btn-inline results__btn--${type}"
    data-goto="${type === 'prev' ? currentPage - 1 : currentPage + 1}"
  >
    <span>Page ${type === 'prev' ? currentPage - 1 : currentPage + 1}</span>
    <svg class="search__icon">
      <use
        href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"
      ></use>
    </svg>
  </button>
`;

// Render Pagination Buttons
const renderButtons = (currentPage, numberOfRecipes, recipesPerPage) => {
  // Calculate total pages
  const totalPages = Math.ceil(numberOfRecipes / recipesPerPage);

  // To store button(s) markup
  let button;

  // Check which buttons to generate
  if (currentPage === 1 && totalPages > 1) {
    // Generate only the next button
    button = createButton(currentPage, 'next');
  } else if (currentPage < totalPages) {
    // Generate both next and previous buttons
    button = `
      ${createButton(currentPage, 'next')}
      ${createButton(currentPage, 'prev')}
    `;
  } else if (currentPage === totalPages && totalPages > 1) {
    // Generate only the previous button
    button = createButton(currentPage, 'prev');
  }

  // Insert the button(s) into HTML
  elements.resultsPages.insertAdjacentHTML('afterbegin', button);
};

/////////////////////////
// Export Stuff
////////////////////////

// Trim a recipe title
export const limitRecipeTitle = (title, limit = 17) => {
  // Store trimmed title words
  const newTitle = [];

  // Check if the title is longer than limit (17)
  if (title.length > limit) {
    // Reduce the splitted title
    title.split(' ').reduce((acc, cur) => {
      // Check if the title is smaller than limit (17)
      if (acc + cur.length <= limit) {
        // Add the word to new title
        newTitle.push(cur);
      }

      // Return the new length
      return acc + cur.length;
    }, 0);

    // Join and return the new trimmed title
    return `${newTitle.join(' ')} ...`;
  }

  // Return the same title
  return title;
};

// Get the search input value
export const getInput = () => elements.searchInput.value;

// Clear the search input
export const clearInput = () => {
  // Clear the input value
  elements.searchInput.value = '';
};

// Blur the search input
export const blurInput = () => {
  // Blur the input
  elements.searchInput.blur();
};

// Clear the results list
export const clearResults = () => {
  // Remove all the inner HTML
  elements.resultsList.innerHTML = '';
  elements.resultsPages.innerHTML = '';
};

// Render a Recipes Array in Current Page
export const renderRecipes = (recipes, currentPage = 1, recipesPerPage = 10) => {
  // Number of recipes to render in current page
  const start = (currentPage - 1) * recipesPerPage;
  const end = currentPage * recipesPerPage;

  // Render each recipe
  recipes.slice(start, end).forEach(renderRecipe);

  // Render the pagination buttons
  renderButtons(currentPage, recipes.length, recipesPerPage);
};

// Highlight selected Recipe
export const highlightSelected = id => {
  // Select all the results
  document.querySelectorAll('.results__link').forEach(result => {
    // Remove the active class
    result.classList.remove('results__link--active');
  });

  // Select the result with the id and add the active class
  document
    .querySelector(`.results__link[href="#${id}"]`)
    .classList.add('results__link--active');
};
