# Instalación del Proyecto

## Instalación de las dependencias del Proyecto (NVM, Node y NPM)

Para instalar las dependencias necesarias del proyecto se deben realizar los siguientes pasos:

1. Desinstalar alguna versión existente de nvm:
  ```
  $ sudo rm -rf $NVM_DIR ~/.npm
  ```

1. Salir de la terminal:

> **CTRL** + **d** , **CTRL** + **c** o **exit**

1. Descargar el instalador de nvm y renombrarlo con "install_nvm.sh":
```
$ curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.24.0/install.sh -o install_nvm.sh
```

1. Verifica su existencia si el archivo se descargó satisfactoriamente:
```
$ nano install_nvm.sh
```

1. Ejecuta el instalador
```
$ bash install_nvm.sh
```

1. Reiniciar la consola para que surtan efecto los cambios
> **CTRL** + **d** , **CTRL** + **c** o **exit**

1. Verificar la existencia de nvm
```
$ nvm --version
```

1. Descargar la versión de node deseada **(la versión LTS)**:
```
$ nvm install 6.10.1
```

`**NOTA**`
1. Es posible que posteriormente se tenga el siguiente problema al tratar de levantar la aplicación:
```
/usr/bin/env: node: No such file or directory
```

**`Sólo si se tuviera dicho problema, ejecutar lo siguiente:`**
```sh
$  which node # Devolverá por ejemplo:
/home/usuario/.nvm/versions/node/v6.10.1/bin/node
 $ sudo ln -s "$(which node)" /usr/bin/node
```

NOTA: De acuerdo a la distribución/versión del sistema operativo el comando which puede variar de `which node` a `which nodejs`.

#### Indicar que version usaremos

1. Para ello usaremos la siguiente linea de comando
```
$ nvm use 6.10
```

1. Se debe establecer el **ambiente** (development, test), para esto, editar el archivo */etc/environment* agregándole la siguiente línea:
  ```
  NODE_ENV=development
  ```
**Importante**: Luego de aplicar los cambios, es necesario volver a loguear.  

1. Instalar las dependencias de node:
  ```
  $ npm install
  ```

## Preparación de la base de datos

Para preparación de la base de datos se debe seguir el INSTALL del proyecto dirnoplu-sisnodi-backend, el cual se encuentra en la siguiente dirección: [Install back-end](https://gitlab.geo.gob.bo/agetic/dirnoplu-sisnodi-backend/blob/SISNODI_v0.3.0/INSTALL.md).

Nota.- lo mas importante es contar con la base de datos vacía y ejecutar el script *npm run setup*.

## Opciones adicionales (Para desarrollo)
  Las opciones de ejecución son las siguientes:
  - **npm start** inicia el sitio en el puerto configurado
  - **npm test**  ejecuta las pruebas unitarias de la aplicación (No es necesario que el servidor este levantado)
  - **npm run lint**  ejecuta el eslint para verificar el estandar de programación, actualmente esta basado en: https://github.com/airbnb/javascript
  - **npm run apidoc**  genera la documentación de la API
  - **npm run notarios -número de notarios- -cantidad de claves a generar para el notarios-** genera "n" notarios para realizar pruebas.
  
   Ejemplo *npm run notarios 1000 100*


## Ver la documentación de la API
La documentación, que se puede ver online y offline, se genera con **npm run apidoc** y se encuentra en:
```url
[ruta-del-proyecto]/public/apidoc/index.html
```
