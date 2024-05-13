const express = require("express");
const rutas = express.Router();
const MenuModel = require("../models/Menu");

// Endpoint 1: Obtener todos los menús
rutas.get("/menus", async (req, res) => {
  try {
    const menus = await MenuModel.find();
    res.json(menus);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

// Endpoint 2: Crear un nuevo menú
rutas.post("/crear", async (req, res) => {
  const menu = new MenuModel({
    nombre: req.body.nombre,
    platos: req.body.platos,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
  });

  try {
    const nuevoMenu = await menu.save();
    res.status(201).json(nuevoMenu);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

// Endpoint 3: Editar un menú
rutas.put("/editar/:id", async (req, res) => {
  try {
    const menuEditado = await MenuModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!menuEditado)
      return res.status(404).json({ mensaje: "Menú no encontrado" });
    else return res.status(201).json(menuEditado);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

// Endpoint 4: Eliminar un menú
rutas.delete("/eliminar/:id", async (req, res) => {
  try {
    const menuEliminado = await MenuModel.findByIdAndDelete(req.params.id);
    if (!menuEliminado)
      return res.status(404).json({ mensaje: "Menú no encontrado" });
    else return res.json({ mensaje: "Menú eliminado" });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

// Endpoint 5: Obtener un menú por su ID
rutas.get("/menu/:id", async (req, res) => {
  try {
    const menu = await MenuModel.findById(req.params.id);
    if (!menu) return res.status(404).json({ mensaje: "Menú no encontrado" });
    else return res.json(menu);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

// Endpoint 6: Obtener menús por un plato específico
rutas.get("/menuPorPlato/:plato", async (req, res) => {
  try {
    const plato = req.params.plato;
    const regex = new RegExp(plato, "i");
    const menusPorPlato = await MenuModel.find({
      platos: { $regex: regex, $options: "i" },
    });

    return res.json(menusPorPlato);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

// Endpoint 7: Eliminar todos los menús
rutas.delete("/eliminarTodos", async (req, res) => {
  try {
    await MenuModel.deleteMany({});
    return res.json({ mensaje: "Todos los menús han sido eliminados" });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

// Endpoint 8: Contar el número total de menús
rutas.get("/totalMenus", async (req, res) => {
  try {
    const total = await MenuModel.countDocuments();
    return res.json({ totalMenus: total });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

// Endpoint 9: Obtener menús ordenados por nombre ascendente
rutas.get("/ordenarMenus", async (req, res) => {
  try {
    const menusOrdenados = await MenuModel.find().sort({ nombre: 1 });
    res.status(200).json(menusOrdenados);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

// Endpoint 10: Obtener menús por un rango de precios
rutas.get("/menusPorPrecio/:precioMin/:precioMax", async (req, res) => {
  try {
    const menus = await MenuModel.find({
      precio: { $gte: req.params.precioMin, $lte: req.params.precioMax },
    });
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

module.exports = rutas;
