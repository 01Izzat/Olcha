  window.addEventListener('DOMContentLoaded', (e) => {
    let email = localStorage.getItem('email')
    if(!email) {
      window.location.href = 'http://127.0.0.1:5500/index.html'
    }
  })

  let logoutBtn = document.querySelector('.logout')
  let elProducts = document.querySelector('.products')
  let elSearchproducts = document.querySelector('.search__products')

  logoutBtn.addEventListener('click', (e) => {
    localStorage.removeItem('email')
    window.location.href = "http://127.0.0.1:5500/index.html'"
  })

  function fetchProducts(data) {
    Array.from(Array(9).keys()).forEach(i => {
      let loadCard = `
      <div class="card mb-3" aria-hidden="true" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title placeholder-glow">
            <span class="placeholder col-6"></span>
          </h5>
          <p class="card-text placeholder-glow">
            <span class="placeholder col-7"></span>
            <span class="placeholder col-4"></span>
            <span class="placeholder col-4"></span>
            <span class="placeholder col-6"></span>
            <span class="placeholder col-8"></span>
          </p>
          <a class="btn btn-primary disabled placeholder col-6"></a>
        </div>
       </div>`

      elProducts.insertAdjacentElement('beforeend', loadCard)
    })

    fetch('https://api.escuelajs.co/api/v1/products?limit=20&offset=20', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
        .then(res => res.json())
        .then(data => {
          if(data) {
            renderFun(data)
            return;
          }
          elProducts.innerHTML = `<h1>Xatolik yuz berdi</h1>`
        })
        .catch(error => {
          elProducts.innerHTML = `<h1>Xatolik yuz berdi</h1>`
        })
        .finally(() => {

        }) 
    })
  }

  fetchProducts()


  function renderFun(data) {
    elProducts.innerHTML = null
    data.forEach((item) => {
      let card = `<div class="card mb-3" style="width: 18rem;">
      <img src=${item.image[0]} class="card-img-top" alt="...">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">Card title</h5>${item.title}
        <p class="card-text">${item.description}</p>
        <p class="card-text text-danger flex-grow-1">Price:$${item.price}
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>`

    elProducts.insertAdjacentElement('beforeend', card)
    })
  }

  function fetchNameproduct(evt) {
    fetch(`https://api.escuelajs.co/api/v1/products/?title=${evt.target.value}`)
    .then(res => res.json())
    .then(data => {
      if(data.length > 0){
        renderFun()
        return;
      }
      elProducts.innerHTML = `<h1>Bunday ma'lumot topilmadi</h1>`
    })
  }
  elSearchproducts.addEventListener('keyup', fetchNameproduct)
  