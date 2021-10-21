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

 
var user;
firebase.auth().onAuthStateChanged((usr)=>{
    if(!usr)
    {
        location.replace("login.html");
    }
    else if(usr.email!="admin@gmail.com")
    {
        location.replace("menu.html");
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
                <a href="Updatefooddetails.html"><button href="#" class="btn cart" data-id="${idnoV}">Edit Details</button></a>
               
                <button href="#" class="btn order removefood" data-id="${idnoV}" >Remove Item</button>
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

   

        }); 

        
          

    }
    



        
        function ready() {
            var removefoodItemButtons = document.getElementsByClassName('removefood')
            for (var i = 0; i < removefoodItemButtons.length; i++) {
                var button = removefoodItemButtons[i];
                button.addEventListener('click',removefoodItem);
            }
           
        }

    async function removefoodItem(event)
    {
        

        // let data = await firebase.database().ref('cart/'+user).get();
        // var count = data.numChildren();
        // console.log(count);
        console.log(this.dataset.id,"h",event.target.getAttribute('data-id'));
        var dataID =this.dataset.id;

        firebase.database().ref('food/'+dataID).remove();

        var buttonClicked = event.target;
        buttonClicked.parentElement.parentElement.remove();
        console.log(buttonClicked.parentElement.getElementsByClassName("rem-btn")[0].innerText);



    }
        
