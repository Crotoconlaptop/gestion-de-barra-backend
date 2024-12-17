const Trago = require("../models/Trago");

exports.obtenerTragos = async (req, res) => {
  try {
    const tragos = await Trago.find();
    res.status(200).json(tragos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los tragos." });
  }
};

exports.crearTrago = async (req, res) => {
  try {
    console.log("Datos recibidos en el backend:", req.body);

    const { nombre, ingredientes, imagen, preparacion } = req.body;

    if (!nombre || !ingredientes || !imagen || !preparacion) {
      return res.status(400).json({ error: "Todos los campos son obligatorios." });
    }

    // Validar que ingredientes sea un arreglo
    if (!Array.isArray(ingredientes)) {
      return res.status(400).json({ error: "Los ingredientes deben ser un arreglo." });
    }

    const nuevoTrago = new Trago({ nombre, ingredientes, imagen, preparacion });
    await nuevoTrago.save();

    res.status(201).json(nuevoTrago);
  } catch (error) {
    console.error("Error al crear el trago:", error.message);
    res.status(500).json({ error: "Error interno del servidor al crear el trago." });
  }
};



exports.eliminarTrago = async (req, res) => {
  try {
    const { id } = req.params;
    const tragoEliminado = await Trago.findByIdAndDelete(id);

    if (!tragoEliminado) {
      return res.status(404).json({ error: "Trago no encontrado." });
    }

    res.json({ message: "Trago eliminado correctamente." });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el trago." });
  }
};
