require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Inicializar la app de Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Soporte para JSON
app.use(cors()); // Soporte para solicitudes CORS

// Rutas
app.use("/api/pedidos", require("./routes/pedidosRoutes"));
app.use("/api/premixes", require("./routes/premixesRoutes"));
app.use("/api/tragos", require("./routes/tragosRoutes"));
app.use("/api/productos86", require("./routes/productos86Routes"));

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

// Iniciar el servidor
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));