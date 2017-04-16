var x = require("./object.js");
var database = require("mysql");
var inquirer = require("inquirer");
var id;

var number;
var quant;
var price;
var unit;
var diff
 //var unit =new Items(id,product_name,department,price,stock_quantity)
var connection = database.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: 'test',
  database: 'Bamazon'
});


function ProductsForSale(){
	connection.query("SELECT * FROM products" , function(error, results, fields){
			for(i=0;i<results.length;i++){
 					unit =new x.Items(results[i].id,results[i].product_name,results[i].department,results[i].price,results[i].stock_quantity);
						console.log(" ")
						unit.printInfo();
			}
	})

}


function LowInventory(){
	connection.query("SELECT * FROM products WHERE stock_quantity<10;" , function(error, results, fields){	
			for(i=0;i<results.length;i++){
 					unit =new x.Items(results[i].id,results[i].product_name,results[i].department,results[i].price,results[i].stock_quantity);
 					 	console.log(" ")
						unit.printInfo();
					
			}
	})
}


function AddToInventory(){
	inquirer.prompt([
					  {
					  	type:"input",
					    name: "id",
					    message: "Enter the id numer of the item"
					  },
					  {
					  	type:"input",
					    name: "quantity",
					    message: "Enter the updated amount of units"
					  },
					]).then(function(info){
						 diff= parseInt(info.quantity);
						 number=info.id;
						 var index = number-1;
						 connection.query("UPDATE products SET stock_quantity='"+ diff +"' WHERE id ='"+ number +"';" , function(error, results, fields){
						  if (error) throw error;

						 connection.query("SELECT * from products;", function (error, results, fields) {
						  if (error) throw error;
						  unit =new x.Items(results[index].id,results[index].product_name,results[index].department,results[index].price,results[index].stock_quantity);
					      console.log(" ")
						  console.log("Your inventory has been submitted")
						  unit.printInfo();
						})
					});
				});
}


function AddNewProduct(){
	inquirer.prompt([
					  {
					  	type:"input",
					    name: "product",
					    message: "Enter the name of the item"
					  },
					  {
					  	type:"input",
					    name: "department",
					    message: "What department is it listed under"
					  },
					  {
					  	type:"input",
					    name: "price",
					    message: "Enter the amount for the item"
					  },
					  {
					  	type:"input",
					    name: "inventory",
					    message: "How many units of the product are available"

				 	 },]).then(function(info){

						
						connection.query("INSERT INTO products (product_name,department,price,stock_quantity) VALUES (?,?,?,?)", [info.product,info.department,info.price,info.stock_quantity] , function(error, results, fields){
						 if (error) throw error;

								connection.query("SELECT * from products;", function (error, results, fields) {
                       		 		if (error) throw error;
                        			unit =new x.Items(results[0].id,results[0].product_name,results[0].department,results[0].price,results[0].stock_quantity);
										console.log(" ")
										console.log("Your entry has been submitted")
										unit.printInfo();

							 	})
						})
				})
}


function Start(){
	inquirer.prompt({
					name: "name",
					type: "list",
					message: "Choose from the following",
					choices:["View Products for Sale","View Low Inventory", "Add to Inventory","Add New Product" ]
						}).then(function(answer){
							if(answer.name==="View Products for Sale"){
								ProductsForSale();
							}
							if(answer.name==="View Low Inventory"){
								LowInventory();
							}
							if(answer.name==="Add to Inventory")
								AddToInventory();
							if(answer.name==="Add New Product"){
								AddNewProduct();
							}
					});

}

//Start();

module.exports = Start;
