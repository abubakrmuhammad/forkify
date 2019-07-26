// Import Stuff
import uniqid from 'uniqid';

// List Class
class List {
  // Constructor
  constructor() {
    this.items = [];
  }

  // Add a new item to the list
  addItem({ count, unit, ingredient }) {
    // Create a new item
    const item = {
      id: uniqid(),
      count,
      unit,
      ingredient
    };

    // Add the item to items
    this.items.push(item);

    // Returnn the item
    return item;
  }

  // Remove an existing item from the list
  removeItem(id) {
    // Find the index of the item with id
    const index = this.items.findIndex(item => item.id === id);

    // Remove the item from the items
    this.items.splice(index, 1);
  }

  // Update the count of an existing item
  updateCount(id, newCount) {
    // Find the item with id and update it's count
    this.items.find(item => item.id === id).count = newCount;
  }
}

// Export List Class
export default List;
