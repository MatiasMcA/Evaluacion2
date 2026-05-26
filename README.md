# Evaluacion2 - Backend Contacts

Proyecto mínimo para gestionar `Contactos` con Node.js + Express.

Instalación:

```bash
npm install
```

Ejecutar:

```bash
npm start
```

Endpoints:
- `GET /api/contacts` - Listar contactos
- `GET /api/contacts/:id` - Obtener contacto por id
- `POST /api/contacts` - Crear contacto (protegido: requiere cookie de sesión o header `x-api-key`)
- `POST /api/auth/login` - Login demo (user/pass) que crea cookie de sesión
- `POST /api/auth/logout` - Elimina cookie

Uso rápido:
- Abrir `index.html` en el navegador (servido por Express en http://localhost:3000/index.html).
- Hacer Login con `user` / `pass` y luego crear contactos desde el formulario.

Seguridad:
- Se incluye un middleware simple que requiere cookie `session` o un `x-api-key` válido para operaciones de escritura.
- En producción debe usarse HTTPS para proteger cookies y credenciales.
