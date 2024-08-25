CREATE TABLE `Diagnosticos` (
  `ID` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `Fecha` DATE,
  `Tipo` ENUM ('Sindromico', 'Presuntivo', 'Diferencial'),
  `Descripcion` VARCHAR(500)
);

CREATE TABLE `ExamenesSegmentarios` (
  `ID` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `Craneo` VARCHAR(500),
  `Ojos` VARCHAR(500),
  `Tiroides` VARCHAR(500),
  `Oidos` VARCHAR(500),
  `Nariz` VARCHAR(500),
  `Boca` VARCHAR(500)
);

CREATE TABLE `Pulsos` (
  `ID` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `Carotideo` BOOLEAN,
  `Humeral` BOOLEAN,
  `Radial` BOOLEAN,
  `Femoral` BOOLEAN,
  `Popliteo` BOOLEAN,
  `TibialPosterior` BOOLEAN,
  `Pedio` BOOLEAN
);

CREATE TABLE `AparatosCardiovasculares` (
  `ID` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `Inspeccion` VARCHAR(500),
  `Palpacion` VARCHAR(500),
  `Percusion` VARCHAR(500),
  `Auscultacion` VARCHAR(500),
  `Pulso` BIGINT,
  FOREIGN KEY (`Pulso`) REFERENCES `Pulsos` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Abdomenes` (
  `ID` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `Inspeccion` VARCHAR(500),
  `Palpacion` VARCHAR(500),
  `Percusion` VARCHAR(500),
  `Auscultacion` VARCHAR(500)
);

CREATE TABLE `InspeccionesGenerales` (
  `ID` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `Estado_conciencia` VARCHAR(500),
  `Actitud` VARCHAR(500),
  `Decubito` VARCHAR(500),
  `Marcha` VARCHAR(500),
  `Facies` VARCHAR(500)
);

CREATE TABLE `ControlesSignosVitales` (
  `ID` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `FcLatMin` VARCHAR(500),
  `Peso` FLOAT,
  `Altura` FLOAT,
  `IMC` FLOAT
);

CREATE TABLE `TejidosCelularesSubcutaneos` (
  `ID` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `Cantidad` VARCHAR(500),
  `Distribucion` VARCHAR(500),
  `Varices` VARCHAR(500),
  `Circulacion_Lateral` VARCHAR(500),
  `Edema` VARCHAR(500)
);


CREATE TABLE `Fenereas` (
  `ID` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `Pelo` VARCHAR(500),
  `Unias` VARCHAR(500)
);

CREATE TABLE `Pieles` (
  `ID` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `Color` VARCHAR(500),
  `Humedad` VARCHAR(500),
  `Turgor` VARCHAR(500),
  `Temperatura` VARCHAR(500),
  `Lesiones` VARCHAR(500),
  `Elasticidad` VARCHAR(500)
);

CREATE TABLE `PuniosDePercusiones` (
  `ID` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `Lado` VARCHAR(500),
  `Nivel` VARCHAR(500),
  `Caracter` VARCHAR(500)
);

CREATE TABLE `AparatosGenitourinarios` (
  `ID` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `PuntosRenoUretrales` VARCHAR(500),
  `PuntosDolorosos` VARCHAR(500),
  `RitmoDiuretico` VARCHAR(500),
  `TactoVaginal` VARCHAR(500),
  `TactoRectal` VARCHAR(500),
  `PunioDePercusion` BIGINT,
  FOREIGN KEY (`PunioDePercusion`) REFERENCES `PuniosDePercusiones` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `AparatosRespiratorios` (
  `ID` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `Inspeccion` VARCHAR(500),
  `Palpacion` VARCHAR(500),
  `Percusion` VARCHAR(500),
  `Auscultacion` VARCHAR(500)
);

CREATE TABLE `Epidemiologicos` (
  `ID` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `Chagas` VARCHAR(500),
  `Brucelosis` VARCHAR(500),
  `Toxoplasmosis` VARCHAR(500),
  `Enteroparasitosis` VARCHAR(500),
  `Hidatidosis` VARCHAR(500),
  `Transfucionales` VARCHAR(500),
  `VIH` BOOLEAN,
  `Otros` VARCHAR(500)
);

CREATE TABLE `SistemasNerviosos` (
  `ID` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `EstadoConciencia` VARCHAR(500),
  `Orientacion` VARCHAR(500),
  `Atencion` VARCHAR(500),
  `Memoria` VARCHAR(500),
  `Lenguaje` VARCHAR(500),
  `ParesCraneales` VARCHAR(500),
  `FuerzaMuscular` VARCHAR(500),
  `TonoMuscular` VARCHAR(500),
  `ReflejosOsteotendinosos` VARCHAR(500),
  `Marcha` VARCHAR(500),
  `Equilibrio` VARCHAR(500)
);

CREATE TABLE `Patologicos` (
  `ID` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `Infancia` VARCHAR(500),
  `Adulto` VARCHAR(500),
  `InfecciónDeTransmisiónSexual` VARCHAR(500),
  `Diabetes` VARCHAR(500),
  `HipertensionArterial` VARCHAR(500),
  `Otros` VARCHAR(500)
);

CREATE TABLE `Familiares` (
  `ID` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `Padre` VARCHAR(100),
  `Madre` VARCHAR(100),
  `Hermanos` VARCHAR(100),
  `Hijos` VARCHAR(100),
  `Otros` VARCHAR(100)
);

CREATE TABLE `Fisiologicos` (
  `ID` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `Quirurgicos` VARCHAR(500),
  `Dentición` VARCHAR(100),
  `Locuela` VARCHAR(100),
  `Deambulación` VARCHAR(500),
  `Alimentación` VARCHAR(500),
  `Dipsia` VARCHAR(500),
  `Diuresis` VARCHAR(500),
  `Catarsis` VARCHAR(500),
  `Somnia` VARCHAR(500),
  `ActividadFisica` VARCHAR(500),
  `Otros` VARCHAR(500)
);

CREATE TABLE `HabitosToxicos` (
  `ID` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `Alcohol` BOOLEAN,
  `Tabaco` BOOLEAN,
  `Drogas` BOOLEAN,
  `Infunciones` BOOLEAN
);

CREATE TABLE `AntecedentesPersonales` (
  `ID` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `Patologico` BIGINT,
  `Familiar` BIGINT,
  `Fisiologico` BIGINT,
  `HabitoToxico` BIGINT,
  FOREIGN KEY (`Patologico`) REFERENCES `Patologicos` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`Familiar`) REFERENCES `Familiares` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`Fisiologico`) REFERENCES `Fisiologicos` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`HabitoToxico`) REFERENCES `HabitosToxicos` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `GinecosObstetricos` (
  `ID` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `Menarquia` DATE,
  `RitmoMenstrual` VARCHAR(500),
  `DuracionMenstrual` VARCHAR(500),
  `Dismenorrea` VARCHAR(500),
  `FechaUltimaMenstruacion` DATE,
  `Gestaciones` INT,
  `Partos` INT,
  `Abortos` INT,
  `Cesareas` INT
);

CREATE TABLE `FactoresAmbientales` (
  `ID` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `Habitat` VARCHAR(500),
  `Higiene` VARCHAR(500),
  `Alimentacion` VARCHAR(500),
  `Agua` VARCHAR(500),
  `Saneamiento` VARCHAR(500)
);

CREATE TABLE `ExamenesFisicos` (
  `ID` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `InspeccionGeneral` BIGINT,
  `SignosVitales` BIGINT,
  `Fenerea` BIGINT,
  `TejidoCelularSubcutaneo` BIGINT,
  `Piel` BIGINT,
  FOREIGN KEY (`InspeccionGeneral`) REFERENCES `InspeccionesGenerales` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`SignosVitales`) REFERENCES `ControlesSignosVitales` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`Fenerea`) REFERENCES `Fenereas` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`TejidoCelularSubcutaneo`) REFERENCES `TejidosCelularesSubcutaneos` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`Piel`) REFERENCES `Pieles` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `HistorialesClinicos` (
  `ID` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `Anamnesis` VARCHAR(500),
  `Motivo` VARCHAR(500),
  `Descripcion` VARCHAR(500),
  `Diagnostico` BIGINT,
  `EstudiosComplementarios` VARCHAR(500),
  `PlanTerapeutico` VARCHAR(500),
  `Profesional` BIGINT,
  `ExamenesSegmentarios` BIGINT,
  `Abdomenes` BIGINT,
  `AparatoRespiratorio` BIGINT,
  `AparatosCardiovasculares` BIGINT,
  `AparatoGenitourinario` BIGINT,
  `Epidemiologico` BIGINT,
  `ExamenFisico` BIGINT,
  `SistemaNervioso` BIGINT,
  `AntecedentePersonal` BIGINT,
  `GinecoObstetrico` BIGINT,
  `FactorAmbiental` BIGINT,
  FOREIGN KEY (`Diagnostico`) REFERENCES `Diagnosticos` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`Profesional`) REFERENCES `Profesionales` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`ExamenesSegmentarios`) REFERENCES `ExamenesSegmentarios` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`Abdomenes`) REFERENCES `Abdomenes` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`AparatoRespiratorio`) REFERENCES `AparatosRespiratorios` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`AparatosCardiovasculares`) REFERENCES `AparatosCardiovasculares` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`AparatoGenitourinario`) REFERENCES `AparatosGenitourinarios` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`Epidemiologico`) REFERENCES `Epidemiologicos` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`ExamenFisico`) REFERENCES `ExamenesFisicos` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`SistemaNervioso`) REFERENCES `SistemasNerviosos` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`AntecedentePersonal`) REFERENCES `AntecedentesPersonales` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`GinecoObstetrico`) REFERENCES `GinecosObstetricos` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`FactorAmbiental`) REFERENCES `FactoresAmbientales` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
);