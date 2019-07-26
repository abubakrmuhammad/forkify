// Import Stuff
import { elements } from './base';
import { Fraction } from 'fractional';

// Format the number to fractional
const formatCount = count => {
  // Check if there is a count
  if (count) {
    // Round the count
    const newCount = Math.round(count * 100) / 100;

    // Split the integer and decimal parts
    const [integer, decimal] = newCount
      .toString()
      .split('.')
      .map(num => parseInt(num, 10));

    // If there is not decimal part
    if (!decimal) {
      // Return the newCount
      return newCount;
    }

    // If there is no integer part
    if (integer === 0) {
      // Convert to fraction
      const fraction = new Fraction(newCount);

      // Return the fraction
      return `${fraction.numerator}/${fraction.denominator}`;
    } else {
      // Convert the decimal part to fraction
      const fraction = new Fraction(newCount - integer);

      // Return the integer part with fraction
      return `${integer} ${fraction.numerator}/${fraction.denominator}`;
    }
  }

  // Return unknown
  return '?';
};

// Create a new Ingredient
const createIngredient = ({ count, unit, ingredient }) => `
  <li class="recipe__item">
    <svg class="recipe__icon">
      <use href="img/icons.svg#icon-check"></use>
    </svg>
    <div class="recipe__count">${formatCount(count)}</div>
    <div class="recipe__ingredient">
      <span class="recipe__unit">${unit}</span>
      ${ingredient}
    </div>
  </li>
`;

/////////////////////////
// Export Stuff
////////////////////////

// Render a recipe
export const renderRecipe = (
  { title, author, image, url, ingredients, time, servings },
  isLiked
) => {
  // Makrup for the recipe
  const markup = `
    <figure class="recipe__fig">
      <img src="${image}" alt="${title}" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="img/icons.svg#icon-stopwatch"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${time}</span>
        <span class="recipe__info-text"> minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="img/icons.svg#icon-man"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${servings}</span>
        <span class="recipe__info-text"> servings</span>

        <div class="recipe__info-buttons">
          <button class="btn-tiny btn-decrease">
            <svg>
              <use href="img/icons.svg#icon-circle-with-minus"></use>
            </svg>
          </button>
          <button class="btn-tiny btn-increase">
            <svg>
              <use href="img/icons.svg#icon-circle-with-plus"></use>
            </svg>
          </button>
        </div>
      </div>
      <button class="recipe__love">
        <svg class="header__likes">
          <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
        </svg>
      </button>
    </div>

    <div class="recipe__ingredients">
      <ul class="recipe__ingredient-list">
        ${ingredients.map(createIngredient).join('')}
      </ul>

      <button class="btn-small recipe__btn recipe__btn--add">
        <svg class="search__icon">
          <use href="img/icons.svg#icon-shopping-cart"></use>
        </svg>
        <span>Add to shopping list</span>
      </button>
    </div>

    <div class="recipe__directions">
      <h2 class="heading-2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__by">${author}</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn-small recipe__btn"
        href="${url}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="img/icons.svg#icon-triangle-right"></use>
        </svg>
      </a>
    </div>
  `;

  // Insert the recipe in HTML
  elements.recipe.insertAdjacentHTML('afterbegin', markup);
};

// Clear the recipe
export const clearRecipe = () => {
  // Remove innerHTML from recipe
  elements.recipe.innerHTML = '';
};

// Update the servings and ingredients
export const updateServings = ({ servings, ingredients }) => {
  // Update the servings in UI
  document.querySelector('.recipe__info-data--people').textContent = servings;

  // Select all the ingredient counts
  document.querySelectorAll('.recipe__count').forEach((count, i) => {
    // Update the ingredient count
    count.textContent = formatCount(ingredients[i].count);
  });
};
