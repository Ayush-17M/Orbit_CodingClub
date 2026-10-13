# Orbit Coding Club Website

React/Vite frontend backed by the Spring Boot API and MySQL database.

## Run the backend

Create the `orbit` MySQL database, configure the backend database credentials and admin password in `Backend/src/main/resources/application.properties` (or environment variables), then start the backend from the `Backend` folder:

```powershell
.\mvnw.cmd spring-boot:run
```

The backend listens on `http://localhost:8080` by default. Set `CORS_ORIGINS` if the frontend is served from a different origin.

## Run the frontend

```bash
npm install
npm run dev
```

The frontend API defaults to `http://localhost:8080/api`. Set `VITE_API_BASE_URL` when the backend uses a different address.

## Admin and content storage

Sign in at `/admin/login` with the backend-configured admin account (`ADMIN_USERNAME` and `ADMIN_PASSWORD`). Admin changes are authorized by the backend using a JWT.

Use the **Wings** tab to manage each wing coordinator. Use **Events** to add, update, and delete events and upload their pictures. Event metadata and site content are stored in MySQL; uploaded image bytes are stored in the `stored_images` table. Public gallery event entries show the selected wing and its coordinator.

The admin **Save Changes**, **Reset**, **Export Data**, and **Import Data** tools are available for the site content.

## Notes

- Phone and social URLs remain blank/configurable rather than invented.
- Map is a placeholder until an embed URL is supplied in Admin.
- Three.js is intentionally limited to strategic visual use and automatically respects reduced-motion settings.
