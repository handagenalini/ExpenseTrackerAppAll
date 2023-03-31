async function password(e){
    e.preventDefault()
    const email=e.target.email.value
    const obj={
        email:email
    }
    const data= await axios.post(`http://localhost:3000/forgotpassword`,obj)
    try{
    if(response.status === 202){
        document.body.innerHTML += '<div style="color:red;">Mail Successfuly sent <div>'
    } else {
        throw new Error('Something went wrong!!!')
    }
}catch(err ) {
    document.body.innerHTML += `<div style="color:red;">${err} <div>`;
}

}