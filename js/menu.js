const firebaseConfig = {
    apiKey: "AIzaSyAt0klAeEZAqnXxRcVWsD42xq4l1lzKvh8",
    authDomain: "stationery-stores-f6af0.firebaseapp.com",
    databaseURL: "https://stationery-stores-f6af0-default-rtdb.firebaseio.com",
    projectId: "stationery-stores-f6af0",
    storageBucket: "stationery-stores-f6af0.appspot.com",
    messagingSenderId: "907935666599",
    appId: "1:907935666599:web:ce34452aa7ff0bab5b6682",
    measurementId: "G-J58L2YBVH5"
  };
  firebase.initializeApp(firebaseConfig);

  firebase.auth().onAuthStateChanged((user)=>{
    if(!user)
    {
        location.replace("login.html")
     }
    // else
    // {
    //     document.getElementById("message").innerHTML="Hello, "+user.email.replace("@gmail.com",'')
    // }
})
var user;
firebase.auth().onAuthStateChanged((usr)=>{
    if(!usr)
    {
        location.replace("login.html");
    }
    else if(usr.email=="admin@gmail.com")
    {
        location.replace("menu_admin.html");
    }
    else
    {
        user=usr.email.replace("@gmail.com",'');
        window.onload= myFunction();
    }
})


    function createelemnet(ele,value)
    {
        let tag=document.createElement(ele);
        tag.textContent=value;
        return tag
    }

    function adddetails(nameV, idnoV,priceV,linkV)
    {
        document.getElementById("box-container").innerHTML+=`
        <div class="card">
            <div class="box">
                <span class="price">₹${priceV} for one</span>
                <img src=${linkV} alt="img">
                <h2>${nameV}</h2>
                <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <button href="#" class="btn cart" data-id="${idnoV}">Add to cart</button>
                <button href="#" class="btn order">Order Now</button>
            </div>
        </div>`


        if (document.readyState == 'loading') {
            document.addEventListener('DOMContentLoaded', ready)
            } else {
                ready()
            }

        


    }

    function myFunction() {
        
    
        firebase.database().ref('food').once('value',function(snapshot){
            snapshot.forEach(
            function(ChildSnapshot){
            var nameV = ChildSnapshot.val().name;
            var idnoV = ChildSnapshot.val().idno;
            var priceV= ChildSnapshot.val().price;
            var linkV = ChildSnapshot.val().Link;

            adddetails(nameV, idnoV,priceV,linkV);
            
        }
    );
    cartbuttonupdate()
   

        }); 
          

    }
    



        
        function ready() {

            var addToCartButtons = document.querySelectorAll('.cart');
            // console.log("hello", addToCartButtons.length);
            // console.log( addToCartButtons);

            for (var i = 0; i < addToCartButtons.length; i++) {
                var button = addToCartButtons[i];
                button.addEventListener('click',addToCartClicked);
             }
        }
        

        
        async function addToCartClicked(e)
        {   
        
            console.log(e.target.parentElement.getElementsByTagName("h2")[0].innerText);
            var fooditem = e.target.parentElement.getElementsByTagName("h2")[0].innerText;
            

            var idnoV, nameV,priceV,linkV;
            
            var id=this.dataset.id;
            

            firebase.database().ref('food').once('value',function(snapshot){
                                snapshot.forEach(
                                function(ChildSnapshot){
                                    if(ChildSnapshot.val().name == fooditem)
                                        {   
                                        idnoV = ChildSnapshot.val().idno;
                                        nameV = ChildSnapshot.val().name; 
                                        priceV= ChildSnapshot.val().price;
                                        linkV = ChildSnapshot.val().Link;

                                            console.log(user,idnoV,nameV,priceV,linkV);
                                            addToCart(user,idnoV,nameV,priceV,linkV);
                                        }
                                });

                                cartbuttonupdate()
                            }
                            
                            );


                    async function addToCart(user,idnoV,nameV,priceV,linkV)
                    {   
                        
                        firebase.database().ref('cart/'+user+'/'+ id).set({
                                    idno: idnoV,
                                    name: nameV,
                                    price: priceV,
                                    Link : linkV,
                                    quantity:1
                                },(error) => {
                                    if (error) {
                                        console.log("error",error)
                                    } else {
                                        console.log("Added to cart");
                                    }
                                  });
                
                    }
            
        }
            

          
    var i=0;
    function cartbuttonupdate()
    {        
        firebase.database().ref('cart/'+user).once('value',function(snapshot){
            snapshot.forEach(
            function(ChildSnapshot){
                let element=document.querySelector(`.cart[data-id="${ChildSnapshot.val().idno}"]`);
                //console.log(element);
                element.innerHTML="Added";
            });
        } 
        );
    }