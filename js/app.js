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
        <div class="img-container">
          <img src="${strDrinkThumb}" class="drink-img"/>
          <div class="instructions">
            <p id="text-${idDrink}> ${showInstructions(idDrink)} </p>
          </div>
        </div>
        <div class="card-body">
          <h5 class="card-title"> ${strDrink} </h5>
          <p class="card-text"> <b>Category: </b> ${strCategory}.</p>
          <p> <b>Alcoholic: </b> ${strAlcoholic}. </p>
          <p class="mb-3 mb-sm-0"><b>Ingredients:</b> ${selectDrink(idDrink).join(", ")}.</p>
        </div>
      </div>
    </div>
  `;

  document.getElementById("drinks").insertAdjacentHTML("beforeend", node);
  return node;
};

const del = (id) => {
  const element = document.getElementById(id)
  element ? element.remove() : null;
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

//Muestra las instrucciones de preparación del trago
const showInstructions = (idDrink) => {
  let drink = drinks.find((drink) => drink.idDrink === `${idDrink}`);
  const description = `
    <h4 class="alert-heading">Instructions</h4>
    <p>${drink.strInstructions}</p>
    <hr>
  `;

  return description;
};

//iteración de array drinks, muestra una card por cada drink
const iterateDrinks = (drinks) => {
  drinks.map((drink) => {
    createNode(drink);
  });
};

//muestra mensaje si no hay coincidencias de búsqueda y vuelve a traer los elementos de drinks originales
const showMessage = async () => {
  document.getElementById('try-again-text').innerHTML = 'Upsss... Please, try again!'
  drinks = await fetchData(URL);
};

//toma el valor del input search y genera un nuevo array con los tragos q contengan ese ingrediente
const searchDrink = async () => {
  document.getElementById('try-again-text').innerHTML = ''
  drinks.map((drink) => del(drink.idDrink));
  const { value } = document.getElementById("ingredient-name");
  const urlSearch = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`;
  drinks = await fetchData(urlSearch);
  drinks === null ? showMessage() : iterateDrinks(drinks);
};

const start = async () => {
  fetchData();
  drinks = await fetchData();
  iterateDrinks(drinks);
};

window.onload = start();
