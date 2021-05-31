$(document).ready(function () {

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});

$("#appetizers").click(function () {
  $('#2')[0].scrollIntoView();
});

//returns full HTML structure a single tweet box
function createMenuElement(menuData) {
  return $(`
    <section id="${menuData.id}" class="menu_item ${menuData.category}">
      <div class="menu_item_img">
        <img src="${menuData.thumbnail_picture_url}">
      </div>
      <h3 class="menu_item_name">${menuData.name}</h3>
      <p class="menu_item_description">
      ${menuData.description}
      </p>
      <div class="menu_item_add">
      <h3 class="menu_item_price">$${menuData.price}</h3>
      <span>Add to order</span>
      </div>
   </section>
    `)
  };

  //loop through each obj element in the array and add the returned HTML structure to the main container
  function renderMenu(menuData) {
    menuData.forEach(element => {
      const $item = createMenuElement(element);
      $('div.menu').append($item);
    });
  }

  //ajax get request to server returns menu_items data and call rendermenu functiong with it
  function loadData() {
    $.ajax({
      url: "/api/menu",
      method: "GET",
    }).then((result) => {
      renderMenu(result.menu);
    })
  };

  //initiates menu_items data loading on page load
  loadData();
  let isStarted = false;
  function startOrder() {
    $.ajax({
      url: "/api/orders",
      method: "POST",
    }).then((result) => {
      console.log(result);
    })
  }
    $('document').scroll(startOrder());


});
