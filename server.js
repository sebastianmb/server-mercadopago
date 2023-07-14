const express = require('express');
const bodyParser = require('body-parser');
const mercadopago = require("mercadopago");
const cors= require('cors');

mercadopago.configure({
  access_token: "TEST-5926084439420650-071014-ec73e925d2124822c5e53a2723120c5a-329144871",
});



const app = express();

app.use(cors()); // Habilitar CORS
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint /process_payment
app.post('/process_payment', (req, res) => {
  const token = req.body.token;
  // Obtener otros datos necesarios para el pago

  // Crear el objeto de preferencia de pago
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

  // Crear la preferencia de pago en Mercado Pago
  mercadopago.preferences.create(preference)
    .then(response => {
      const preferenceId = response.body.id;
      console.log("ID de preferencia:", preferenceId);

      // Aquí puedes procesar la respuesta de Mercado Pago y realizar acciones adicionales
      res.send('Pago exitoso'); // O cualquier otra respuesta que desees enviar al cliente
    })
    .catch(error => {
      res.send('Error en el pago: ' + error); // O manejar el error de otra manera
    });
});

// Ejemplo de uso
app.listen(8080, () => {
  console.log('Servidor escuchando en el puerto 8080');
});
