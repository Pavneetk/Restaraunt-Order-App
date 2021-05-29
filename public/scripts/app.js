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

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/menu"
  }).done((menu_items) => {
    for(menu_item of menu_items) {
      $("<div>").text(menu_items.name).appendTo($("body"));
    }
  });;
});

});
