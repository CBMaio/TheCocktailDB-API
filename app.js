let URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

let drinks = "";

//traer tragos de la url
const fetchData = async (url = URL) => {
  const response = await fetch(url);
  let { drinks } = await response.json();
  return drinks;
};

//creamos una card por cada trago
const createNode = ({
  strDrink,
  strDrinkThumb,
  strCategory,
  strAlcoholic,
  idDrink,
}) => {

  const node = `
    <div class="col-md-4 col-12" id="${idDrink}">
      <div class="card card-style mt-5 ml-md-3">
        <img src="${strDrinkThumb}" class="drink-img"/>
        <div class="card-body">

          <h5 class="card-title"> ${strDrink} </h5>
          <p class="card-text">Category: ${strCategory}.</p>
          <p> Alcoholic: ${strAlcoholic} </p>
          
          <p><b>Ingredients:</b> ${selectDrink(idDrink).join(', ')}</p>
          <p id="text-${idDrink}"></p>
          <div>
            <button onclick="showInstructions(${idDrink})" class="w-100  btn btn-block btn-secondary">Instructions</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById("drinks").insertAdjacentHTML("beforeend", node);
  return node;
};

const del = (id) => {
  document.getElementById(id).remove();
};

//Busca y muestra los ingredientes del trago seleccionado
const selectDrink = (idDrink) => {
  let drink = drinks.find((drink) => drink.idDrink === `${idDrink}`);
  let i = 1;
  let ingredients = [];
  while (drink[`strIngredient${i}`] !== null) {
    ingredients.push(drink[`strIngredient${i}`]);
    i++;
  }

  return ingredients;
};

const showInstructions = (idDrink) => {
  let drink = drinks.find((drink) => drink.idDrink === `${idDrink}`);
  document.getElementById(`text-${idDrink}`).innerHTML = `
    <div class="alert alert-success" role="alert">
    <h4 class="alert-heading">Instructions</h4>
    <p>${drink.strInstructions}</p>
    <hr>
    </div>
  `
};

//iteración de array drinks, muestra una card por cada drink
const iterateDrinks = (drinks) => {
  drinks.map((drink) => {
    createNode(drink);
  });
};

//toma el valor del input search y genera un nuevo array con los tragos q contengan ese ingrediente
const searchDrink = async () => {
  drinks.map((drink) => del(drink.idDrink));
  const { value } = document.getElementById("ingredient-name");
  const urlSearch = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`;
  drinks = await fetchData(urlSearch);
  iterateDrinks(drinks);
};

const start = async () => {
  fetchData();
  drinks = await fetchData();
  iterateDrinks(drinks);
};

window.onload = start();
