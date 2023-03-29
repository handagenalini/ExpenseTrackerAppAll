
async function savetolocal(event){
     
        
        event.preventDefault()
        try{
        const amount=event.target.amount.value
        const description=event.target.description.value
        const category=event.target.category.value
        
        // localStorage.setItem('name',name)
        // localStorage.setItem('email',email)
        // localStorage.setItem('phonenumber',phonenumber)
        const obj={
            amount,
            description,
            category
        }
        console.log('---------------in front')
       const token= localStorage.getItem('token')
      
       const data=await axios.post('http://localhost:3000/addexpense',obj,{headers:{'Authorization':token}})
       console.log(data)
    const items=await data
    console.log(data)
        showUserOnScreen(items.data.newExpense)
        
    }catch(err){console.log(err)}
    }

    window.addEventListener("DOMContentLoaded", 
    async () => {

        try{
            const token= localStorage.getItem('token')

        const data= await axios.get('http://localhost:3000/getexpense',{headers:{'Authorization':token}})
        const response=await data
        console.log(response)
            for(var i =0; i< response.data.allExpense.length; i++){
              showUserOnScreen(response.data.allExpense[i])
            }
        }catch(err){
        console.log(err)
        }
             
            })
     function showUserOnScreen(user){
        
                    const parentNode=document.getElementById('listOfUsers')
                    
                    const childHTML=`<li id=${user.id}> ${user.amount}-----${user.description}--------${user.category}  
                        <button onclick=deleteuser('${user.id}','${user.amount}')> delete user</button>
                        <button onclick=edituser('${user.description}','${user.amount}','${user.category}','${user.id}')>edit user</button></li>`

                        parentNode.innerHTML=parentNode.innerHTML+childHTML
                        addition(user.amount)
                    }
                   
   async function deleteuser(userId,amount){
    try{
            const token= localStorage.getItem('token')
         
       const data= await axios.delete(`http://localhost:3000/deleteexpense/${userId}`,{headers:{'Authorization':token}})
        const response=await data.data
            console.log(response,'------------------------res')
            console.log(userId,'------------------userid')
            removeuserfromscreen(userId,amount)
            console.log(amount)
        }
        catch(err){console.log(err)}
                // console.log(description)
                // localStorage.removeItem(description)
                // removeuserfromscreen(description)
                }
      function removeuserfromscreen(userId,userdata){
        console.log(userId,'-------------in frontremove')
        
                    const parentNode=document.getElementById('listOfUsers')
                    const childNodeToBeDeleted=document.getElementById(userId)
                    console.log(childNodeToBeDeleted)
                    parentNode.removeChild(childNodeToBeDeleted)
                    minus(userdata)
                  
                }
                function edituser(description,amount,category,userId){
                    
                    document.getElementById('description').value=description
                    document.getElementById('amount').value=amount
                    document.getElementById('category').value=category 
                    // minus(amount)     
                    deleteuser(userId,amount) 
                    console.log(amount,'--------------------')  
                    // minus(amount) 
                    
                  
                }
 





    var prev=0

 function addition(user){
        
        prev=parseInt(prev)+parseInt(user)
     const parentNode=document.getElementById('add')

            
                    const childHTML=`<h4>Total Expences ${prev}</h4>`

                    parentNode.innerHTML=childHTML
                   
        // function minus(userId){
        // const newamount=prev-user.amount
        // const childHTML=`<li>total expences ${newamount}</li>`
        // parentNode.innerHTML=childHTML

    }
    function minus(amount){
    const parentNode=document.getElementById('add')
        const newamount=parseInt(prev)-parseInt(amount)
        prev=newamount
        console.log(amount)
        console.log(prev)
        console.log(newamount)

        const childHTML=`<h4>Total Expences ${newamount} $</h4>`
        parentNode.innerHTML=childHTML
        console.log(childHTML)

    }
    
document.getElementById('buy premium').onclick=async function(e){
    const token=localStorage.getItem('token')
    const response=await axios.get('http://localhost:3000/premium',{headers:{'Authorization':token}})
    console.log(response)
var options=    {
    "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
    "order_id": response.data.order.id,// For one time payment
    // This handler function will handle the success payment
    "handler": async function (response) {
       const res = await axios.post('http://localhost:3000/update',{
            order_id: options.order_id,
            payment_id: response.razorpay_payment_id,
        }, { headers: {"Authorization" : token} })
       
       console.log(res)
        alert('You are a Premium User Now')
        document.getElementById('rzp-button1').style.visibility = "hidden"
        document.getElementById('message').innerHTML = "You are a premium user "
        localStorage.setItem('token', res.data.token)
        showLeaderboard()
    },
 }
 const rzp1 = new Razorpay(options);
rzp1.open();
e.preventDefault();

rzp1.on('payment.failed', function (response){
  console.log(response)
  alert('Something went wrong')
});
}

