const { getAllFoods } = require('../../server/database');

$(document).ready(function(){
  loadFoods();
})

const foodsData = getAllFoods();

const createFoodElement = function(foodsData) {

  const $food = $(` <article class="food-container">
           <img class="food-picture" src="${foodsData.food_picture_url}"/>
           <p class="food-name">${foodsData.title}</p>
           <p class="food-price">${foodsData.price_cents}</p>
            <button type="button" class="add-menu-btn"> + </button>
        </article>`);
        return $food;
};

const renderFoods = function (foods) {
  let $element;
  const $container = $('#menu-section');
  for (const food of foods) {
    $element = createFoodElement(food);
    $container.append($element);
  }
}

const loadFoods = function () {
  $.ajax('/order', { method: 'GET' })
  .then(renderFoods(foodsData));
};