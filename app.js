// Task: Define an array of dummy recipes with minimal data
const dummyRecipes = [];

class Recipe {
  constructor(name, ingredients, steps) {
    this.name = name;
    this.ingredients = ingredients;
    this.steps = steps;
  }
}

// Create recipe instances
const recipe1 = new Recipe(
  "Vanilla Cake",
  ["1 cup flour", "1/2 cup sugar", "1 tsp baking powder"],
  ["Mix dry ingredients", "Add wet ingredients", "Bake at 350°F for 30 minutes"]
);

const recipe2 = new Recipe(
  "Parmesan Chicken",
  ["4 chicken breasts", "1 cup breadcrumbs", "1/2 cup parmesan cheese"],
  [
    "Pound chicken breasts",
    "Coat with breadcrumb mixture",
    "Bake at 400°F for 25 minutes",
  ]
);

const recipe3 = new Recipe(
  "Spaghetti Bolognese",
  ["1 lb ground beef", "1 onion", "2 cloves garlic"],
  [
    "Brown ground beef",
    "Sauté onion and garlic",
    "Simmer with tomato sauce for 30 minutes",
  ]
);

// Add recipe instances to the dummyRecipes array
dummyRecipes.push(recipe1, recipe2, recipe3);

// Task: Set up event listeners for user interactions
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
});

function initializeApp() {
  // Task: Attach events to UI elements
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", handleSearchInput);

  const searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", handleSearchInput);

  displayRecipes(dummyRecipes);
}

function handleSearchInput(event) {
  const searchTerm = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase();
  const filteredRecipes = searchRecipes(searchTerm);
  displayRecipes(filteredRecipes);
}

// Task: Implement search functionality to filter recipes based on ingredients
function searchRecipes(searchTerm) {
  if (searchTerm === "") {
    return dummyRecipes;
  }

  const filteredRecipes = dummyRecipes.filter((recipe) => {
    const recipeData = `${recipe.name.toLowerCase()} ${recipe.ingredients
      .join(" ")
      .toLowerCase()} ${recipe.steps.join(" ").toLowerCase()}`;
    return recipeData.includes(searchTerm);
  });

  return filteredRecipes;
}

// Task: Implement a function to display recipes in the results section
function displayRecipes(recipes) {
  const resultsSection = document.getElementById("results");
  resultsSection.innerHTML = ""; // Clear previous results

  if (recipes.length === 0) {
    const noResultsMessage = document.createElement("p");
    noResultsMessage.textContent = "No recipes found.";
    resultsSection.appendChild(noResultsMessage);
  } else {
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];

      // Create recipe container
      const recipeContainer = document.createElement("div");
      recipeContainer.classList.add("recipe");
      recipeContainer.addEventListener("click", () => showModal(recipe));

      // Create recipe title
      const recipeTitle = document.createElement("h2");
      recipeTitle.textContent = recipe.name; // Display recipe name
      recipeContainer.appendChild(recipeTitle);

      // Append recipe container to results section
      resultsSection.appendChild(recipeContainer);
    }
  }
}

// Function to show the modal with recipe details
function showModal(recipe) {
  const modal = document.getElementById("recipeModal");
  const modalContent = document.getElementById("modalContent");
  const span = document.getElementsByClassName("close")[0];

  // Clear previous modal content
  modalContent.innerHTML = "";

  // Create recipe title
  const recipeTitle = document.createElement("h2");
  recipeTitle.textContent = recipe.name;
  modalContent.appendChild(recipeTitle);

  // Create ingredients list
  const ingredientsList = document.createElement("ul");
  const ingredientsTitle = document.createElement("h3");
  ingredientsTitle.textContent = "Ingredients:";
  modalContent.appendChild(ingredientsTitle);
  for (let j = 0; j < recipe.ingredients.length; j++) {
    const ingredient = document.createElement("li");
    ingredient.textContent = recipe.ingredients[j];
    ingredientsList.appendChild(ingredient);
  }
  modalContent.appendChild(ingredientsList);

  // Create steps list
  const stepsList = document.createElement("ol");
  const stepsTitle = document.createElement("h3");
  stepsTitle.textContent = "Steps:";
  modalContent.appendChild(stepsTitle);
  for (let j = 0; j < recipe.steps.length; j++) {
    const step = document.createElement("li");
    step.textContent = recipe.steps[j];
    stepsList.appendChild(step);
  }
  modalContent.appendChild(stepsList);

  // Show the modal
  modal.style.display = "block";

  // Close the modal when the user clicks on the close button or outside the modal
  span.onclick = function () {
    modal.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

// Task: Write a function to handle errors and display appropriate messages to the user
function handleErrors(error) {
  console.log("Error:", error);
  alert(error);
}
