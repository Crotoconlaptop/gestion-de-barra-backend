require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

// Validación de variables de entorno
if (!process.env.MONGO_URI) {
  console.error("Error: MONGO_URI no está definido en las variables de entorno.");
  process.exit(1);
}

if (!process.env.PORT) {
  console.warn("Advertencia: PORT no está definido. Usando el puerto predeterminado 5000.");
}

// Inicializar la app de Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(
  cors({
    origin: ["https://gestion-de-barra-frontend.vercel.app"], // Reemplaza con la URL de tu frontend
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(morgan("combined")); // Logs HTTP
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Máximo de 100 solicitudes por IP
    message: "Demasiadas solicitudes desde esta IP, por favor intenta de nuevo más tarde.",
  })
);

// Rutas
app.use("/api/pedidos", require("./routes/pedidosRoutes"));
app.use("/api/premixes", require("./routes/premixesRoutes"));
app.use("/api/tragos", require("./routes/tragosRoutes"));
app.use("/api/productos86", require("./routes/productos86Routes"));

// Ruta base para verificar el estado del servidor
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => {
    console.error("Error al conectar a MongoDB:", err);
    process.exit(1);
  });

// Monitoreo de eventos de MongoDB
mongoose.connection.on("connected", () => {
  console.log("Conexión a MongoDB establecida.");
});

mongoose.connection.on("error", (err) => {
  console.error("Error en la conexión a MongoDB:", err);
});

mongoose.connection.on("disconnected", () => {
  console.warn("Conexión a MongoDB perdida.");
});

// Middleware para manejo de errores globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Error interno del servidor. Por favor intenta más tarde." });
});

// Iniciar el servidor
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
