# 🏥 CRUDFarmacia

Aplicación web construida con Next.js para la gestión de medicamentos y categorías en una farmacia. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre medicamentos y sus respectivas categorías, utilizando una base de datos gestionada con Prisma y desplegada en Vercel.

## 🚀 Tecnologías utilizadas

- [Next.js 15](https://nextjs.org/) – Framework React para aplicaciones web.
- [Prisma ORM](https://www.prisma.io/) – ORM moderno para acceso a bases de datos.
- [SQLite/PostgreSQL](https://www.prisma.io/docs/concepts/database-connectors) – Base de datos (local o remota).
- [TailwindCSS](https://tailwindcss.com/) – Utilidad para estilos rápidos (si se utiliza).
- [Vercel](https://vercel.com/) – Plataforma de despliegue.

## 📸 Funcionalidades

- CRUD de **Medicamentos**
  - Nombre, descripción, stock, precio, etc.
  - Relación con **Categoría**.
- CRUD de **Categorías**
  - Nombre y descripción.
- Uso de Prisma para manejo de la base de datos.
- Endpoints listos para consumir desde Postman o interfaces frontend.

## ⚙️ Instalación y uso local

1. Clona el repositorio:
```bash
git clone https://github.com/ErickGC546/CRUDFarmacia.git
cd CRUDFarmacia
```
2. Instala dependencias:
```bash
npm install
```
3. Crea y configura la base de datos:
```bash
npx prisma migrate dev --name init
npx prisma generate
```
4. Inicia el servidor:
```bash
npm run dev
```
Abre http://localhost:3000 en tu navegador para ver la app.

Desplegado en Vercel: https://crud-farmacia.vercel.app/
