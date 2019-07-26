// Import Stuff

// Likes Class
class Likes {
  // Constructor
  constructor() {
    this.items = [];
  }

  // Add new liked item
  addItem({ id, title, author, image }) {
    // Create a new Item
    const item = { id, title, author, image };

    // Add the item to items
    this.items.push(item);

    // Update locally stored items
    this.saveItemsLocally();

    // Return the item
    return item;
  }

  // Remove a liked item
  removeItem({ id }) {
    // Find the index of the item with id
    const index = this.items.findIndex(item => item.id === id);

    // Remove the item from the items
    this.items.splice(index, 1);

    // Update locally stored items
    this.saveItemsLocally();
  }

  // Is the item liked
  isLiked(id) {
    // Check if the item is present in the items
    return this.items.findIndex(item => item.id === id) !== -1;
  }

  // Get the number of items liked
  getNumberOfItems() {
    // Return the length of items
    return this.items.length;
  }

  // Save items locally
  saveItemsLocally() {
    // Save items to localStorage
    localStorage.setItem('likedItems', JSON.stringify(this.items));
  }

  // Get locally stored items
  getItemsLocally() {
    // Get the items from localStorage
    const items = JSON.parse(localStorage.getItem('likedItems'));

    // If there are items append them to the instance
    if (items) this.items = items;
  }
}

// Export Likes Class
export default Likes;
