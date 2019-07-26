// Import Stuff
import axios from 'axios';
import { proxy, key } from '../config';

class Recipe {
  // Constructor
  constructor(id) {
    this.id = id;
    this.title = '';
    this.author = '';
    this.image = '';
    this.url = '';
    this.ingredients = [];
    this.time = 0;
    this.servings = 0;
  }

  // Get recipe from the server
  async getRecipe() {
    try {
      // API Request
      const { data } = await axios(
        `${proxy}http://food2fork.com/api/get?key=${key}&rId=${this.id}`
      );

      // Append data to the instance
      this.title = data.recipe.title;
      this.author = data.recipe.publisher;
      this.image = data.recipe.image_url;
      this.url = data.recipe.source_url;
      this.ingredients = data.recipe.ingredients;
    } catch (error) {
      // Alert the error (if any)
      alert('Something went wrong while getting the recipe :(');
    }
  }

  // Calculate time needed to cook
  calculateTime() {
    // Number of ingredients
    const numberOfIngredients = this.ingredients.length;
    // Number of periods (1 period = 3 ingredients)
    const periods = Math.ceil(numberOfIngredients / 3);

    // Time needed to cook (1 period takes 15 minutes)
    this.time = periods * 15;
  }

  // Calculate the servings
  calculateServings() {
    this.servings = 4;
  }

  // Formating the Ingredients
  parseIngredients() {
    // Units Reference
    const units = {
      long: [
        'tablespoons',
        'tablespoon',
        'ounces',
        'ounce',
        'teaspoons',
        'teaspoon',
        'cups',
        'pounds'
      ],
      short: ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound']
    };

    // More Units
    const moreUnits = [...units.short, 'kg', 'g'];

    // New Ingredients with short uniform units
    const newIngredients = this.ingredients.map(ingredient => {
      // Convert the ingredient to lowercase
      ingredient = ingredient.toLowerCase();

      // Look for a long unit in the ingredient
      units.long.forEach((unit, i) => {
        // Replace the long unit with short uni in the ingredient
        ingredient = ingredient.replace(unit, units.short[i]);
      });

      // Remove Parenthesis Stuff
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

      // Split the ingredient into words
      const arrayIngredient = ingredient.split(' ');

      // Find the index of the unit word
      const unitIndex = arrayIngredient.findIndex(word =>
        moreUnits.includes(word)
      );

      // Object for each ingredient
      let objectIngredient;

      // There is a unit and some quantity
      if (unitIndex > -1) {
        // Get ingredient count into a seperate array
        const arrayCount = arrayIngredient.slice(0, unitIndex);

        // For Storing Count
        let count;

        if (arrayCount.length === 1) {
          // There is only on count
          count = eval(arrayIngredient[0].replace('-', '+'));
        } else {
          // There are multiple counts
          count = eval(arrayIngredient.slice(0, unitIndex).join('+'));
        }

        objectIngredient = {
          count,
          unit: arrayIngredient[unitIndex],
          ingredient: arrayIngredient.slice(unitIndex + 1).join(' ')
        };
      } else if (parseInt(arrayIngredient[0], 10)) {
        // There is no unit but some quantity in the beginning
        objectIngredient = {
          count: eval(arrayIngredient[0]),
          unit: '',
          ingredient: arrayIngredient.slice(1).join(' ')
        };
      } else if (unitIndex === -1) {
        // There is no unit and no quantity
        objectIngredient = {
          count: 1,
          unit: '',
          ingredient
        };
      }

      return objectIngredient;
    });

    // Appen parsed Ingredients to the instance
    this.ingredients = newIngredients;
  }

  // Update the servings of the instance
  updateServings(type) {
    // Increase OR Decrease servings
    const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

    // Change the ingredients count
    this.ingredients.forEach(ingredient => {
      ingredient.count *= newServings / this.servings;
    });

    // Append new servings to the instance
    this.servings = newServings;
  }
}

// Export Recipe Class
export default Recipe;
