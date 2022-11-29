//query List
let itemList = document.querySelector('.list-group');
let recipe = document.querySelector('.list-group2');
let ingredients = document.querySelector('.list-group3');
let ingredientForm = document.querySelector('#ingredientForm');
let fruitIngredient = document.querySelector('#fruit')
let vegetableIngredient = document.querySelector('#vegetable')
let herbIngredient = document.querySelector('#herb')
let recipeImage = document.querySelector('#recipeImg')


//apiKey
let apiKey = 'd5028199943b4c82bc137f3bfbe07a38'





//form functions
ingredientForm.addEventListener('submit', (event) => {

event.preventDefault()
let itemFruit = document.createElement('li')
let itemVeg = document.createElement('li')
let itemHerb = document.createElement('li')



console.log(fruitIngredient.value)
console.log(vegetableIngredient.value)
console.log(herbIngredient.value)


itemFruit.innerHTML = fruitIngredient.value;
itemVeg.innerHTML = vegetableIngredient.value;
itemHerb.innerHTML = herbIngredient.value;


itemFruit.classList = 'list-group-item';
itemVeg.classList = 'list-group-item';
itemHerb.classList = 'list-group-item';

itemList.appendChild(itemFruit);
itemList.appendChild(itemVeg);
itemList.appendChild(itemHerb);




async function getIngredientList() {
	const response = await fetch(
		`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${fruitIngredient.value},+${vegetableIngredient.value},+${herbIngredient.value}&number=20`,
		{
			method: 'GET',
			headers: {
                'Content-Type': 'application/json'
			}
		});

        let data = await response.json();
        console.log(data)

		for (let i =0; i < data.length; i++){

		  function loadTableData() {
		  const table = document.querySelector(".table");
	      data.forEach(item => {
			
			
	    //Create Rows
			let row = table.insertRow();
            let name = row.insertCell(0);
            let dish = row.insertCell(1);
            let checkboxRow = row.insertCell(2);

         //add name
			name.innerHTML = item.title
            
       //add checkbox 
	        let checkbox = document.createElement("INPUT");   
            checkbox.type = "radio";
			checkbox.name ="recipeChoice"
			checkboxRow.appendChild(checkbox)

      //add dish to table   
            dish.innerHTML="";
            let img = document.createElement('img');
            img.src = item.image;
            img.style.height = "50px"
            dish.appendChild(img)



          row.addEventListener('click', () => {
		 
          console.log('clicked')

		  async function getRecipe() {
			const response = await fetch(`https://api.spoonacular.com/recipes/${item.id}/information?apiKey=${apiKey}`
			,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				});

				let data = await response.json();
				console.log(data)

				recipe.innerHTML = data.instructions
				recipeImage.src = data.image;



				   //second for loop
				   data.extendedIngredients.forEach(item => {
					let ingredientsItem = document.createElement('li');
					ingredientsItem.innerHTML = `${item.original} `
					ingredients.appendChild(ingredientsItem);
					console.log(item)


				   });

				
				
			
			}
			getRecipe()
		})



		    });

		}
	}
	loadTableData();
}

getIngredientList()



fruitIngredient.value = ""
vegetableIngredient.value = ""
herbIngredient.value = ""


})



let buttonReset = document.querySelector('#reset')
//button to reset the page
buttonReset.addEventListener('click', () => {

    location.reload();

})