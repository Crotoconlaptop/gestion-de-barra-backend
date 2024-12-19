require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Inicializar la app de Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: "10mb" })); // Aumenta el límite del JSON a 10 MB
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // También para datos codificados en URL
app.use(cors({
  origin: ["https://gestion-de-barra-frontend.vercel.app"], // Reemplaza con la URL de tu frontend
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true,
}));

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
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Iniciar el servidor
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
