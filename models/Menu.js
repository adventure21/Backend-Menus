const mongoose = require("mongoose");

// Definir el esquema
const menuSchema = new mongoose.Schema({
  nombre: String,
  platos: [String],
  descripcion: String,
  precio: Number,
});

const MenuModel = mongoose.model("Menu", menuSchema, "menus");

module.exports = MenuModel;
