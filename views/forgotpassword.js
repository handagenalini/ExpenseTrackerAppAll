async function password(e){
    e.preventDefault()
    const email=e.target.email.value
    const obj={
        email:email
    }
    console.log(obj)
    const token=localStorage.getItem('token')
    console.log(token,'----------------------------------------')
    const data= await axios.post(`http://43.207.218.246:3000/forgotpassword`,obj)
    try{
    if(data.status === 200){
        document.body.innerHTML += '<div style="color:red;">Mail Successfuly sent <div>'
    } else {
        throw new Error('Something went wrong!!!')
    }
}catch(err ) {
    document.body.innerHTML += `<div style="color:red;">${err} <div>`;
}

}