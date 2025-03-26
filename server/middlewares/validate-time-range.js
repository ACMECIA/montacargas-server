const validateTimeRange = (req, res, next) => {
  const { startTime, endTime } = req.query;

  // Validar que ambos parámetros existan
  if (!startTime || !endTime) {
    return res
      .status(400)
      .json({ message: "Faltan parámetros startTime o endTime" });
  }

  // Convertir a objetos Date
  const start = new Date(startTime);
  const end = new Date(endTime);

  // Validar que sean fechas válidas
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return res
      .status(400)
      .json({ message: "startTime o endTime no son fechas válidas" });
  }

  // Validar que startTime sea menor que endTime
  if (start >= end) {
    return res
      .status(400)
      .json({ message: "startTime debe ser menor que endTime" });
  }

  next(); // Continúa con el siguiente middleware o controlador
};

export default validateTimeRange;

// module.exports = validateTimeRange;
