# Media Content Retrieval System

## Overview

This project demonstrates the design and implementation of a **media retrieval system** that fetches media content from an **Elasticsearch index** and serves it in a user-friendly way. It tackles real-world complexities like **unstructured data, scalability, and search optimization** while ensuring a seamless experience for users.

## 🛠️ Setup Instructions

### 1️⃣ Prerequisites

Before running the project, ensure you have:

- **Node.js** (v20 or later) installed on your system.
- **Docker** and **Docker Compose** for containerization.
- **Elasticsearch** running locally or hosted.

### 2️⃣ Clone the Repository

Clone the project repository and navigate to the directory:

```sh
git clone https://github.com/zubair001/imago-app.git
cd imago-app
```

### 3️⃣ Configure Elasticsearch

Ensure Elasticsearch is running in the https://5.75.227.63:9200 address.

### 4️⃣ Environment Variables

The application uses a `.env` file for configuration. Create a `.env` file in the both frontend and backend project root.
Backend Configuration:

```ini
# Elasticsearch Configuration
ELASTICSEARCH_HOST=https://5.75.227.63:9200
ELASTICSEARCH_USER=elastic
ELASTICSEARCH_PASSWORD=rQQtbktwzFqAJS1h8YjP
ELASTICSEARCH_INDEX=imago
ELASTICSEARCH_TLS=false


# Backend Configuration
PORT=5000
LOG_LEVEL=debug
FRONTEND_URL=http://localhost:5173

```

Frontend .env configuration

```ini
# Frontend Configuration
VITE_API_BASE_URL=http://localhost:5000/media
VITE_IMAGE_BASE_URL = https://cdn.imago-images.de/bild/st/
VITE_IMAGE_FALLBACK_URL = https://cdn.imago-images.de/bild/sp/1059016371/m.jpg
```

### 5️⃣ Run the Application

To build and start the entire system (backend, frontend, and dependencies), run:

```sh
docker-compose up --build
```

- The **backend** will run on `http://localhost:5000`
- The **frontend** (if included) will be available on `http://localhost:5173`

## 📁 Project Structure

```sh
imago-app/
│── backend/              # NestJS backend service
│── frontend/             # Frontend UI (for API interaction)
│── docker-compose.yml    # Containerized setup
│── .env                  # Environment variables
│── README.md             # Documentation
│── .gitignore            # Git ignore file
```

## 🚀 API Documentation

This project uses **Swagger** for API documentation.
Once the backend is running, visit:

📌 **Swagger UI**: [http://localhost:5000/api](http://localhost:5000/api)

## 📜 License

This project is licensed under the **MIT License**.

---

### 🤝 Contact

For questions or contributions, feel free to reach out via **GitHub Issues** or contact the project maintainers.

---

⭐ **If you find this project useful, please consider starring the repo!** 🚀

```

```
