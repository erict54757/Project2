$(document).ready(function () {
  // Getting jQuery references to the post body, title, form, and category select
  var item = $("#item");
  var itemPrice = $("#price");
  var description = $("#description");

  var $itemContainer = $(".item-container");

  var items = [];

  getItems();
  getReservation();

  function getItems() {
    $.get("/api/items", function(data) {
      items = data;
      initializeRows();
    });
  }
  function initializeRows() {
    $itemContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < items.length; i++) {
      rowsToAdd.push(createNewRow(items[i]));
    }
    $itemContainer.prepend(rowsToAdd);
  }

  function createNewRow(items) {
    var $newInputRow = $(
      [
        "<li class='list-group-item todo-item'>",
        "<span><strong>",
        items.item,
        "</strong></span>",
        "<span> - ",
        items.description,
        "</span>",
        "<span> $ ",
        items.price,
        "</span>",
        "<input type='text' class='edit' style='display: none;'>",
        "<button class='delete-item btn btn-danger'>x</button>",
        "</li>"
      ].join("")
    );

    $newInputRow.find("button.delete-item").data("id", items.id);
    $newInputRow.data("items", items);
    return $newInputRow;
  }


  function createItem(Post) {
    console.log(Post.price);
    $.post("/api/items", Post, getItems);
  }

  function createReservation(Post) {
    $.post("/api/reservations", Post, getReservations)
  }

  $(document).on("click", "button.delete-item", function(event){
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "api/items/"
    }).then(getItems);
  })

  // Adding an event listener for when the form is submitted
  $("#inv-creation").on("submit", function (event) {
    event.preventDefault();
    

    var price = itemPrice.val().trim()
    
    var rx = /^\d+(?:\.\d{1,2})?$/

    if (rx.test(price) && !item.val() === false && !description.val() === false) {
      console.log("success");
      var newItem = {
        item: item.val(),
        price: price,
        description: description.val()
      };
      console.log(newItem);
      createItem(newItem);
    }
    else if (price === "" && !item.val() === false && !description.val() === false) {
      var newReservation = {
        item: item.val(),
        description: description.val()
      };
      console.log(newReservation);
      createReservation(newReservation);
    }
    else if (!rx.test(price) && !item.val() === false && !description.val() === false) {
      return alert("price needs to be in $ format");
    }
    else if (!item.val() || !description.val()) {
      return alert("Item and item description can't be blank");
    }

  });

  // Submits a new post and brings user to blog page upon completion


  // $.get("/api/items", function (data) {

  //   if (data.length !== 0) {

  //     for (var i = 0; i < data.length; i++) {
  //       var row = $("<div>");
  //       row.addClass("items");
  //       row.append("<p><strong>" + data[i].item + "</strong></p>");
  //       row.append("<p>" + data[i].description + "</p>");
  //       if (data[i].price) {
  //         row.append("<p>$ " + data[i].price + "</p>");
  //       }
  //       $(".item-container").prepend(row);
  //     };
  //   }

  // });
});

  // // Gets post data for a post if we’re editing
  // function getItems(id) {
  //   $.get("/api/items/" + id, function (data) {
  //     if (data) {
  //       // If this post exists, prefill our cms forms with its data
  //       titleInput.val(data.title);
  //       bodyInput.val(data.body);
  //       postCategorySelect.val(data.category);
  //       // If we have a post with this id, set a flag for us to know to update the post
  //       // when we hit submit
  //       updating = true;
  //     }
  //   });
  // }

//   // Update a given post, bring user to the blog page when done
//   function updateItem(post) {
//     $.ajax({
//       method: "PUT",
//       url: "/api/makeinventory",
//       data: post
//     }).then(function () {
//       window.location.href = "/blog";
//     });
//   }
// });