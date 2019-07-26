// Import Stuff
import { elements } from './base';
import { limitRecipeTitle } from './searchView';

// Toggle the like button
export const toggleLikeButton = isLiked => {
  // Decide the icon name
  const iconName = isLiked ? 'heart' : 'heart-outlined';

  // Change the heart icon
  document
    .querySelector('.recipe__love use')
    .setAttribute('href', `img/icons.svg#icon-${iconName}`);
};

// Toggle Like Menu visibility
export const toggleLikeMenu = numberOfLikes => {
  // Change the visibility base on likes
  elements.likesMenu.style.visibility = numberOfLikes > 0 ? 'visible' : 'hidden';
};

// Render liked Item
export const renderItem = ({ id, image, title, author }) => {
  // Markup for item
  const markup = `
    <li>
      <a class="likes__link" href="#${id}">
        <figure class="likes__fig">
          <img src="${image}" alt="${title}" />
        </figure>
        <div class="likes__data">
          <h4 class="likes__name">${limitRecipeTitle(title)}</h4>
          <p class="likes__author">${author}</p>
        </div>
      </a>
    </li>
  `;

  // Insert the item into HTML
  elements.likesList.insertAdjacentHTML('beforeend', markup);
};

// Remove a liked item
export const removeItem = id => {
  // Select the item with id
  const item = document.querySelector(`.likes__link[href="#${id}"]`).parentNode;

  // Remove the item
  item.parentNode.removeChild(item);
};
