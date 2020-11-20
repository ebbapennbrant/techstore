const main =  document.getElementsByTagName("main")[0];
const body = document.getElementsByTagName("body");
function addCard(product){
	const card = document.createElement("div");
	card.className = "cardContainer";
	const cardImage = document.createElement("img");
	cardImage.src = product.image;
	cardImage.className = "imageContainer";
	const cardTitle = document.createElement("h1");
	cardTitle.innerText = product.title;
	cardTitle.className = "cardTitle";
	const CardPrice = document.createElement("p");
	CardPrice.innerText = product.price+ " " + "kr";
	CardPrice.className = "price";
	const CardQuantity = document.createElement('p');
	CardQuantity.innerText = product.quantity + " " + "st";
	CardQuantity.className = "quantity";
	card.appendChild(cardImage);
	card.appendChild(cardTitle);
	card.appendChild(CardPrice);
	card.appendChild(CardQuantity);
	main.className = "main";
	main.appendChild(card);
	let btn = document.createElement("button");
	btn.className = "btnDeletCart";
	btn.innerHTML = `<i class="fa fa-trash-o"></i> &nbsp Ta bort`;
	card.appendChild(btn);
	btn.addEventListener ("click", e => {
			deleteCard(product)
	});
}
const productsStorage = localStorage.getItem("products");
	if (productsStorage) {
	const products = JSON.parse(productsStorage);
	products.forEach((element) => {
		addCard(element)

	});
	totalCostCards(products)
	CardQuantity(products)
}

function deleteCard(product){
	const productsStorage = localStorage.getItem("products");
	const products = JSON.parse(productsStorage);
	let productIndex;
	main.querySelectorAll(".cardContainer").forEach((card, index) => {
	if (card.getElementsByTagName("h1")[0].innerText === product.title) {
			productIndex = index;
	}
})

	products.splice(productIndex, 1)
	localStorage.setItem("products", JSON.stringify(products))
	const deletedCard = main.querySelectorAll(".cardContainer")[productIndex]
	main.removeChild(deletedCard)
	totalCostCards(products)
	CardQuantity(products)

}
function totalCostCards(products){
	let totalCost = 0;
	products.forEach((product) => {
			totalCost = totalCost + product.price * product.quantity
		});
	document.querySelectorAll(".total-price span")[0].innerText = totalCost;
}

function CardQuantity(products){
	let CardQuantity = 0;
	products.forEach((product) => {
			CardQuantity = CardQuantity + product.quantity
		});
	document.querySelectorAll(".cart-icon span")[0].innerText = CardQuantity;
}
function popUp(){
	if (confirm("Fortsätt till betalning.")){
			localStorage.clear()
			location.replace("./index.html")
	} 
}
function close() {
	if(document.getElementsByClassName('total-price').style.display=='block') {
	  document.getElementsByClassName('total-price').style.display='none';
	}
}  