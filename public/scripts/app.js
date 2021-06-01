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
let checkoutSum = 0;





//returns full HTML structure a single menu item box
function createMenuElement(menuData) {
  // console.log(menuData.thumbnail_picture_url)
  return $(`
    <section id="menu${menuData.id}" class="menu_item ${menuData.category}">
      <div class="menu_item_img">
        <img class="menu_item_pictures" src="${menuData.thumbnail_picture_url}">
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
        <button class="menu-item-button" type="submit">Add To Order</button>
      </form>
      </div>
   </section>
    `)
  };

  //loop through each obj element in the array and add the returned HTML structure to the main container
  function renderMenu(menuData) {

    for (let i = 0; i < menuData.length; i++) {
      const element = menuData[i];

      const $item = createMenuElement(element);
      if ((i>0) && (menuData[i].category !== menuData[i-1].category)){
        if (menuData[i].category === 'Whites') {
          $('div.menu').append(`<h1 class="Drinks menuType">Drinks</h1>`);
        }
        $('div.menu').append(`<h1 class="${menuData[i].category} menuType">${menuData[i].category}</h1>`);
      }
      if (i === 0) {
        $('div.menu').append(`<h1 class="${menuData[i].category} menuType">${menuData[i].category}</h1>`);
      }

      $('div.menu').append($item);
    }

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



      })

    }
    isStarted = true;
  }
  startOrder();
  // Object.keys(req.body)[0], req.body[Object.keys(req.body)[0]]

    const addToOrderElement = (quantity, itemDetails) => {
    return $(`
    <div class="menuItemsOrder" id="checkout${itemDetails.id}">
      <h6 class="quantity">${quantity}</h6>
      <h6 class="nameOfFoodItem">${itemDetails.name}</h6>
      <h6 class="price">$${itemDetails.price}</h6>
      <form class="delete-checkout-form">
        <button class="deleteItem" id='delete${itemDetails.id}' type="submit">X</button>
      </form>
    </div>
    `)
  }

  const addToOrder = (element) => {
    console.log('addtoOrder is called!')
    $('#checkoutAppendage').append(element);
  };
    // let forms = document.getElementsBy('.menu-item-form');




  $(document).on('submit', 'form.menu-item-form', function(event) {

    event.preventDefault();
    let data = $(this).serialize("");
    const text = decodeURIComponent(data);
    console.log("data", text)
    $.ajax({
      url: "/api/order",
      method: "POST",
      data: text
    }).then((quantity) => {
      console.log("YEAY:", quantity.addToOrder[0].menu_item_id);
      $.ajax({
        url: `/api/menu/${quantity.addToOrder[0].menu_item_id}`,
        method: 'GET'
      }).then((itemDetail) => {
        let quan = quantity.addToOrder[0].quantity;
        let itemDetails = itemDetail.menu[0];

        console.log('itemDetail:', itemDetails,'quantity:', quan);
        checkoutSum += (itemDetails.price * quan);
        console.log("checkoutSum", checkoutSum);
        addToOrder(addToOrderElement(quan, itemDetails));
        $('#checkoutSum').html(`Subtotal: $${checkoutSum}.00`);
      }).catch((err) => {
      console.log(err.message);
      })
    })
  })

  function removeFromCheckout(id) {
    $(`#checkout${id}`).remove();
  }
  $(document).on('submit', 'form.delete-checkout-form', function(event) {
      event.preventDefault();
      let itemToDelete = (event.target.parentElement.id).substring(8);
      removeFromCheckout(itemToDelete);
      let price = Number((event.target.parentNode.childNodes[5].innerText).substring(1));
      let quantity = Number((event.target.parentNode.childNodes[1].innerText));
      $.ajax({
        url: `api/order/delete/${itemToDelete}`,
        method: "DELETE",
      }).then((res) => {
        console.log("itemtodelete:", res);
        checkoutSum -= (price * quantity);
       $('#checkoutSum').html(`Subtotal: $${checkoutSum}.00`);
      })
    })


//   $(document).on('submit','form.menu-item-form', function(event) {
//     console.log('STARTED AJAX',event);
//   event.preventDefault();
//   let data = $(this).Val();
//   $.ajax({
//     url: "/api/order",
//     method: "POST",
//   }).then((result) => {
//     console.log("YEAY:", result);
//   }).catch((err) => {
//     err
//   })
// })

  // const addToOrder = () => {

    // }

     //ajax request onClick for login button at top of page

     $(document).on('submit', 'form.login', function(event) {
      event.preventDefault();
      console.log(event);
      // let user_id = req.session.user_id;
      $.ajax({
       url: `/login/3`,
       method: "GET"
     }).then(() => {
      $('div.userError').css({'display':'none'});
       $('.login').html('<button class="logout" type="submit">Welcome User! -- Logout</button>').removeClass('login').addClass('logout');
      }).catch((err) => {
        console.log(err);
      })

    })

   $(document).on('submit', 'form.logout', function(event) {
    event.preventDefault();
    $.ajax({
    url: `/logout`,
    method: "GET"
    }).then(() =>{

    $('.logout').html('<button class="login" type="submit">Login</button>').removeClass('logout').addClass('login');
    })
   })


     const checkoutElement = (order, items) => {
      let orderedItems = ``;
      for (item of items) {
      orderedItems += `
      <div class="eachOrder">
      <h3>${item.quantity}&nbsp&nbsp</h3>
      <h3 class="name">${item.name}&nbsp&nbsp</h3>
      <h3>$${item.price}</h3>
      </div>
      `;
    }
    return $(`
    <section id="checkout">
      <h1>Checkout</h1>

      ${orderedItems}
      <div class="subtotal">
      <h3>Subtotal</h3>
      <h3 id="checkoutSum">$${checkoutSum}</h3>
      </div>
      <div class="tax">
      <h3>Local Tax (12%)</h3>
      <h3 id="checkoutSum">$${Math.floor(checkoutSum * 0.12 * 100) / 100}</h3>
      </div>
      <div class="total">
      <h3>Total</h3>
      <h3 id="checkoutSum">$${Math.floor(checkoutSum * 1.12 * 100) / 100}</h3>
      </div>
        <form class="payForOrder">
        <button class="deleteItem" id='delete${order.id}' type="submit">Pay</button>
      </form>
    </section>
    `)
  }

  const renderCheckoutElement = (element) => {
    $('div#checkoutTime').append(element);
  }

    $('#checkoutButton').on('click', (event) => {
      event.preventDefault();
      if ($('form.logout')) {
        $('div.userError').css({'display':'none'});
      $.ajax({
        url: '/api/orders',
        method: 'PUT'
      }).then((result) => {
        $('.notOwner').css('display', 'none');
        $('.search').css('display', 'none');
        $('.isOwner').css('display', 'none');
        $('.checkoutTime').css('background', '#002E45');
        $('body').css('background', '#002E45');
        $('div.container-scroll').css('display', 'none');


          var position = $(".checkoutTime").offset().top;
          $("HTML, BODY").animate({
              scrollTop: position
          }, 1000);



        console.log('result:', result.order);
        let user = result.order[0];
        $.ajax({
          url: `/api/order/${user.id}`,
          method: 'GET'
        }).then((result2) => {
          console.log('result2:', result2)
          renderCheckoutElement(checkoutElement(user, result2.order))
        })
      }).catch((err) => {
        console.log(err);
      })
      }
      if ($('form.login')) {
        $('div.userError').css({'display':'flex'});
      }


    })






})
