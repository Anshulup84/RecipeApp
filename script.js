const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content")
const recipeCloseBtn = document.querySelector(".recipe-close-btn")

const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>"
  const data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );
  const response = await data.json();

  recipeContainer.innerHTML = ""
  response.meals.forEach((meal) => {
    const recipeDiv = document.createElement("div");
    recipeDiv.classList.add("recipe");
    recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish</p>
             <p>Belongs to <span>${meal.strCategory}</span> Category</p>
            `
    const button = document.createElement('button') 
    button.textContent = "View Recipe"       
    recipeDiv.appendChild(button)

    // Adding EventListener to recipe button
    button.addEventListener('click', ()=> {
      openRecipePopup(meal)
    })
    recipeContainer.appendChild(recipeDiv);
  });
};

// Function to fetch ingredients and measurements
const fetchIngredients = (meal) => {
  let ingredientsList = "";
  for(let i=1; i<=20; i++){
    const ingredient = meal[`strIngredient${i}`]
    if(ingredient){
      const measure = meal[`strMeasure${i}`];
      ingredientsList += `<li>${measure} ${ingredient}</li>`
    }
    else{
      break;
    }
  }
  return ingredientsList
}
const openRecipePopup = (meal) => {
  recipeDetailsContent.innerHTML = `
  <h2>${meal.strMeal}</h2>
  <h3>Ingredients:</h3>
  <ul>${fetchIngredients(meal)}</ul>
  `
  recipeDetailsContent.parentElement.style.display = 'block'
}

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchInput = searchBox.value.trim();
  fetchRecipes(searchInput);
});
