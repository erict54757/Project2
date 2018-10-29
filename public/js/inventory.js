$(document).ready(function() {
    // Getting jQuery references to the post body, title, form, and category select
    var item = $("#item");
    var itemPrice = $("#price");
    var description = $("#description");
   
    // Adding an event listener for when the form is submitted
    $("#inv-creation").on("submit", function handleFormSubmit(event) {
      event.preventDefault();
      // Wont submit the post if we are missing a body or a title
      if (
        !item.val().trim() ||
        !itemPrice.val().trim() ||
        !description.val().trim()
      ) {
        return;
      }
      // Constructing a newPost object to hand to the database
      var newItem = {
        item: item.val(),
        itemPrice: itemPrice.val(),
        description: description.val()
      };
   
      console.log(newItem);
   
      // If we’re updating a post run updatePost to update a post
      // Otherwise run submitPost to create a whole new post
      createItem(newItem);
    });
   
    // Submits a new post and brings user to blog page upon completion
    function createItem(Post) {
      $.post("/api/items/", Post, function() {
        window.location.href = "/listings";
      });
    }
   
    // Gets post data for a post if we’re editing
    function getItems(id) {
      $.get("/api/items/" + id, function(data) {
        if (data) {
          // If this post exists, prefill our cms forms with its data
          titleInput.val(data.title);
          bodyInput.val(data.body);
          postCategorySelect.val(data.category);
          // If we have a post with this id, set a flag for us to know to update the post
          // when we hit submit
          updating = true;
        }
      });
    }
   
    // Update a given post, bring user to the blog page when done
    function updatePost(post) {
      $.ajax({
        method: "PUT",
        url: "/api/posts",
        data: post
      }).then(function() {
        window.location.href = "/blog";
      });
    }
   });