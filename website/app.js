/*
START
*/

// Create a new date instance dynamically with JS

let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

/* Global Variables */

const APIKey = "abb1f29dbcc40a26a8d79ab5e4660b4e";  
const genButton = document.getElementById('generate'); 

// Add event when clicking the button to make the actions
genButton.addEventListener('click',performAct);

// Function 1: The MAIN function which will run after clicking the button
async function performAct(e){
    const feelings = document.getElementById('feelings').value;
    const zipCode = document.getElementById('zip').value;
    if(!zipCode){
        alert("Please enter the Zipcode");
    }
    const url =`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${APIKey}&units=metric`;


    // First we get the info
    getInfo(url,zipCode)
    // then we pass the data to be saved
    .then( result =>{
        return postData('/saveInformation',result,feelings)
    })
    // then we put the data in the projectData object
    .then(result=>{
        return getData('/getInformation',result)
    })
    // then we update the UI and display the new info
    .then(result=>{

        updateUI(result)
        
    })
    
}


// Function 2: Connecting to the external API and getting the data from it
const getInfo = async (url,zipCode)=>{
    const response = await fetch(url);

        try{
            const dataFromExternalAPI = await response.json();
            return dataFromExternalAPI.main.temp;

        }catch(err){
            console.log("Error",err)
        }
}



// Function 3: The client side function to make a POST to the url and save the information.
const postData = async (url,temp,feelings)=>{
    const response = await fetch(url,{
        method: 'POST',
             credentials: 'same-origin',
             headers:{
                 'content-Type':'application/json'
             },
             body: JSON.stringify({
                 date: newDate,
                 temp: temp,
                 feelings:feelings
             })
    })
}


// Function 4: The client side function to make a Get route to fetch the data from the app endpoint
const getData = async (url,response)=>{
    const request = await fetch(url,{
        credentials: 'same-origin'
    })
        try {
            const allData = await request.json()

            return allData;
            }
            catch(error) {
            console.log("error", error);
        }
}


// Function 5: Updating UI by the data got from the external API
const updateUI = async(response)=>{
   
    try{
        const uiData = response;
        document.getElementById('date').innerHTML="Date: "+uiData.date;
        document.getElementById('temp').innerHTML="Temperature: "+uiData.temp;
        document.getElementById('content').innerHTML="Feelings: "+uiData.feelings;

    }catch(err){
        console.log("Error",err)
    }

}

/* ----------------------
END 
-------------------------*/