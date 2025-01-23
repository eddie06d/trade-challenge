# Prueba Técnica Trade

## Setup de desarrollo

Primero, clonar el repositorio y movernos dentro del proyecto:

```bash
git clone https://github.com/eddie06d/trade-challenge.git
cd trade-challenge
```

### Setup local

Instalar las dependencias:

```bash
npm install
```

### Correr localmente

Abrir **sample.env** y copiar su contenido en un nuevo archivo llamado **.env**, luego establecer los valores de las variables de entorno revisando las siguientes configuraciones:

- [Bucket S3](https://docs.aws.amazon.com/es_es/AmazonS3/latest/userguide/creating-buckets-s3.html)
- [Base de datos Supabase](https://supabase.com/docs/guides/database/postgres/configuration)

Ahora iniciar el proyecto:

```bash
npm run dev
```

Una vez levantando el proyecto, ir a la siguiente ruta en el navegador:

```bash
http://localhost:3000
```
