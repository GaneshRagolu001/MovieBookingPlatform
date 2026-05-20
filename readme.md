# 🎬 Movie Booking Platform API

![Java](https://img.shields.io/badge/Java-21-orange?style=for-the-badge&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.4.3-brightgreen?style=for-the-badge&logo=springboot)
![MySQL](https://img.shields.io/badge/MySQL-8-blue?style=for-the-badge&logo=mysql)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge&logo=docker)
![JWT](https://img.shields.io/badge/JWT-Tokens-black?style=for-the-badge&logo=jsonwebtokens)

A robust, enterprise-grade RESTful API for a Movie Booking Platform. Built using **Spring Boot**, **Java 21**, and **MySQL**, it provides secure user authentication, movie browsing, theater and show scheduling, and ticket booking functionalities.

---

## 🛠️ Key Features

- **Robust Authentication:** Secure registration and login flows using stateless JWTs and Spring Security. Features Role-Based Access Control (Admin/User).
- **Core Entity Management:** Complete unified CRUD operations for **Movies**, **Theaters**, **Shows**, and **Users**.
- **Ticketing & Booking:** Full lifecycle management for ticket reservations (Create, Confirm, Cancel).
- **Docker-Ready:** Fully containerized database and backend layers ready for multi-container orchestration with Docker Compose.
- **Modern Infrastructure:** Utilizing Spring Data JPA (Hibernate) with MySQL for reliable data persistence.

---

## 🧩 Tech Stack

- **Core Framework:** Java 21, Spring Boot 3.4.3, Spring Web
- **Security Aspect:** Spring Security, JSON Web Tokens (JJWT 0.12.6)
- **Database Layer:** Spring Data JPA, Hibernate ORM, MySQL 8
- **Developer Tools:** Maven, Project Lombok, Spring Boot DevTools
- **Containerization:** Docker, Docker Compose

---

## 📡 API Overview

The platform exposes several resource endpoints secured by JWT.

| Resource | Base Path | Key Functionality |
| --- | --- | --- |
| **Auth** | `/api/auth` | User registration (`/registernormaluser`), authentication (`/login`), fetching connected user profile (`/getcurrentuser`) |
| **Admin** | `/api/admin` | Endpoints restricted to administrative roles for platform configurations |
| **Movies** | `/api/movies` | Fetch all, search by genre/title/language, create/update/delete (Admin), upload image configurations |
| **Theaters** | `/api/theaters` | Manage theater chains and individual branch locations |
| **Shows** | `/api/shows` | Schedule shows, retrieve timings per movie or specific theater constraints |
| **Bookings** | `/api/bookings` | Book tickets, confirm payments, fetch user booking histories, extract operational statuses (`/getbookingbystatus/{status}`) |

*(For complete payload structures and precise routing configurations, refer to the `Controller` classes located under `src/main/java/com/gane/MovieBookingApplication/Controller/`)*

---

## 🚀 Getting Started Locally

### 1. Requirements

- **Java 21 Development Kit (JDK)** locally installed.
- **Docker** and **Docker Compose** installed (Optimal method).
- **Maven** (optional, you can use the wrapper `mvnw` included in the root).

### 2. Environment Configuration

Copy the example environment variables file to create a working `.env` file structure:

```bash
cp .env.example .env
```

Open `.env` and fill in your environment variables context:

```properties
MYSQL_DATABASE=movie_app
MYSQL_ROOT_PASSWORD=your_secure_password
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/movie_app?createDatabaseIfNotExist=true
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=your_secure_password
JWT_KEY=your_secure_jwt_secret_key_base64_encoded_minimum_256_bits
```

*(Ensure the local properties align with configurations like `application.properties` and your MySQL deployment config.)*

### 3. Running via Docker Compose (Recommended)

Let Docker handle building the API container along with spinning up the interconnected MySQL container.

```bash
# Start MySQL and the Backend App detached
docker-compose up --build -d
```
The API should now resolve at: **http://localhost:8080**  

### 4. Running Manually via Developer Shell

If you are iterating locally without building docker images for every code change:

**Step A:** Initialize precisely the Database Container via Docker:
```bash
docker-compose up -d mysql
```

**Step B:** Run the Spring Application leveraging the Maven Wrapper:
```bash
# Unix based environments (macOS/Linux)
./mvnw spring-boot:run

# Windows Terminal / Command Prompt
mvnw.cmd spring-boot:run
```

---

## 📁 Repository Structure

```text
.
├── src/main/java/com/gane/MovieBookingApplication/
│   ├── Controller/      # Expressive API Controllers
│   ├── DTO/             # Transfer payload formats boundaries
│   ├── JWT/             # Authentication Utilities/Filters
│   ├── Security/        # Defined interceptors and customized access management
│   ├── entity/          # Data Entities mappings
│   ├── repository/      # Defined Spring Data Repository definitions
│   └── service/         # Abstracted Business Logic boundaries
├── src/main/resources/  
│   └── application.properties # Core Spring fallback property structures
├── .env.example         # Reference templated properties definition
├── docker-compose.yml   # Docker configuration to spin services up
├── Dockerfile           # Layered API Service container specifications
└── pom.xml              # Defined remote binary dependency specifications
```

---

## 🤝 Project Roadmap

- Add **OpenAPI / Swagger** implementation for automatic route generation and payload exploration.
- Expand integrated coverage with unit and **Testcontainers**-based integration test pipelines.
- Implement structured **Redis Caching** layer for heavy traffic API endpoints (ie. movie availability).
