const mercadopago = require("mercadopago");
mercadopago.configure({
  access_token: "TEST-5926084439420650-071014-ec73e925d2124822c5e53a2723120c5a-329144871",
});

// Crear preferencia en Mercado Pago
const preference = {
	items: [
	  {
		id: "item-ID-1234",
		title: "Mi producto",
		quantity: 1,
		unit_price: 75,
	  },
	],
  };
  
  mercadopago.preferences.create(preference)
	.then((response) => {
	  const preferenceId = response.body.id;
	  console.log("ID de preferencia:", preferenceId);
	  // Guardar o enviar el preferenceId como sea necesario
	})
	.catch((error) => {
	  console.error("Error al crear la preferencia:", error);
	});
