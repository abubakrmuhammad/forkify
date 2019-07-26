// Import Stuff
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';

// Global App State
const state = {};

// Recipe Search Handler
const searchHandler = async () => {
  // Get the input value
  const query = searchView.getInput();

  // Check if there is a value
  if (query) {
    // Create a new Search
    state.search = new Search(query);

    // Blure the search input
    searchView.blurInput();

    // Clear the results list
    searchView.clearResults();

    // Render Loader in the results list
    renderLoader(elements.results);

    // Get the results from the API
    await state.search.getResults();

    // Remove the loader
    clearLoader();

    // Render the recipes in the list
    searchView.renderRecipes(state.search.result);
  }
};

// Recipe Handler
const recipeHandler = async () => {
  // Get recipe id from url hash
  const id = window.location.hash.replace('#', '');

  // Check if there is an id
  if (id) {
    // Clear the recipe
    recipeView.clearRecipe();

    // Render the loader in Recipe
    renderLoader(elements.recipe);

    // Highlight selected recipe
    if (state.search) searchView.highlightSelected(id);

    // Create a new Recipe
    state.recipe = new Recipe(id);
    try {
      // Get the recipe from the server
      await state.recipe.getRecipe();

      // Parse the recipe ingredients
      state.recipe.parseIngredients();

      // Calculate the Cooking Time
      state.recipe.calculateTime();

      // Calculate the servings
      state.recipe.calculateServings();

      // Remove the loader
      clearLoader();

      // Render the Recipe in UI
      recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
    } catch (error) {
      console.error(error);
      alert('Something is wrong with this recipe.');
    }
  }
};

// Shopping List Handler
const listHandler = () => {
  // Check if there isn't an existing list
  if (!state.list) {
    // Create a new list
    state.list = new List();
  }

  // Loop through all the ingredients
  state.recipe.ingredients.forEach(ingredient => {
    // Add the ingredient to the list
    const item = state.list.addItem(ingredient);

    // Render the item
    listView.renderItem(item);
  });
};

// Like Handler
const likeHanlder = () => {
  // Check if there isn't an existing likes
  if (!state.likes) {
    // Create a new likes
    state.likes = new Likes();
  }

  // Check if the item is already liked
  if (!state.likes.isLiked(state.recipe.id)) {
    // Add the item to state
    const likedItem = state.likes.addItem(state.recipe);

    // Toggle the like button icon
    likesView.toggleLikeButton(true);

    // Add the item to UI
    likesView.renderItem(likedItem);
  } else {
    // Remove the item from state
    state.likes.removeItem(state.recipe);

    // Toggle the like button icon
    likesView.toggleLikeButton(false);

    // Remove the item from UI
    likesView.removeItem(state.recipe.id);
  }

  // Toggle the like Menu visibility
  likesView.toggleLikeMenu(state.likes.getNumberOfItems());
};

// Hash Change and Load Listeners
['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, recipeHandler)
);

// Get liked items from localStorage on load
window.addEventListener('load', () => {
  // Focus the search input
  elements.searchInput.focus();

  // Create new likes
  state.likes = new Likes();

  // Get locally stored items
  state.likes.getItemsLocally();

  // Toggle the like Menu visibility
  likesView.toggleLikeMenu(state.likes.getNumberOfItems());

  // Render the liked items
  state.likes.items.forEach(item => likesView.renderItem(item));
});

// Submit Listener for the search form
elements.searchForm.addEventListener('submit', event => {
  // Stop form from submitting
  event.preventDefault();

  // Handle the search manually
  searchHandler();
});

// Click listener for Pagination
elements.resultsPages.addEventListener('click', event => {
  // Get the button that was clicked
  const button = event.target.closest('.btn-inline');

  // Check if the button exists
  if (button) {
    // Get the page to goto
    const gotoPage = parseInt(button.dataset.goto, 10);

    // Clear the results list
    searchView.clearResults();

    // Render new recipes
    searchView.renderRecipes(state.search.result, gotoPage);
  }
});

// Click listener for elements inside Recipe
elements.recipe.addEventListener('click', event => {
  // Serving Increase Button
  if (event.target.matches('.btn-decrease, .btn-decrease *')) {
    // Minimum servings should be 1
    if (state.recipe.servings > 1) {
      // Decrease the servings
      state.recipe.updateServings('dec');

      // Update the servings in the UI
      recipeView.updateServings(state.recipe);
    }

    // Serving Decrease Button
  } else if (event.target.matches('.btn-increase, .btn-increase *')) {
    // Increase the servings
    state.recipe.updateServings('inc');

    // Update the servings in the UI
    recipeView.updateServings(state.recipe);

    // Add items to list Button
  } else if (event.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    // Add the ingredients to the list
    listHandler();

    // Like Button
  } else if (event.target.matches('.recipe__love, .recipe__love *')) {
    likeHanlder();
  }
});

// Click listener for elements inside Shoppping List
elements.shoppingList.addEventListener('click', event => {
  // Get the id of the item
  const id = event.target.closest('.shopping__item').dataset.itemid;

  // Handle click on delete button
  if (event.target.matches('.shopping__delete, .shopping__delete *')) {
    // Remove the item from state
    state.list.removeItem(id);

    // Remove the item form UI
    listView.removeItem(id);

    // Handle click on Count Input
  } else if (event.target.matches('.shopping__count-value')) {
    // Get the input value
    const value = parseFloat(event.target.value, 10);

    // Update the count in state
    state.list.updateCount(id, value);
  }
});
