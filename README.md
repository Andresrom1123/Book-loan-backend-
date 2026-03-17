# Book Loan — Backend

API REST para la gestión del préstamo de libros. Construida con **Node.js**, **TypeScript** y **Express 5**.

## Requisitos

- Node.js 22+
- Yarn

## Instalación

```bash
yarn install
```

## Configuración

El servidor se configura mediante un archivo `config.json` en la raíz del proyecto:

```json
{
  "host": "127.0.0.1",
  "port": 8000
}
```

| Campo  | Tipo     | Default       | Descripción               |
|--------|----------|---------------|---------------------------|
| `host` | `string` | `"127.0.0.1"` | Host en el que escucha    |
| `port` | `number` | `8000`        | Puerto en el que escucha  |

## Comandos

| Comando        | Descripción                                                        |
|----------------|--------------------------------------------------------------------|
| `yarn start`   | Levanta el servidor en modo desarrollo con recarga automática      |
| `yarn build`   | Compila TypeScript a JavaScript en `dist/`                         |
| `yarn dev`     | Compila y ejecuta el build de producción                           |
| `yarn test`    | Ejecuta los tests con Mocha                                        |
| `yarn lint`    | Analiza el código con ESLint                                       |

## Levantar en desarrollo

```bash
yarn start
```

El servidor queda escuchando en `http://127.0.0.1:8000` (o según `config.json`). Nodemon reinicia automáticamente al detectar cambios en archivos `.ts` o `.yml`.

## Levantar en producción

```bash
yarn build
yarn dev
```

## Stack

- **Runtime**: Node.js 22
- **Lenguaje**: TypeScript 5 (ESM)
- **Framework**: Express 5
- **Logger HTTP**: Morgan
- **Testing**: Mocha + Chai + Sinon + Supertest
- **Linter**: ESLint 10 + typescript-eslint
- **Dev runner**: tsx + Nodemon
