let cashfree;
window.onload = function () {
     cashfree= Cashfree({
        mode: "sandbox",
    });
};
document.getElementById("renderBtn").addEventListener("click", async(event) => {
    event.preventDefault();
    
    const token = localStorage.getItem("token");  // Get JWT token
    
    if (!token) {
        alert("User not logged in");
        return;
    }

    // fetch session id from backend
    try{
       const response = await fetch('/payment/pay',{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Send token
        },
       })
       const data = await response.json()
       const paymentSessionId = data.paymentSessionId;
       const orderId = data.orderId

       //initaiate checkout options
       let checkoutOptions = {
        paymentSessionId : paymentSessionId,

        //new page payment option
        redirectTarget : "_modal" //default
       }

       // start checkout process
       const result = await new Promise((resolve,reject) => {
        setTimeout(async () => {
            try {
                const checkoutResult = await cashfree.checkout(checkoutOptions);
                resolve(checkoutResult);
            } catch (error) {
                reject(error); // If checkout fails, handle it properly
            }
        }, 500);
    });
    console.log(result)
       if(result.error){
        console.error(result.error)
       }

       if(result.paymentDetails){
        console.log(result.paymentDetails.paymentMessage)
        const response = await fetch(`/payment/payment-status/${orderId}`,{
            method :"GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`, // Include token
                "Content-Type": "application/json"
            }
        })

        const data = await response.json()
        console.log(data)
        alert("your payment is "+data.orderStatus)
        window.location.href = "/expense/add-expense";
       }
    }catch(err){
      console.log('error ',err.message)
    }
});