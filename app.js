const productsDOM = document.querySelector('.products')

let cart = [];

class Product {
    async getProducts() {
        try {
            const result = await fetch('products.json')
            const data = await result.json();

            let products = data.items

            products = products.map(item => {
                const { title, price } = item.fields
                const { id } = item.sys
                const image = item.fields.image.fields.file.url

                return { title, price, id, image }
            });

            return products
        } catch (err) {
            console.log(err)
        }
    }
}

class View {
    displayProducts(products) {
        let result = ''
        products.forEach(item => {
            result +=  `
            <article class="product">
            <div class="img-container">
                <img src=${item.image} alt=${item.title} class="product-img">
                
            </div>
            <div class="title-container">
            <h3>${item.title}</h3>
            <h4>price:${item.price}$</h4>
            </div>
            <button class="bag-btn" data-id=${item.id} >add</button>
        </article>
        `
        });

        productsDOM.innerHTML = result
    }
}

class Storage {

}

document.addEventListener("DOMContentLoaded", () => {
    const view = new View()
    const product = new Product()

    product
        .getProducts()
        .then((data) => view.displayProducts(data))
})