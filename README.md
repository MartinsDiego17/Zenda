# 🧠 AppTurnos

Aplicación web de gestión de turnos para un profesional de la salud mental y sus pacientes. Permite reservar, confirmar y administrar sesiones de manera simple, organizada y sin fricción.

> **Estado:** En desarrollo activo — MVP

---

## 📸 Demo

<!-- Reemplazá con un screenshot o GIF de la app -->
![Demo placeholder](./docs/demo.png)

---

## ✨ Funcionalidades principales

- Los pacientes pueden registrarse, ver la disponibilidad del profesional y reservar turnos
- Confirmación de turno mediante el pago de una seña (integración con Mercado Pago)
- Panel de administración para que el profesional gestione su agenda, horarios y reservas
- Soporte para sesiones presenciales y virtuales
- Notificaciones de estado de turno (confirmado, cancelado, reprogramado)
- Interfaz responsive, funciona en mobile y desktop

---

## 🛠️ Tech Stack

| Capa | Tecnologías |
|------|-------------|
| Frontend | Next.js, TypeScript, Tailwind CSS, Shadcn UI, Zustand, Zod |
| Backend | Node.js, NestJS, arquitectura MVC, Zod |
| Base de datos | PostgreSQL + Prisma ORM |
| Autenticación | Supabase Auth, RBAC |
| Pagos | Mercado Pago |
| Deploy | Railway |
| DevOps | Git + GitHub, monorepo, ESLint, tests unitarios |

---

## 🚀 Instalación y uso local

### Prerrequisitos

- Node.js >= 18
- PostgreSQL
- Cuenta de Supabase
- Credenciales de Mercado Pago (para pagos)

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/app-turnos.git
cd app-turnos

# 2. Instalar dependencias (monorepo)
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Completar los valores en .env

# 4. Correr migraciones de base de datos
npx prisma migrate dev

# 5. Iniciar el proyecto en desarrollo
npm run dev
```

La app estará disponible en `http://localhost:3000`.

---

## ⚙️ Variables de entorno

Crear un archivo `.env` en la raíz basándose en `.env.example`:

```env
# Base de datos
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/turnos

# Supabase
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=tu-clave-anonima
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key

# Mercado Pago
MP_ACCESS_TOKEN=tu-access-token
MP_PUBLIC_KEY=tu-public-key

# App
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## 👥 Roles del sistema

| Rol | Descripción |
|-----|-------------|
| **Visitante** | Puede ver la landing, registrarse e iniciar sesión |
| **Paciente** | Puede reservar turnos, pagar la seña y gestionar sus reservas |
| **Administrador** | El profesional. Gestiona agenda, horarios, reservas y pacientes |

> El sistema está diseñado para un único profesional. No hay soporte para múltiples administradores en esta versión.

---

## 📁 Estructura del proyecto

```
/
├── apps/
│   ├── web/          # Frontend en Next.js
│   └── api/          # Backend en NestJS
├── packages/
│   └── shared/       # Tipos y utilidades compartidas
├── prisma/
│   └── schema.prisma # Esquema de base de datos
└── .env.example
```

---

## 🗄️ Base de datos

El esquema completo está disponible en:
👉 [Ver diagrama en dbdiagram.io](https://dbdiagram.io/d/...)

Para regenerar el cliente de Prisma tras modificar el esquema:

```bash
npx prisma generate
npx prisma migrate dev --name nombre-de-la-migracion
```

---

## 🧪 Tests

```bash
# Correr todos los tests
npm run test

# Tests en modo watch
npm run test:watch
```

---

## 🌐 Deploy

El proyecto se despliega en **Railway**. Cada push a `main` dispara un deploy automático.

Para configurar el entorno de producción, definir las mismas variables del `.env.example` en el dashboard de Railway.

---

## 🗺️ Roadmap

- [x] Autenticación y roles
- [x] Reserva de turnos
- [x] Pago de seña con Mercado Pago
- [ ] Notificaciones por email
- [ ] Recordatorios automáticos
- [ ] Panel de métricas para el profesional
- [ ] Soporte para múltiples profesionales

---

## 📄 Licencia

MIT — libre para usar y modificar.
