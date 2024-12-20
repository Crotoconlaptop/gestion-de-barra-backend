const Producto86 = require("../models/Producto86");

// Obtener productos faltantes con paginación
exports.obtenerProductos86 = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Valores predeterminados: página 1, límite 10

    // Convertir los valores de consulta a números
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Validar los valores de la consulta
    if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber <= 0 || limitNumber <= 0) {
      return res.status(400).json({ error: "Invalid page or limit value." });
    }

    const productos = await Producto86.find()
      .skip((pageNumber - 1) * limitNumber) // Saltar productos para la página actual
      .limit(limitNumber); // Limitar la cantidad de productos devueltos

    const totalProductos = await Producto86.countDocuments(); // Total de productos

    res.json({
      total: totalProductos,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(totalProductos / limitNumber),
      productos,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos faltantes." });
  }
};

// Crear un nuevo producto faltante
exports.crearProducto86 = async (req, res) => {
  try {
    const nuevoProducto = new Producto86(req.body);
    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el producto faltante." });
  }
};

// Actualizar un producto faltante
exports.actualizarProducto86 = async (req, res) => {
  try {
    const { id } = req.params;
    const productoActualizado = await Producto86.findByIdAndUpdate(id, req.body, { new: true });

    if (!productoActualizado)
      return res.status(404).json({ error: "Producto no encontrado." });

    res.json(productoActualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el producto faltante." });
  }
};

// Eliminar un producto faltante
exports.eliminarProducto86 = async (req, res) => {
  try {
    const { id } = req.params;
    const productoEliminado = await Producto86.findByIdAndDelete(id);

    if (!productoEliminado)
      return res.status(404).json({ error: "Producto no encontrado." });

    res.json({ message: "Producto eliminado correctamente." });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el producto faltante." });
  }
};
