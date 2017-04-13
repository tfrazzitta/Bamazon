var exports= module.exports= {};

exports.Items = function(id,product_name,department,price,quantity){
 	this.id=id,
 	this.product_name=product_name,
 	this.department=department,
 	this.price=price,
 	this.quantity=quantity

	this.printInfo = function(){
 	console.log("id: "+this.id +"\n" + "product name: "+this.product_name+"\n" +"department: " + this.department +"\n" + "price: "+ this.price+ "\n" + "quantity: "+ this.quantity);
 }

  };