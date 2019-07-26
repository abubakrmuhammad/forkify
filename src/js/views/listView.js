// Import Stuff
import { elements } from './base';

// Render an Item
export const renderItem = ({ id, count, unit, ingredient }) => {
  // Item Markup
  const markup = `
    <li class="shopping__item" data-itemid=${id}>
      <div class="shopping__count">
        <input type="number" value="${count}" step="${count}" class="shopping__count-value" />
        <p>${unit}</p>
      </div>
      <p class="shopping__description">${ingredient}</p>
      <button class="shopping__delete btn-tiny">
        <svg>
          <use href="img/icons.svg#icon-circle-with-cross"></use>
        </svg>
      </button>
    </li>
  `;

  // Insert the item into HTML
  elements.shoppingList.insertAdjacentHTML('beforeend', markup);
};

// Remove an Item from the UI
export const removeItem = id => {
  // Select the item with the id
  const item = document.querySelector(`li[data-itemId="${id}"]`);

  if (item)
    // Remove the item
    item.parentNode.removeChild(item);
};
