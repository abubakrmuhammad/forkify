// Import Stuff
import axios from 'axios';
import { proxy, key } from '../config';

// Search Class
class Search {
  // Constructor
  constructor(query) {
    this.query = query;
    this.result = [];
  }

  // Get results from the API
  async getResults() {
    // Error Handling
    try {
      // API Request
      const result = await axios(
        `${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`
      );

      // Append results to the instance
      this.result = result.data.recipes;
    } catch (error) {
      // Alert the error (if any)
      alert('Something went wrong. Please Try Again Later.');
    }
  }
}

// Export Search Class
export default Search;
