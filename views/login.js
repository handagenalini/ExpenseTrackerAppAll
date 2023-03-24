async function login(e) {
    e.preventDefault();
    // console.log(e.target.name);
    const form = new FormData(e.target);
    console.log('12345')

    const loginDetails = {
        email: form.get("email"),
        password: form.get("password")

    }
    console.log(loginDetails)
    await axios.post('http://localhost:3000/login',loginDetails).then(response => {
        console.log('index1')
        if(response.status === 200){
            console.log('index')
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userDetails', JSON.stringify(response.data.user))
            alert('login done')
            window.location.href = "./expense.html" // change the page on successful login
        } else {
            throw new Error('Failed to login')
        }
    }).catch(err => {
        document.body.innerHTML += `<div style="color:red;">${err} <div>`;
    })
}
// function forgotpassword() {
//     window.location.href = "../ForgotPassword/index.html"
// }