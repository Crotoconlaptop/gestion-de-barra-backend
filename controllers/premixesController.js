const Premix = require("../models/Premix");

// Obtener todos los premixes con paginación
exports.obtenerPremixes = async (req, res) => {
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

    const [premixes, total] = await Promise.all([
      Premix.find().skip(skip).limit(limitNumber),
      Premix.countDocuments(),
    ]);

    res.status(200).json({
      premixes,
      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber),
      },
    });
  } catch (error) {
    console.error("Error al obtener los premixes:", error.message);
    res.status(500).json({ error: "Error al obtener los premixes." });
  }
};

// Crear un nuevo premix
exports.crearPremix = async (req, res) => {
  try {
    const { nombre, descripcion, imagen, ingredientes, preparacion, pendiente } = req.body;

    if (!nombre || !descripcion || !imagen || !ingredientes || !preparacion) {
      return res.status(400).json({ error: "Todos los campos son obligatorios." });
    }

    if (!Array.isArray(ingredientes)) {
      return res.status(400).json({ error: "Los ingredientes deben ser un arreglo válido." });
    }

    const nuevoPremix = new Premix({
      nombre,
      descripcion,
      imagen,
      ingredientes,
      preparacion,
      pendiente: false,
    });

    await nuevoPremix.save();
    res.status(201).json(nuevoPremix);
  } catch (error) {
    console.error("Error al crear el premix:", error.message);
    res.status(500).json({ error: "Error al crear el premix." });
  }
};

// Cambiar el estado de un premix (pendiente o listo)
exports.cambiarEstadoPremix = async (req, res) => {
  try {
    const { id } = req.params;
    const { pendiente } = req.body;

    // Buscar el premix por ID
    const premix = await Premix.findById(id);
    if (!premix) {
      return res.status(404).json({ error: "Premix no encontrado." });
    }

    // Actualizar el estado
    premix.pendiente = pendiente;
    await premix.save();

    res.status(200).json(premix);
  } catch (error) {
    console.error("Error al cambiar el estado del premix:", error.message);
    res.status(500).json({ error: "Error al cambiar el estado del premix." });
  }
};

// Eliminar un premix
exports.eliminarPremix = async (req, res) => {
  try {
    const { id } = req.params;
    const premixEliminado = await Premix.findByIdAndDelete(id);

    if (!premixEliminado) {
      return res.status(404).json({ error: "Premix no encontrado." });
    }

    res.json({ message: "Premix eliminado correctamente." });
  } catch (error) {
    console.error("Error al eliminar el premix:", error.message);
    res.status(500).json({ error: "Error al eliminar el premix." });
  }
};
