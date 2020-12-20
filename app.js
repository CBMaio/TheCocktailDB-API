const URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

let drinks = "";

const fetchData = async (url = URL) => {
  const response = await fetch(url);
  const { drinks } = await response.json();
  return drinks;
};

const createNode = ({
  strDrink,
  strDrinkThumb,
  strCategory,
  strAlcoholic,
  idDrink,
}) => {
  const node = `
    <div class="col-md-4 col-12" id="${idDrink}">
      <div class="card mt-5 ml-md-3">
        <img src="${strDrinkThumb}" class="drink-img"/>
        <div class="card-body">

          <h5 class="card-title"> ${strDrink} </h5>
          <p class="card-text">Category: ${strCategory}.</p>
          <p> Alcoholic: ${strAlcoholic} </p>
          
          <button onclick="selectDrink(${idDrink})" class="btn btn-block btn-danger">Ver ingredientes</button>

        </div>
      </div>
    </div>
  `;

  document.getElementById("drinks").insertAdjacentHTML("beforeend", node);
  return node;
};

const selectDrink = (idDrink) => {
  let drink = drinks.find((drink) => drink.idDrink === `${idDrink}`);

  let i = 1;
  while (drink[`strIngredient${i}`] !== null) {
    console.log(drink[`strIngredient${i}`]);
    i++;
  }

  console.log(drink.strInstructions);
};

const iterateDrinks = (drinks) => {
  drinks.map((drink) => {
    createNode(drink);
  });
};

const searchDrink = () => {};

const start = async () => {
  fetchData();
  drinks = await fetchData();
  console.log(drinks);
  iterateDrinks(drinks);
};

window.onload = start();
