use proyecto;

insert into categoria(nombre) values ( 'Medicina' ),('Carpinteria' )
, ('Cocina' );


insert into proveedor( nombres, apellidos, email, username, password,categoria_codcategoria)
values ('Pedro Pablo' , 'Ramirez Ochoa' , 'pedro@gmail.com' , 'pepa',
'mi passa',  2), ('Paola Andrea' , 'Fernandez Juarez' , 'pao@gmail.com' , 'paoa',
'mi passa' ,3);


insert into horario( proveedor_codproveedor, fecha, hora_inicio, hora_fin) 
values ( 2, '2019/09/18', '09:00' , '11:00');


