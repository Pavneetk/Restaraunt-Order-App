// const { user_id } = require('../../server.js');
// const cookieParser = require('cookie-parser');

$(document).ready(function () {
  // console.log(user_id);
// console.log(req.session.user_id);
// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });
// });

$("#appetizers").click(function () {
  $('#2')[0].scrollIntoView();
});


//returns full HTML structure a single menu item box
function createMenuElement(menuData) {
  return $(`
    <section id="${menuData.id}" class="menu_item ${menuData.category}">
      <div class="menu_item_img">
        <img src="${menuData.thumbnail_picture_url}">
      </div>
      <div class="nameDescription">
        <h3 class="menu-item-name">${menuData.name}</h3>
        <p class="menu_item_description">
        ${menuData.description}
        </p>
      </div>
      <div class="menu-item-add">
      <form id="${menuData.id}" class="menu-item-form">
      <h3 class="menu-item-price">${menuData.price}</h3>
        <input name="${menuData.id}" placeholder="quantity" type="text"></input>
        <input class="menu-item-form" type="submit" value="Add To Order">
      </form>
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
  console.log(isStarted);

  const startOrder = () => {
    if (isStarted === false) {
      $.ajax({
        url: "/api/orders",
        method: "POST",
      }).then((result) => {
        console.log(result);
      })

    }
    isStarted = true;
  }
  startOrder();
  // Object.keys(req.body)[0], req.body[Object.keys(req.body)[0]]

  const addToOrderElement = (orderInfo) => {
    `<div class="menuItemsOrder">
    <h5 class="quantity">${orderInfo[Object.keys(orderInfo)[0]]}</h5>
    <h5 class="nameOfFoodItem">${Object.keys(orderInfo)}</h5>
    <h5 class="price">${'asdf'}</h5>
    </div>`
  }

    $("button.checkoutButton").submit(function(event) {
      console.log('STARTED AJAX',event);
    event.preventDefault();
    let data = $(this).Val();
    $.post(
      "/api/order",
      data,
      function() => {
        console.log(data);
      }
  )

  // const addToOrder = () => {

    // }

    //  //ajax request onClick for login button at top of page
  //  const login = () => {
    //    $.ajax({
  //      url: `/login/`,
  //      method: "GET"
  //    })
  //  }
})


})
