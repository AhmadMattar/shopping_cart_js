let email = document.getElementById('email')
let username = document.getElementById('username')
let password = document.getElementById('password')
let register_btn = document.getElementById('register_btn')


function validation() {
    if (!email.value || !username.value || !password.value) {
        alert('Please fill all fields!!!')
        return false
    }
    return true
}

register_btn.addEventListener('click', (e) => {
    e.preventDefault()
    register_btn.innerHTML = 'Loading...'
    register_btn.disabled = true
    if(validation()){
       localStorage.setItem('username', username.value)
       localStorage.setItem('password', password.value)
       setTimeout(() => {
        window.location.href = 'login.html'
       }, 1500);
       
    } else {
        register_btn.innerHTML = 'Sign Up'
        register_btn.disabled = false
    }
    
})