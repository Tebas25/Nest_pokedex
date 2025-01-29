<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en dessarrollo
1. Ejecutar el repositorio

2. Ejecutar
```
yarn install 
```

3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```

4. Levantar la base de datps
```
docker-composer up -d
``` 

5. Clonar el archivo __.env.templat__ y renombrara la copia a __.env__

6. Llenar las variables de entorno definidas en el __.env__

7. Ejecutar la aplicación en dev
```
yarn star:dev
```

8. Recargar la base de datos con la semilla
```
http://localhost:3000/api/v2/seed
```


## Stack Usado
* MongoDB
* Nest