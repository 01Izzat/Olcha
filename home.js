window.addEventListener("DOMContentLoaded", (e) => {
  let email = localStorage.getItem("email");
  if (!email) {
    window.location.href = "http://127.0.0.1:5500/index.html";
  }
});

let logoutBtn = document.querySelector(".logout");
let elProducts = document.querySelector(".products");
let elSearchproducts = document.querySelector(".search__products");
let elModalBody = document.querySelector(".modal-body");

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("email");
  window.location.href = "http://127.0.0.1:5500/index.html";
});

let likedArr = [];
let getData = [];

function fetchProducts() {
  Array.from(Array(9).keys()).forEach((i) => {
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
       </div>`;

    elProducts.insertAdjacentHTML("beforeend", loadCard);
  });

  fetch("https://api.escuelajs.co/api/v1/products?limit=20&offset=20", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        renderFun(data, elProducts);
        getData = data;
        return;
      }
      elProducts.innerHTML = `<h1>Xatolik yuz berdi</h1>`;
    })
    .catch((error) => {
      elProducts.innerHTML = `<h1>Xatolik yuz berdi</h1>`;
    })
    .finally(() => {});
}

fetchProducts();

function renderFun(data, list) {
  list.innerHTML = null;
  data.forEach((item) => {
    let findIndexLikedArr = likedArr.find((list) => list.id == item.id);
    let card = `<div class="card mb-3" style="width: 18rem;">
                  <img src=${item?.images[0]} class="card-img-top" alt="img">
                  <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${item?.title}</h5>
                    <p class="card-text flex-grow-1">${item?.description}</p>
                    <div class='d-flex justify-content-between'>
                      <p class="card-text text-success fs-4">Price:$${
                        item?.price
                      }</p>
                      <button id=${item.id} class="like__btn btn mb-4" ${
      findIndexLikedArr ? "btn-danger" : "btn btn-light"
    }>Like</button>
                    </div>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                  </div>
                </div>`;

    list.insertAdjacentHTML("beforeend", card);
  });
}

function fetchNameproduct(e) {
  fetch(`https://api.escuelajs.co/api/v1/products/?title=${e.target.value}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 0) {
        renderFun(data, elProducts);
        return;
      }
      elProducts.innerHTML = `<h1>Bunday ma'lumot topilmadi</h1>`;
    });
}
elSearchproducts.addEventListener("keyup", fetchNameproduct);

function likedEvent(elem) {
  elem.addEventListener("click", async (evt) => {
    if (evt.target.matches(".like__btn")) {
      let likedCardId = evt.target.id;

      await fetch(`https://api.escuelajs.co/api/v1/products/${likedCardId}`)
        .then((res) => res.json())
        .then((data) => {
          if (!data) {
            alert("ma'lumot yetib kemadi");
            return;
          }

          const findLikeEl = likedArr.find((item) => item.id == data.id);
          if (findLikeEl) {
            likedArr.filter((item) => item.id !== findLikeEl.id);
            return;
          }

          likedArr.push(data);
        })
        .catch((err) => {
          console.log(err);
        });
      renderFun(getData, elProducts);
      renderFun(likedArr, elModalBody);
      window.localStorage.setItem("likedArr", JSON.stringify(likedArr));
    }
  });
}

likedEvent(elProducts);
likedEvent(elModalBody);

renderFun(likedArr, elModalBody);
