import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase,ref,push,onValue,remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";



const appSettings={
    databaseURL:"https://add-to-cart-31473-default-rtdb.firebaseio.com/"

}


const app=initializeApp(appSettings);
const database=getDatabase(app);

const shoppingListInDB=ref(database,"ShoppingList")


const inputFeildEl=document.getElementById("input-field");
const addButtonEl=document.getElementById("add-button");
const ShoppingListEl=document.getElementById("shopping-list")

addButtonEl.addEventListener("click",function(){
    const inputvalue=inputFeildEl.value;

    if(inputvalue!=""){
      clearInputFeildEl()
      /* appendItemtoShoppingListEl(inputvalue) */
      push(shoppingListInDB,inputvalue)
      /* console.log(inputvalue); */
      
      
    }
    
    
})

function clearInputFeildEl(){
     inputFeildEl.value="";
}

function appendItemtoShoppingListEl(item){
      const itemvalue=item[1];
      const itemid=item[0];
     
      const newel=document.createElement("li");

      newel.textContent=itemvalue;
      ShoppingListEl.append(newel);
     
      newel.addEventListener("dblclick",function(){
           const currdb=ref(database,`ShoppingList/${itemid}`);
          remove(currdb);
          
          
      })


      
}

onValue(shoppingListInDB,function (snapshot){
    clearShoppingListEl();
    if(snapshot.exists()){
    const arr=Object.entries(snapshot.val());
    

    for(let i=0; i<arr.length;i++){
        const itemvec=arr[i];
        const itemkey=itemvec[0];
        const itemval=itemvec[1];
        appendItemtoShoppingListEl(itemvec);
    }

    }
    else{
        ShoppingListEl.innerHTML="no items in the cart!"
    }

    
    
    
})

function clearShoppingListEl(){
    ShoppingListEl.innerHTML="";
}















