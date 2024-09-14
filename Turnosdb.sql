CREATE TABLE `Contacto` (
  `ID` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `Telefono` VARCHAR(20),
  `Celular` VARCHAR(20),
  `CorreoElectronico` VARCHAR(100)
);


CREATE TABLE `Profesionales` (
  `ID` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `Apellido` VARCHAR(100),
  `Nombre` VARCHAR(100),
  `CodigoIdentidad` VARCHAR(16),
  `Profesion` VARCHAR(100),
  `ContactoID` BIGINT,
  FOREIGN KEY (`ContactoID`) REFERENCES `Contacto` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `ObrasSociales` (
  `ID` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `Nombre` VARCHAR(40),
  `Codigo` VARCHAR(50)
);


CREATE TABLE `Paises` (
  `ID` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `NombrePais` VARCHAR(30)
);

CREATE TABLE `Provincias` (
  `ID` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `NombreProvincia` VARCHAR(50),
  `Pais` BIGINT,
  `CodigoProvincia` VARCHAR(20),
  FOREIGN KEY (`Pais`) REFERENCES `Paises` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Localidades` (
  `ID` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `Provincia` BIGINT,
  `NombreLocalidad` VARCHAR(40),
  `CodigoPostal` VARCHAR(20),
  FOREIGN KEY (`Provincia`) REFERENCES `Provincias` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE `Domicilios` (
  `ID` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `Calle` VARCHAR(60),
  `Nro` MEDIUMINT,
  `Detalle` VARCHAR(200),
  `Localidad` BIGINT,
  FOREIGN KEY (`Localidad`) REFERENCES `Localidades` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Pacientes` (
  `ID` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `Nombre` VARCHAR(500),
  `Apellido` VARCHAR(500),
  `Edad` TINYINT,
  `CodigoIdentidad` VARCHAR(16),
  `Nacionalidad` VARCHAR(18),
  `Sexo` BOOLEAN,
  `Ocupacion` VARCHAR(60),
  `EstadoCivil` ENUM ('Soltero/a', 'Casado/a', 'Divorciado/a', 'Viudo/a', 'Unido/a en Pareja de Hecho', 'Separado/a', 'En una Relacion de Pareja (No Formalizada)'),
  `Escolaridad` ENUM ('Sin Estudios', 'Primaria Incompleta', 'Primaria Completa', 'Secundaria Incompleta', 'Secundaria Completa', 'Terciario/Universitario Incompleto', 'Terciario/Universitario Completo'),
  `ServicioMilitar` BOOLEAN,
  `FechaNacimiento` DATETIME,
  `ResidenciaHabitual` BIGINT,
  `ResidenciaActual` BIGINT,
  `HistorialClinico` BIGINT,
  `FechaInternacion` DATE,
  /*FOREIGN KEY (`HistorialClinico`) REFERENCES `HistorialesClinicos` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,*/
  FOREIGN KEY (`ResidenciaHabitual`) REFERENCES `Domicilios` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`ResidenciaActual`) REFERENCES `Domicilios` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `ObrasSocialesXPacientes` (
  `ID` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `ObraSocial` BIGINT,
  `Paciente` BIGINT,
  FOREIGN KEY (`ObraSocial`) REFERENCES `ObrasSociales` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`Paciente`) REFERENCES `Pacientes` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Turnos` (
  `TimeStamp` BIGINT PRIMARY KEY,
  `Paciente` BIGINT,
  `Profesional` BIGINT,
  `Asistencia` BOOLEAN,
  FOREIGN KEY (`Paciente`) REFERENCES `Pacientes` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`Profesional`) REFERENCES `Profesionales` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
);
