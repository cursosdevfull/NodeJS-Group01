# Parámetros usados en tsconfig.json

## compilerOptions

- module: forma de organizar los archivos como módulos (module.exports, exports). Puede ser: commonjs, require, amd, es6, es2015, esnext

  - resolveJsonModule: permite importar archivos con extensión json

  - esModuleInterop: sirve para poder importar un módulo de un tipo desde otro módulo de otro tipo (ej. un modulo commonjs y otro es6)

  - target: es la versión de javascript a la cual serán transpilados los archivos de typescript

  - noImplicitAny: indica que los parámetros a los que no se les asigna un tipo de dato, sean automáticamente de tipo any

  - moduleResolution: 2 opciones: classic o node. Es la manera como resuelve la ubicación de un archivo

    - classic

      ```
      s

      a
      "

      :
      - /src/mifolder/mi-modulo.ts
      ```


    		Si se importa
      		- import miModulo from "mi-modulo"

    		Buscará en:
      		- /src/mifolder/mi-modulo.ts
      		- /src/mi-modulo.ts|
      		- /mi-modulo.ts


    	- node

    		Si la ruta es
    		- /src/mifolder/app.ts

    		Y se importa
    		- import miModulo from "./mi-modulo"

    		Buscará en:
    		- /src/mifolder/mi-modulo.ts
    		- /src/mifolder/mi-modulo/index.ts

    		Si se importa
    		- import miModulo from "mi-modulo"

    		Buscará en:
    		- /src/mifolder/node_modules/mi-modulo.ts
    		- /src/mifolder/node_modules/mi-modulo/index.ts
    		- /src/node_modules/mi-modulo.ts
    		- /src/node_modules/mi-modulo/index.ts
    		- /node_modules/mi-modulo.ts
    		- /node_modules/mi-modulo/index.ts

    - sourceMap: Indica si se crea un archivo map o no

    - outDir: Indica el directorio donde se guardarán los archivos transpilados a js

    - emitDecoratorMetadata y experimentalDecorators: permiten el uso de decoradores en typescript
