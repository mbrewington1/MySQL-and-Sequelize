let cart = [];
//this is the function to render all items in a database.
const renderItems = function(items) {
  items.forEach(function(item) {
    let newProduct = $(` <tr>
          <td class="id">${item.id}</td>
          <td class="product_name">${item.product_name}</td>
          <td class="department_name">${item.department_name}</td>
          <td class="price">${item.price}</td>
          <td class="stock_quantity">${item.stock_quantity}</td>
          <td class="quantity"><input class="buy1" id="input"></td>
          <td><button type="button" class="btn btn-info">Add to Cart</button><td>
        </tr>`);
    $(".tbodypage").append(newProduct);
  });
};

const clearInput = function() {
  $("[id =input]").val("");
};

// const validate = function(item) {
//   if (item.incart.padStart(4,0) > item.instock.padStart(4,0)) {
//     $(".alert").removeClass("hide");
//     clearInput();
//   } else if (isNaN(item.incart)){
//     $(".alert").removeClass("hide");
//     clearInput();
//   }
//   else {
//     cart.push(item);
//     clearInput();
//   }
// };

// takes in an object and 
const validate = function(item) {
  itemQty = parseInt(item.incart);
  stockQty = parseInt(item.instock);

  console.log(itemQty);
  // Check if itemQty is an integer
  if(isNaN(itemQty)) {
    return undefined;
  }

  // chek if stockQty is an integer
  if(isNaN(stockQty)) {
    return undefined;
  }

  // If itemQty is gt stockQty alert user
  if (itemQty > stockQty) {
    $(".alert").removeClass("hide");
    clearInput();
    return false;
  } else {
    cart.push(item);
    clearInput();
    return true;
  }
};

//this is the document ready function that says to render all the items in the database, to the table.
$(document).ready(() => {
  $.ajax({
    url: "/api/products",
    type: "GET"
  }).then(function(rows) {
    renderItems(rows);
  });
  //this says when the add to cart button is clicked, to then add the data to the array.
  $(".table-body").on("click", ".btn", function() {
    $(".alert").addClass("hide");
    const item = {
      id: $(this)
        .parents("tr")
        .find(".id")
        .text(),
      name: $(this)
        .parents("tr")
        .find(".product_name")
        .text(),
      department: $(this)
        .parents("tr")
        .find(".department_name")
        .text(),
      price: $(this)
        .parents("tr")
        .find(".price")
        .text(),
      instock: $(this)
        .parents("tr")
        .find(".stock_quantity")
        .text(),
      incart: $(this)
        .parents("tr")
        .find(".buy1")
        .val()
    };

    validate(item);
   

    console.table(cart);
  });

  $(".btncart").on("click", function() {
    $(".modal-body").empty();

    $('.modal-body').append (`  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">Product Id</th>
        <th scope="col">Product Name</th>
        <th scope="col">Department</th>
        <th scope="col">Cost (USD)</th>
        <th scope="col">Quanity</th>
      </tr>
    </thead>
    <tbody class="tbodymodal table-body"></tbody>
  </table>
  <div class="totalCart"></div>`);
    let totalcost = 0;
    for (let i = 0; i < cart.length; i++) {
      totalcost += (parseFloat(cart[i].price)*parseFloat(cart[i].incart.padStart(3,0)))
      console.log(cart[i]);
      $(".tbodymodal").append(`<tr>
    <td class="cartid">${cart[i].id}</td>
          <td class="cart-product_name">${cart[i].name}</td>
          <td class="cart-department_name">${cart[i].department}</td>
          <td class="cart-price">$${cart[i].price}</td>
          <td class="cat-quantity">${cart[i].incart}</td>
          </tr>`);
          
    }
    $(".totalCart").empty();
    $(".totalCart").append(`<h4>TOTAL PRICE:    $${totalcost}</h4>`)
    $(".modal").modal("show");
  });

  
});

$(".btnPurchase").on("click", function (){
  
  for(let i=0; i< cart.length; i++){
    const inCartnow = cart[i].incart ;
    const inStocknow = cart[i].instock ; 
    const newStock = function (a,b){
      return a - b;
    }
     stockUpdate= newStock(inStocknow, inCartnow)
    $.ajax({
      url: `/api/products/${cart[i].id}`,
      type: "PUT",
      data: `stock_quantity= ${stockUpdate}`
    }).then(function(data) {
      $('.tbodypage').empty();
      renderItems(data);
    }).catch(function(data){
      console.log(data);
    })
    $('.modal-body').empty();
    $('.modal-body').append("Purchase approved!")

  }
  cart= [];
});