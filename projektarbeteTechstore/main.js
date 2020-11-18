

var listOfProducts;
 

/** Get products from the json file and store it in a gobal variable */
function loadProducts() {
    fetch("./products.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(products) {
        listOfProducts = products;
        addProductsToWebpage(listOfProducts);
      
    });
}

function initSite() {
    loadProducts();
    // This would also be a good place to initialize other parts of the UI
}

/** Uses the loaded products data to create a visible product list on the website */
function addProductsToWebpage(listOfProducts) {
	const body = document.body;
	for (let i = 0; i < listOfProducts.length; i++){
	const product = listOfProducts[i]
	const main = document.querySelector('main');
	const container = document.createElement("div");
	container.className = "main-container";
	main.appendChild(container);
	const infoContainer = document.createElement("div");
	const productTitle = document.createElement("h3");
	productTitle.innerText = product.title;
	productTitle.className = "title";
	const productInfo = document.createElement("p");
	productInfo.className = "description";
	productInfo.innerText = product.description;
	const imageContainer = document.createElement("div");
	const productImage = document.createElement("img");                                                                                                                                                                                                                                                                                                              
	imageContainer.className = "imageContainer";
	productImage.src = product.image;
	const productPrice = document.createElement("p");
	productPrice.innerHTML = product.price + " " + "kr";
	productPrice.className = "price";
	container.appendChild(infoContainer);
	infoContainer.appendChild(productTitle);
	infoContainer.className = "infoContainer";
	infoContainer.appendChild(productInfo);
	container.appendChild(imageContainer);
	imageContainer.appendChild(productImage);
	container.appendChild(productPrice);
	const btn = document.createElement("button");
	btn.className = "btnAddCart";
	btn.innerHTML = `<i class="fa fa-cart-plus" style="font-size:30px;color:black"></i>&nbsp
	Lägg till kundvagnen`;
	container.appendChild(btn);
	btn.addEventListener ("click", e => {
			addToCart(product);
	});
function onLoadCartNumbers() {
	const productNumbers = localStorage.getItem('cartNumbers');

	if (productNumbers) {
		document.querySelector('.cart-icon span').textContent = productNumbers;
}
}
function addToCart (product){
let productsStorage = localStorage.getItem("products");
let products = [];
if (productsStorage) {
						products = JSON.parse(productsStorage);
					// products = productsObj.products;
					let isNewProduct = true;
	for (let i = 0; i < products.length; i++) {
			const element =  products[i];
			if (element.title === product.title) {
					element.quantity = element.quantity +1
					isNewProduct = false;
			} 
	}
	if (isNewProduct){
			products.push(product)
			products[products.length -1].quantity = 1;
	}
	} else {
	products.push(product)
	products[0].quantity = 1;
	}
	localStorage.setItem("products", JSON.stringify(products))
	let cardQuantity = 0;
	products.forEach((product) => {
			cardQuantity = cardQuantity + product.quantity;
	})
	document.querySelectorAll(".cart-icon span")[0].innerText = cardQuantity;
}
		function cardQuantity(){
		let cardQuantity = 0;
		const productsStorage = localStorage.getItem("products");
	if (productsStorage) {
		const products = JSON.parse(productsStorage);
		products.forEach((product) => {
		cardQuantity = cardQuantity + product.quantity
		});
	}
	document.querySelectorAll(".cart-icon span")[0].innerText = cardQuantity;
  }
 }
onLoadCartNumbers()
cardQuantity()
}
