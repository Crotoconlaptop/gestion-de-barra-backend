// **productos86Controller.js**
const Producto86 = require("../models/Producto86");

// Obtener todos los productos faltantes
exports.obtenerProductos86 = async (req, res) => {
  try {
    const productos = await Producto86.find();
    res.json(productos);
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