const express = require("express");
const app = express();
const cors = require("cors");
const mercadopago = require("mercadopago");

app.use(express.json());
app.use(cors());


/* Metodo checkpro
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

// Ruta para obtener los métodos de pago
app.get("/payment_methods", (req, res) => {
	mercadopago.paymentMethods.all()
	  .then(response => {
		res.json(response);
	  })
	  .catch(error => {
		res.status(500).json({ error: "Error al obtener los métodos de pago" });
	  });
  });


app.listen(8080, () => {
	console.log("The server is now running on Port 8080");
});

*/

mercadopago.configurations.setAccessToken('TEST-7239989042241863-071000-4918b62036394ba518f28a3db465dd98-329144871');

mercadopago.payment_methods.listAll()
  .then((response) => {
    const payment_methods = response.body;
    console.log(payment_methods);
  })
  .catch((error) => {
    console.error('Error al obtener los métodos de pago:', error);
  });



app.post('/procesar-pago', (req, res) => {
	const payment = req.body;
  
	const paymentData = {
	  transaction_amount: 5000,
	  description: 'Título del producto',
	  payment_method_id: 'pse',
	  payer: {
		entity_type: 'individual',
		email: payment.email,
		identification: {
		  type: payment.identificationType,
		  number: payment.identificationNumber
		}
	  },
	  additional_info: {
		ip_address: '127.0.0.1'
	  },
	  transaction_details: {
		financial_institution: '1009'
	  },
	  callback_url: 'http://www.your-site.com'
	};
  
	mercadopago.payment.save(paymentData)
	  .then(function(response) {
		res.status(response.status).json({
		  status: response.body.status,
		  status_detail: response.body.status_detail,
		  id: response.body.id,
		});
	  })
	  .catch(function(error) {
		res.status(error.status).send(error);
	  });
  });
  

  app.get('/',function(req,res){
    res.send("El servidor de mercado pago funciona! ")
});

  app.listen(8080, () => {
	console.log("The server is now running on Port 8080");
});