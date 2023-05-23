window.addEventListener('DOMContentLoaded', (e) => {
  let email = localStorage.getItem('email')
  if(!email) {
    window.location.href = 'http://127.0.0.1:5500/index.html'
  }
})

let elForm = document.querySelector('.form')
    elEmail = document.querySelector('.email')
    elPassword = document.querySelector('.password')
    elUsername = document.querySelector('.username')
    elSignUpbtn = document.querySelector('.sign__btn')

elForm.addEventListener('submit', (e) => {
  e.preventDefault()
  elSignUpbtn.textContent = 'Loading...';
  fetch('https://api.escuelajs.co/api/v1/users/', {
    method: 'POST',
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify(
      {
        email: elEmail.value,
        password: elPassword.value,
        name:elUsername.value,
        avatar:'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png'
      }
    ).then(res => res.json())
     .then(data => {
        if(data.email) {
          localStorage.setItem('email', data.email)
          window.location.href = 'http://127.0.0.1:5500/home.html'
        }
        if(data.error) {
          alert(data.error)
        }
      })
      .catch((err) => {
        alert(err)
      })
      .finally(() => {
        console.log('Ishladi');
        elSignUpbtn.textContent = 'SignUp'
      })
  })
})