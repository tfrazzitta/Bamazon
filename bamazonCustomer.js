var x = require("./object.js");
var app = require("./bamazonManger.js");
var database = require("mysql");
var inquirer = require("inquirer");
var id;
var SHOW = "SELECT * FROM products  WHERE id='"+ id +"';";
var number;
var quant;
var price;
var unit;
var diff
var amount;
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


PostItem =function(){
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
                        			diff = results[0].stock_quantity-quant;
                        			console.log(quant)
										console.log(" ")
										console.log("Your entry has been submitted")
										unit.printInfo();

							 	})
						})
				})
}


BidItem = function(){
	quant;
	price;
	inquirer.prompt([
					  {
					  	type:"input",
					    name: "id",
					    message: "Enter the id numer of the item"
					  },
					  {
					  	type:"input",
					    name: "quantity",
					    message: "How many units of the product they would like to buy"
					  },
					]).then(function(info){
						number = parseInt(info.id);
						quant= parseInt(info.quantity)
						query()
});
function query(){
	console.log(quant)
						connection.query("SELECT * FROM products  WHERE id='"+ number +"';", function (error, results, fields) {
							
							console.log(" ");
							console.log("You have selected the " + results[0].product_name)
							diff = results[0].stock_quantity- quant;
							console.log(diff)
		
 							 unit =new x.Items(results[0].id,results[0].product_name,results[0].department,results[0].price,quant);
 							 diff = results[0].stock_quantity-quant;
                        		
								if(quant>results[0].stock_quantity){
 								inquirer.prompt ({
			 									type:"input",
			 									name:"question",
			 									message:"There are only " + results[0].stock_quantity + " available. How many would you like?",
			 									}).then(function(ans){
			 											if(ans.question<=results[0].stock_quantity){
			 											quant=ans.question;
			 											price= results[0].price;
			 											console.log("----okie dokie-- ");
			 											end();
			 											}
			 											else{
			 												console.log("There was error. Try Again")
			 												unit= "";
			 												BidItem();
			 											}
 									});
 								}
 
 								else{
 									console.log(" ")
 									price= results[0].price;
 									console.log("There are " + results[0].stock_quantity + " are available")
 									console.log(" ")
 									console.log("You selected " + quant)
 									console.log(" ");
 									end();
 								}

						})
					
				
					
				}	
	}



function Pay(){
	console.log()
	//diff = unit.quantity;

	var cost= quant * price;
	console.log(" ");
	console.log("Your total is $ " + cost) 
	payQuery();

function payQuery(){
    var index = number-1; 
		connection.query("UPDATE products SET stock_quantity='"+ diff +"' WHERE id ='"+ number +"';" , function(error, results, fields){
				if (error) throw error;
				 connection.query("SELECT * FROM products  WHERE id='"+ number +"';", function (error, results, fields) {
                      if (error) throw error;
					      console.log(" ")
						  console.log("Your item has been updated")
						  unit.printInfo();
                  		  console.log(" ")

                     
					inquirer.prompt({
									name: "name",
									type: "list",
									message: "Press Yes confirm to process your order",
									choices:["Yes","No" ]
									}).then(function(answer){
										if(answer.name==="Yes"){
											console.log("sucesss~!!!")
											console.log(" ")
											console.log("Thank you for choosing Bamazon")
										}
										else{
											 inquirer.prompt({
															name: "name",
															type: "list",
															message: "Are you sure you want to quit?",
															choices:["Yes","No" ]
															  }).then(function(quit){
															  	     if(quit.name==="Yes"){
															  	     	unit= "";
															  	        BidItem();
															  	     }
															  	     else{
															  	     	end();
															  	     }
															  });
											}
					});
			})		
		})
	}
}



function Start(){
	inquirer.prompt({
					name: "name",
					type: "list",
					message: "Choose from the following",
					choices:["Post an item","Search an item by Id" ]
						}).then(function(answer){
							if(answer.name==="Post an item")
								PostItem();
							if(answer.name==="Search an item by Id"){
								BidItem();
						}
					});

}



function AddToCart(){
	diff= unit.quantity-quant;
	var diffy = unit.quantity;
	cartQuery()

function cartQuery(){
	console.log(number)
		diff = unit.quantity;
			connection.query("INSERT INTO cart (product_name,department,price,quantity) VALUES (?,?,?,?)", [unit.product_name,unit.department,unit.price,unit.quantity] , function(error, results, fields){
				if(error) throw error;
					console.log("INSERTED INTO CART SUCCESS")
					connection.query("UPDATE products SET stock_quantity='"+ diff +"' WHERE id ='"+ number +"';" , function(error, results, fields){
						console.log("UPDATED PRODUCTS")
				if (error) throw error;

				 connection.query("SELECT * FROM cart  WHERE id='"+ number +"';", function (error, results, fields) {
                      if (error) throw error;
                       	 console.log(" ")
						  console.log("Your item has been updated")
						  //console.log(results[0])
						  unit.printInfo();
                  		  console.log(" ");
      //             connection.query("SELECT * FROM products  WHERE id='"+ number +"';", function (error, results, fields) {
      //             			console.log(results[0])
						// })
					})
				})
		  })
	 }
}



function end(){
	console.log(" ")
		inquirer.prompt ({
						type:"list",
						name:"options",
						message:"Would you like to pay now or add to cart?",
						choices:["Pay Now","Add to Cart"]
						}).then(function(pay){
						    if(pay.options==="Pay Now"){
							  Pay();	
							}
						    else{
								AddToCart();
							}
						})
				
			   }




function Begin(){
	inquirer.prompt ({
						type:"list",
						name:"options",
						message:"Choose from the following",
						choices:["Customer","Manager"]
						}).then(function(res){
						    if(res.options==="Customer"){
							  Start();	
							}
						    else{
								app();
							}
						})

}





Begin();
