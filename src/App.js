
// import { useState, useEffect } from 'react';
// import './App.css';
// import Swal from'sweetalert2';

// function App() {
//   const my_ID = '65473d06';
//   const my_key = 'e28cab4dc8fbf9574f8f018dc4a81663';
//   const url = 'https://api.edamam.com/api/nutrition-details';

//   //Search user input
// const [mySearch, setMySearch] = useState('');
// //Display analysis
// const [myNutrition, setMyNutrition] = useState();
// // const [myAnalysis, setMyMyAnalysis] = useState([]);


// //API request
// const getData = async (ingr) => {

//   const response = await fetch(`${url}?app_id=${my_ID}&app_key=${my_key}`, {
//   method: 'POST',
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({ingr: ingr})
// });
//   if (response.ok) {
//     const data = await response.json();
//     setMyNutrition(data);
//     console.log(data);
//   }
    
//   else {
//       Swal.fire({
//     icon: 'error',
//     title: 'Oops...',
//     text: 'We cannot calculate the nutrition for some ingredients. Please check spelling and/or enter missing quantity of ingredients.',
//   });
//   }
     
  
// }



// // useEffect(() => {
// //   const getAnalysis = async() => {
// //     const response = await fetch(`${url}?app_id=${my_ID}&app_key=${my_key}`);
// //     const data = await response.json();
// //     console.log(data)
// //   }
// //   getAnalysis()
// // }, [])

//   //https://api.edamam.com/api/nutrition-details?app_id=94726a4b&app_key=%20ce26d0359c0003ff31405d032f7e9738%09

//   const myDataSearch = (e) =>{
//     console.log(e.target.value)
//     setMySearch(e.target.value)
//    }

//   return (
//     <div className="App">
//       <div>
//       <h1>Nutrition Analysis</h1>
//       </div>
//       <div>
//       <form>
//       <input placeholder='Search...' onChange={myDataSearch} value={mySearch}>
//       </input>
//       <button className='searchIcon'>Search</button>
//     </form>
//       </div>
//     </div>
//   );
// }

// export default App;




import './App.css';
import { useEffect, useState } from 'react';
import Nutrition from './Nutrition';
// import logoGreen from './greenLogo.png';
import Calories from './Calories';
import Swal from'sweetalert2';
import LoaderPage from './Loader/LoaderPage';
import Total from './Total';
import plate from './UI/plate.png'
// import strawberry from './strawberry.png';
// import blueberry from './blueberry.png';


function App() {
  const my_ID = '94726a4b';
  const my_key = '5a8058ab335999753b3d3170d80e74f9';
  const url = 'https://api.edamam.com/api/nutrition-details';

  const [mySearch, setMySearch] = useState();
  const [wordSubmitted, setWordSubmitted] = useState('');
  const [myNutrition, setMyNutrition] = useState();
  const [stateLoader, setStateLoader] = useState(false);

  const getData = async (ingr) => {
    setStateLoader(true);

    const response = await fetch(`${url}?app_id=${my_ID}&app_key=${my_key}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ingr: ingr})
  });
    if (response.ok) {
      setStateLoader(false);
      const data = await response.json();
      setMyNutrition(data);
      console.log(data);
    }
      
    else {
       setStateLoader(false);
        Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'We cannot calculate the nutrition for some ingredients. Please check spelling and/or enter missing quantity of ingredients.',
    });
    }
       
    
  }
  
  const myRecipeSearch = (e) => {
     setMySearch(e.target.value);
}
const finalSearch = (e) => {
  e.preventDefault();
  setWordSubmitted(mySearch);
  
}

useEffect(() => {
  if (wordSubmitted !== '') {
    let ingr = wordSubmitted.split(/[,,;,\n,\r]/);
    getData(ingr);
  }
}, [wordSubmitted])
  return (
    <div className='container py-3'>
      <div className="App">
        <div>
          <img src={plate}/>
        </div>
     <div className='positionCenter'>
       <div className='header'>
       <h1>FULL RECIPE ANALYSIS</h1>
       </div>
       <div className='center'>
       <p>Simply provide the entire text of your recipe or ingredient list. No longer do you have to invest hours manually inputting each recipe ingredient. Our nutrition analysis is completed in mere seconds</p>
       </div>
 
       <form onSubmit={finalSearch}>
         {stateLoader && <LoaderPage />}
         <textarea
           placeholder="Search..."
           id="input"
           onChange={myRecipeSearch}
         />
         <button className='btn' type="submit">Analyze</button>
       </form>
     </div>
     
     <div>

       {
         myNutrition && Object.values(myNutrition.totalNutrientsKCal)
         .map(({ label, quantity, unit }, index) =>
           <Calories key={index}
             label={label}
             quantity={quantity}
             unit={unit}
           />
         )
       }
      
     
     <div className='positionCenter'>
         <p className='details'>
         NUTRITION DETAILS</p>
       </div>
       {
         myNutrition && Object.values(myNutrition.totalNutrients)
         .map(({ label, quantity, unit },index ) =>
             <Nutrition
             key={index}
               label={label}
               quantity={quantity}
               unit={unit}
             />
           )
       }
       
     </div>
   
   </div>
    </div>
  );
}

export default App;