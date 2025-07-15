import { recipes } from './recipes.js';

export function setupSearch() {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const recipesSection = document.getElementById('recipesSection');

    searchForm.addEventListener('submit', searchHandler);

    function searchHandler(event) {
        event.preventDefault(); // Prevent form submission and page reload

        const query = searchInput.value.trim().toLowerCase();

        if (query === '') {
            renderRecipes(recipes); // Render all recipes if query is empty
        } else {
            const filteredRecipes = filterRecipes(query);
            renderRecipes(filteredRecipes);
        }
    }

    function filterRecipes(query) {
        return recipes.filter(recipe => {
            const inName = recipe.name.toLowerCase().includes(query);
            const inDescription = recipe.description.toLowerCase().includes(query);
            const inTags = recipe.tags && recipe.tags.some(tag => tag.toLowerCase().includes(query));
            const inIngredients = recipe.ingredients && recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query));
    
            return inName || inDescription || inTags || inIngredients;
        }).sort((a, b) => a.name.localeCompare(b.name));
    }
    
    function renderRecipes(recipes) {
        recipesSection.innerHTML = ''; // Clear previous recipes

        if (recipes.length === 0) {
            recipesSection.innerHTML = '<p>No recipes found.</p>';
            return;
        }

        recipes.forEach(recipe => {
            const recipeElement = createRecipeElement(recipe);
            recipesSection.appendChild(recipeElement);
        });
    }

    function createRecipeElement(recipe) {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');

        const recipeImage = document.createElement('img');
        recipeImage.src = recipe.image;
        recipeImage.alt = recipe.name;
        recipeDiv.appendChild(recipeImage);

        const recipeInfo = document.createElement('div');
        recipeInfo.classList.add('recipe-info');

        const recipeName = document.createElement('h2');
        recipeName.textContent = recipe.name;
        recipeInfo.appendChild(recipeName);

        const recipeDescription = document.createElement('p');
        recipeDescription.textContent = recipe.description;
        recipeInfo.appendChild(recipeDescription);

        const recipeTags = document.createElement('div');
        recipeTags.classList.add('tags');
        recipe.tags.forEach(tag => {
            const tagSpan = document.createElement('span');
            tagSpan.textContent = tag;
            recipeTags.appendChild(tagSpan);
        });
        recipeInfo.appendChild(recipeTags);

        recipeDiv.appendChild(recipeInfo);

        return recipeDiv;
    }
}
