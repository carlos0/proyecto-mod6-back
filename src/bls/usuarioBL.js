const guardaUsuario = async (data) => {
  const datos = {
    usuario: data.usuario,
  };
  console.log(datos);
};

module.exports = {
  guardaUsuario,
};
