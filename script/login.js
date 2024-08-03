let username = document.getElementById('username')
let password = document.getElementById('password')
let login_btn = document.getElementById('login_btn')
let local_username = localStorage.getItem('username')
let local_password = localStorage.getItem('password')

function validation() {
    if (!username.value || !password.value) {
        alert('Please fill all fields')
        return false;
    }
    return true
}


login_btn.addEventListener('click', (e) => {
    e.preventDefault();
    login_btn.innerHTML = 'Loading...'
    login_btn.disabled = true
    if (validation()) {
        if (username.value == local_username && password.value == local_password) {
            localStorage.setItem('is_login', true)
            setTimeout(() => {
                window.location.href = 'index.html'
            }, 1500)
        } else {
            alert('Wrong username or password')
            login_btn.innerHTML = 'Sign In'
            login_btn.disabled = false
        }
    } else {
        alert('Wrong username or password')
        login_btn.innerHTML = 'Sign In'
        login_btn.disabled = false
    }
})