# CompusHub React and Spring Boot Integration

**Student:** Yasir Yusufi  
**Lab:** Display Spring Boot Courses in React

This React frontend loads course records from the Spring Boot API and displays the ID, code, title, and credits in a responsive table. The Courses page also shows loading, error, and empty-result states and the total course count.

## Run the applications

Start the backend in its project directory:

```powershell
.\mvnw.cmd spring-boot:run
```

The backend runs at `http://localhost:8080`. Its course endpoint is `GET http://localhost:8080/api/v1/courses`.

In a separate terminal, open this React project and run:

```bash
npm install
npm run dev
```

The frontend uses `http://localhost:5173` to match the backend CORS configuration.

