const express = require("express");
const app = express();
const cors = require("cors");
const mercadopago = require("mercadopago");

app.use(express.json());
app.use(cors());

mercadopago.configure({
	access_token:"TEST-1226444629337365-070415-300051315d51f196f21dd572c0bba03f-329144871",
});

app.get('/',function(req,res){
    res.send("El servidor de mercado pago funciona! ")
});
app.post("/create_preference", (req, res) => {

	let preference = {
		items: [
			{
				title: req.body.description,
				unit_price: Number(req.body.price),
				quantity: Number(req.body.quantity),
			}
		],
		back_urls: { // ajustar url de retorno
			"success": "http://localhost:3000",
			"failure": "http://localhost:3000",
			"pending": "http://localhost:3000"
		},
		auto_return: "approved",
	};

	mercadopago.preferences.create(preference)
		.then(function (response) {
			res.json({
				id: response.body.id
			});
		}).catch(function (error) {
			console.log(error);
		});
});

app.listen(8080, () => {
	console.log("The server is now running on Port 8080");
});