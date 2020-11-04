// fetch product.json

let products = fetch("./products.json")
.then(response => {
    return response.json();
})
.then(data => console.log(data))

// create new sections for all products ---> haven't gotten it to work yet
function sections() {
    for (let i=0; i < products.length; i++) {
        let newSection = document.createElement('section')
        let main = document.getElementById('main')
        main.appendchild(newSection)
    }
}

sections();

console.log(sections)