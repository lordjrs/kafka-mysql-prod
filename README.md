# kafka-mysql-prod

Definir variables de entorno ubicadas en:

```yml
./docker-compose.yml 
data/node/producer/.env
data/node/consumer/.env
data/node/consumer/config/default.json
```


Luego, inicializar con:

```console
$ docker-compose up -d
```

Si el contenedor del broker se cierra, eliminar la sgte. carpeta:
```yml
data/kafka-data1/logs
```

Debería ser necesario añadir un ```npm install``` al ```package.json``` de cada imagen de node.
Además, cambiar la variable ```ADVERTISED_LISTENERS``` de ```./docker-compose-yml``` con la IP interna del host.
