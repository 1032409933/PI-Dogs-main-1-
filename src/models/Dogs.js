const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: {
          args: true,
          msg: "La imagen debe ser una URL válida.",
        },
      },
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [3, 50],
          msg: "El nombre debe tener entre 2 y 50 caracteres.",
        },
      },
    },
    altura: {
      type: DataTypes.STRING, // Cambiado a FLOAT para representar valores decimales
      allowNull: true,
      validate: {
        isFloat: {
          args: true,
          msg: "La altura debe ser un número decimal.",
        },
      },
    },
    peso: {
      type: DataTypes.STRING, // Cambiado a FLOAT para representar valores decimales
      allowNull: true,
      validate: {
        isFloat: {
          args: true,
          msg: "El peso debe ser un número decimal.",
        },
      },
    },
    añosdevida: {
      type: DataTypes.INTEGER, // Cambiado a INTEGER para representar valores enteros
      allowNull: true,
      validate: {
        isInt: {
          args: true,
          msg: "Los años de vida deben ser un número entero.",
        },
      },
    },
    created: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
  }, { timestamps: false });
}