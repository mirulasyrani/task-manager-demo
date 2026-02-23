# Task Manager Demo

A full-stack task management CRUD application built as a portfolio project.

**Stack:** Spring Boot (Java 17) · Angular 17 · MySQL / H2 · Docker

---

## Project Structure

```
task-manager-demo/
├── backend/          # Spring Boot REST API
├── frontend/         # Angular SPA
├── python-scripts/   # Utility scripts (seed, export, health check)
└── docker-compose.yml
```

---

## Getting Started

### Option 1 — Docker (recommended)

```bash
# In-memory H2 (no setup required)
docker compose up --build

# With MySQL
DB_PASS=secret docker compose --profile mysql up --build
```

| Service      | URL                              |
|--------------|----------------------------------|
| Frontend     | http://localhost:4200            |
| Backend      | http://localhost:8080            |
| H2 Console   | http://localhost:8080/h2-console |

---

### Option 2 — Run locally

**Backend**

```bash
cd backend
./mvnw spring-boot:run
# Runs on http://localhost:8080 with H2 in-memory DB
```

**Frontend**

```bash
cd frontend
npm install
npm start
# Runs on http://localhost:4200
```

---

## API Endpoints

### Tasks `/api/tasks`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/tasks` | List tasks (filter by `status`, `priority`, `categoryId`, `search`) |
| GET | `/api/tasks/{id}` | Get task by ID |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/{id}` | Update task |
| DELETE | `/api/tasks/{id}` | Delete task |

### Categories `/api/categories`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/categories` | List all categories |
| GET | `/api/categories/{id}` | Get category by ID |
| POST | `/api/categories` | Create category |
| PUT | `/api/categories/{id}` | Update category |
| DELETE | `/api/categories/{id}` | Delete category |

---

## Python Scripts

```bash
cd python-scripts
pip install -r requirements.txt

# Seed demo data
python seed_data.py --host http://localhost:8080

# Export tasks to CSV
python export_tasks.py --output tasks.csv

# Health check
python health_check.py --host http://localhost:8080
```

---

## Running Tests

**Backend**

```bash
cd backend
./mvnw test
```

**Frontend**

```bash
cd frontend
npm test
```

---

## Environment Variables

Copy `.env.example` and adjust as needed:

```bash
cp .env.example .env
```

| Variable        | Default    | Description                                              |
|-----------------|------------|----------------------------------------------------------|
| `DB_USER`       | `root`     | MySQL username                                           |
| `DB_PASS`       | `changeme` | MySQL password                                           |
| `SPRING_PROFILE`| `default`  | Spring profile (`default` = H2, `mysql` = MySQL)         |

---

## Tech Highlights

- **Backend:** Spring Boot 3, Spring Data JPA, Bean Validation, global exception handling, H2 (dev) / MySQL (prod)
- **Frontend:** Angular 17 standalone components, reactive HTTP client, route-based navigation
- **CI/CD:** GitHub Actions — build + test on every push, Docker image publish on merge to `main`
