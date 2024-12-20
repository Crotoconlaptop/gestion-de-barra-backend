const Trago = require("../models/Trago");

// Obtener todos los tragos con paginación
exports.obtenerTragos = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    // Validar que los parámetros de paginación sean números positivos
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    if (isNaN(pageNumber) || pageNumber <= 0 || isNaN(limitNumber) || limitNumber <= 0) {
      return res.status(400).json({ error: "Parámetros de paginación inválidos." });
    }

    // Calcular el número de documentos a omitir y obtener los datos
    const skip = (pageNumber - 1) * limitNumber;
    const [tragos, total] = await Promise.all([
      Trago.find().skip(skip).limit(limitNumber),
      Trago.countDocuments(),
    ]);

    res.status(200).json({
      tragos,
      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber),
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los tragos." });
  }
};

// Crear un nuevo trago
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

// Eliminar un trago
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
