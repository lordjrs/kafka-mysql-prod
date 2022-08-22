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

