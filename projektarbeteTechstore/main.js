

var listOfProducts;
 

/** Get products from the json file and store it in a gobal variable */
function loadProducts() {
    fetch("./products.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(products) {
        listOfProducts = products;
        addProductsToWebpage();
      
    });
}

function initSite() {
    loadProducts();
    // This would also be a good place to initialize other parts of the UI
}

/** Uses the loaded products data to create a visible product list on the website */
function addProductsToWebpage() {
       

         let body = document.body;


    for (let i = 0; i < listOfProducts.length; i++){
    const product = listOfProducts[i]

    let main = document.querySelector('main');
    let container = document.createElement("div");
    container.className = "main-container";
    main.appendChild(container);
    let infoContainer = document.createElement("div");
    let productTitle = document.createElement("h3");
    productTitle.innerHTML = product.title;
    productTitle.className = "title";
    let productInfo = document.createElement("p");
    productInfo.className = "description";
    productInfo.innerHTML = product.description;
    let imageContainer = document.createElement("div");
    let productImage = document.createElement("img");                                                                                                                                                                                                                                                                                                              
    imageContainer.className = "imageContainer";
    productImage.src = product.image;
    let productPrice = document.createElement("p");
    productPrice.innerHTML = product.price + " " + "kr";
    productPrice.className = "price";
    container.appendChild(infoContainer);
    infoContainer.appendChild(productTitle);
    infoContainer.className = "infoContainer";
    infoContainer.appendChild(productInfo);
    container.appendChild(imageContainer);
    imageContainer.appendChild(productImage);
    container.appendChild(productPrice);
    let btn = document.createElement("button");
    btn.className = "btnAddCart";
    btn.innerHTML = `<i class="fa fa-cart-plus" style="font-size:24px;color:white"></i>&nbsp
    Lägg till i kundvagnen`;
    container.appendChild(btn);

    btn.addEventListener ("click", function() {
        cartNumbers(listOfProducts[i]);
        totalCost(listOfProducts[i]);       
    });


    function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    
    if (productNumbers) {
    document.querySelector('.cart-icon span').textContent = productNumbers;

    }
    }
    function cartNumbers(product, action) {
        let productNumbers = localStorage.getItem('cartNumbers');
        productNumbers = parseInt(productNumbers);
        let cartItems = localStorage.getItem('productsInCart');
        cartItems = JSON.parse(cartItems);
        
        if ( action ) {
            localStorage.setItem("cartNumbers", productNumbers - 1);
            document.querySelector('.cart-icon span').textContent = productNumbers - 1;
            console.log("action running");
        } else if( productNumbers ) {
            localStorage.setItem("cartNumbers", productNumbers + 1);
            document.querySelector('.cart-icon span').textContent = productNumbers + 1;
        } else {
            localStorage.setItem("cartNumbers", 1);
            document.querySelector('.cart-icon span').textContent = 1;
        }
        setItems(product);
        displayCart()

    }
    function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null){
        let currentProduct = product.title;
        
        if (cartItems[currentProduct] == undefined) {
            cartItems = {
                ...cartItems,
                [currentProduct]: product
            }
        }
        cartItems[currentProduct].inCart += 1;
    }else {
        product.inCart =1;
        cartItems = {
        [product.title]: product
        };
    }
    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
  }  
    

   
    function totalCost(product) {

        let cartCost = localStorage.getItem('totalCost');
        if (cartCost != null){
            cartCost = parseInt(cartCost);
            localStorage.setItem("totalCost", cartCost + product.price);
        } else {
        localStorage.setItem("totalCost", product.price);
    }
  }

 }
    onLoadCartNumbers()
    
}

// cart page 
  


    function onLoadCartNumbers() {
        let productNumbers = localStorage.getItem('cartNumbers');
        
        if (productNumbers) {
        document.querySelector('.cart-icon span').textContent = productNumbers;
    
        }
        let totalPrice = localStorage.getItem('totalCost');
        
        if (productNumbers) {
        document.querySelector('.total-price span').textContent = totalPrice + " " + "kr";
    
        }
       displayCart()
          }
    
        function displayCart() {
            let cartItems = localStorage.getItem("productsInCart");
            cartItems = JSON.parse(cartItems);
             let productContainer = document.querySelector(".products-container");
            if (cartItems && productContainer ) {
                productContainer.innerHTML = '';
                Object.values(cartItems).map( 
                    (item, index) => {
                    productContainer.innerHTML += `
                    <div class="product">

                    <div class"cartimage"> <img src = "${item.image} "></div>
                    <div class"title"> <span>${item.title}</span> </div> 
                    <div class ="price" >${item.price * item.inCart}  kr </div>
                    <div class = "in-cart" >
                    <ion-icon class="decrease " name="arrow-dropleft-circle"></ion-icon>
                    <span>${item.inCart}</span>
                <ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>
                </div>
                    <button type="button" class="btn btn-cart"><i class="fa fa-trash-o"></i> &nbsp Ta bort</button>
                    </div>
                    ` 
                });
                deleteButtons();
                manageQuantity();
            }
            }
            
            function manageQuantity() {
                let decreaseButtons = document.querySelectorAll('.decrease');
                let increaseButtons = document.querySelectorAll('.increase');
                let currentQuantity = 0;
                let currentProduct = '';
                let cartItems = localStorage.getItem('productsInCart');
                cartItems = JSON.parse(cartItems);
            
                for(let i=0; i < increaseButtons.length; i++) {
                    decreaseButtons[i].addEventListener('click', () => {
                        console.log(cartItems);
                        currentQuantity = decreaseButtons[i].parentElement.parentElement.querySelector('span').textContent;
                        console.log(currentQuantity);
                        currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
                        console.log(currentProduct);
            
                        if( cartItems[currentProduct].inCart > 1 ) {
                            cartItems[currentProduct].inCart -= 1;
                            cartNumbers(cartItems[currentProduct], "decrease");
                            totalCost(cartItems[currentProduct], "decrease");
                            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                            displayCart();
                        }
                    });
            
                    increaseButtons[i].addEventListener('click', () => {
                        console.log(cartItems);
                        currentQuantity = increaseButtons[i].parentElement.parentElement.querySelector('span').textContent;
                        console.log(currentQuantity);
                        currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
                        console.log(currentProduct);
            
                        cartItems[currentProduct].inCart += 1;
                        cartNumbers(cartItems[currentProduct]);
                        totalCost(cartItems[currentProduct]);
                        localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                        displayCart();
                    });
                }
            }
            
            function deleteButtons() {
                let deleteButtons = document.querySelectorAll('.btn');
                let productNumbers = localStorage.getItem('cartNumbers');
                let cartCost = localStorage.getItem("totalCost");
                let cartItems = localStorage.getItem('productsInCart');
                cartItems = JSON.parse(cartItems);
                let productName;
                console.log(cartItems);

                for(let i=0; i < deleteButtons.length; i++) {
                    
                    deleteButtons[i].addEventListener('click', () => {
                        productName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g,'').trim();
                        localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
                        localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));
                        delete cartItems[productName];
                        localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            
                        
                    });
                }
            }
            



              
            onLoadCartNumbers();
            displayCart();




            
                /*
                let removCartItemsButtons = document.getElementsByClassName('btn-cart');
                for (let i = 0; 1 < removCartItemsButtons.length; i++) {
                    removCartItemsButtons[i].addEventListener('click', () => {
                        removCartItemsButtons[i].parentElement.parentElement.parentElement.remove();
                        localStorage.removeItem('cartNumbers', inca);
                        console.log(cartItems)
                        cartNumber()
                    })
                
                    }
                    function cartNumber() {
                        cartItems = JSON.parse(cartItems);
                        let productNumber = localStorage.getItem('cartNumbers');
                        productNumber = parseInt(productNumber)
                        if (productNumber) {
                            document.querySelector('.cart-icon span').textContent = productNumber - 1;
                            localStorage.setItem('cartNumbers', productNumber - 1);
                        }else{
                              
                            
                        }
                    }
                }
             
                 let removCartItemsButtons = document.getElementsByClassName('btn-cart');
                for (let i = 0; 1 < removCartItemsButtons.length; i++) {
                    let button = removCartItemsButtons[i];
                    button.addEventListener('click', function(event) {
                        let buttonClicked = event.target;
                        buttonClicked.parentElement.parentElement.parentElement.remove();
                        cartNumbers()
                    })
                   function cartNumbers(product) {
                        let productNumber = localStorage.getItem('cartNumbers');
                        let inCart = localStorage.getItem('productsInCart');
                        productNumber = parseInt(productNumber);
                        inCart = parseInt(inCart);
                        
                        if (productNumber) {
                        document.querySelector('.cart-icon span').textContent = productNumber - inCart;
                
                            localStorage.setItem('cartNumbers', productNumber - inCart)
                        }else {
                            localStorage.setItem('cartNumbers', 1)
                            document.querySelector('.cart-icon span').textContent = inCart;
                        }
                        setItems(product);
                
                    }
                }
                  function totalCost(products) {
                    let product = document.querySelector(".product");
                    let cartCost = localStorage.getItem('totalCost');
                    if (cartCost != null){
                      
                        localStorage.setItem("totalCost", cartCost - product.price);
                    } else {
                    localStorage.setItem("totalCost", product.price);
                }
              }

                      function updateCartTotal() {

                    let cartProduct = document.getElementsByClassName('product');

                    for (let i = 0; i < cartProduct.length; i++){

                        let cartProducts = cartProduct[i];

                        let priceElment = cartProducts.getElementsByClassName('price')[0];
                        let quantityElment = cartProducts.getElementsByClassName('in-cart');
                        
                        let price = parseFloat(priceElment.innerText.replace("kr", ""))
                        let quantity = quantityElment
                        quantity = parseFloat(quantityElment.innerText)
                          let total = price * quantity
                          total = document.querySelector('.total-price span').textContent = total + " "+ "kr";
                          total = localStorage.setItem('totalCost', total);
                        console.log(total);



                    }
                }*/
      
    
   
        onLoadCartNumbers()
        displayCart()