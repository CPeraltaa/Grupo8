 drop database proyecto;
 CREATE database proyecto;
 use  proyecto;

CREATE TABLE categoria (
    codcategoria   INTEGER NOT NULL AUTO_INCREMENT,
    nombre         VARCHAR(100) NOT NULL,
    descripcion    VARCHAR(200),

    PRIMARY KEY ( codcategoria )
);


CREATE TABLE cita (
    cliente_codcliente   INTEGER NOT NULL,
    horario_codhorario   INTEGER NOT NULL
);

CREATE TABLE cliente (
    codcliente   INTEGER NOT NULL AUTO_INCREMENT,
    nombres       VARCHAR(200) NOT NULL,
    apellidos     VARCHAR(200) NOT NULL,
    email		VARCHAR(300) NOT NULL,
    username     VARCHAR(100) NOT NULL,
    password   VARCHAR(50) NOT NULL,
    PRIMARY KEY ( codcliente )
);


CREATE TABLE horario (
    codhorario               INTEGER NOT NULL AUTO_INCREMENT,
    proveedor_codproveedor   INTEGER NOT NULL,
    fecha                    DATE NOT NULL,
    hora_inicio              TIME NOT NULL,
    hora_fin                 TIME NOT NULL,
    PRIMARY KEY ( codhorario )
);

CREATE TABLE proveedor (
    codproveedor             INTEGER NOT NULL AUTO_INCREMENT ,
    nombres                   VARCHAR(100) NOT NULL,
    apellidos    			 VARCHAR(200) NOT NULL,
    email					VARCHAR(300) NOT NULL,
    password               VARCHAR(50) NOT NULL,
    username     			VARCHAR(100) NOT NULL,
    categoria_codcategoria   INTEGER NOT NULL,
    PRIMARY KEY ( codproveedor )
);

CREATE TABLE solicitud (
    cliente_codcliente   INTEGER NOT NULL,
    proveedor_codproveedor   INTEGER NOT NULL,
    accepted BIT NOT NULL
);


ALTER TABLE cita
    ADD CONSTRAINT cita_cliente_fk FOREIGN KEY ( cliente_codcliente )
        REFERENCES cliente ( codcliente );

ALTER TABLE cita
    ADD CONSTRAINT cita_horario_fk FOREIGN KEY ( horario_codhorario )
        REFERENCES horario ( codhorario );

ALTER TABLE horario
    ADD CONSTRAINT horario_proveedor_fk FOREIGN KEY ( proveedor_codproveedor )
        REFERENCES proveedor ( codproveedor );

ALTER TABLE proveedor
    ADD CONSTRAINT proveedor_categoria_fk FOREIGN KEY ( categoria_codcategoria )
        REFERENCES categoria ( codcategoria );

ALTER TABLE solicitud
    ADD CONSTRAINT solicitud_cliente_fk FOREIGN KEY ( cliente_codcliente )
        REFERENCES cliente ( codcliente );

ALTER TABLE solicitud
    ADD CONSTRAINT solicitud_horario_fk FOREIGN KEY ( proveedor_codproveedor)
        REFERENCES proveedor ( codproveedor );


delimiter $$
CREATE PROCEDURE agregarCliente (IN Nombres VARCHAR(200),
Apellidos VARCHAR(200),
Email	VARCHAR(300) ,
Username VARCHAR(100) ,
Password VARCHAR(50)
)
BEGIN
	IF NOT EXISTS (SELECT * FROM cliente WHERE email = Email)
	THEN 
		   INSERT INTO cliente
		   VALUES (Nombres,Apellidos,Email,Username,Password);

	ELSE
		   UPDATE cliente SET
		   nombres =  Nombres, 
		   apellidos =  Apellidos, 
		   username = Username 
		   WHERE email = Email;
	END IF;
END
$$

delimiter $$
CREATE PROCEDURE agregarProveedor (IN Nombres VARCHAR(200),
Apellidos VARCHAR(200),
Email	VARCHAR(300) ,
Username VARCHAR(100) ,
Password VARCHAR(50),
Categoria INTEGER
)
BEGIN
	IF NOT EXISTS (SELECT * FROM proveedor WHERE email = Email)
	THEN
		   INSERT INTO proveedor
		   VALUES (Nombres,Apellidos,Email,Username,Password,Categoria);
	ELSE
		   UPDATE proveedor SET
		   nombres =  Nombres ,
		   apellidos =  Apellidos ,
		   username = Username   
		   WHERE email = Email;
	END IF;
END
$$