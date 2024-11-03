# GuideMe - AI-Powered Yoga Pose Assistant

A web application developed during BaselHack that helps users perfect their yoga poses through AI-powered pose detection and personalized instructions.

## 🎯 Overview

GuideMe analyzes your yoga poses through uploaded photos and provides detailed instructions to help you achieve the perfect form. Whether you're a beginner or an experienced yogi, our AI assistant guides you toward better practice.

## 🤖 AI Models
- **Pose Detection**: Using [yoga_pose_image_classification](https://huggingface.co/dima806/yoga_pose_image_classification) from Hugging Face to accurately identify yoga poses
- **Instruction Generation**: Powered by [Mistral-7B-Instruct-v0.3](https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.3) to provide detailed, personalized pose instructions

## 🌐 Deployment
- **Hosting**: Application fully hosted on a VPS (Virtual Private Server)
- **Domain**: Temporarily accessible at https://baselhack.azu-dev.fr/
- **Infrastructure**: Both client and server running in Docker containers on the same VPS

## 🚀 Features

- AI-powered yoga pose detection
- Detailed pose correction instructions
- Export instructions in PDF or DOCX format
- User-friendly interface
- Real-time feedback

## 💻 Tech Stack & Benefits

### Frontend
- **React.js**: Enables component reusability and efficient DOM manipulation
- **Ant Design (antd)**: Provides production-ready UI components, reducing development time

### Backend
- **Express.js**: Offers lightweight and flexible routing for fast API development
- **Prisma ORM**: Simplifies database operations with type-safe queries and auto-completion
- **PostgreSQL**: Ensures data integrity with ACID compliance and handles complex relationships efficiently

### DevOps & Project Management
- **Docker**: Ensures consistent environments across development and production
- **GitHub Actions**: Automates testing and deployment processes
- **Docker Compose**: Simplifies multi-container application management
- **Jira**: Facilitates agile workflow with sprint planning and task tracking

## 🏗️ Project Structure

```
GuideMe/
├── assets/                 # Global assets
├── code/
│   ├── client/            # Frontend application
│   │   ├── public/        # Static files
│   │   └── src/
│   │       ├── assets/         # Frontend assets
│   │       ├── auth/           # Authentication logic
│   │       ├── components/     # React components
│   │       ├── lang/           # Internationalization
│   │       └── pages/          # Application pages
│   └── server/                 # Backend application
│       ├── ai/                 # AI pose detection logic
│       ├── prisma/             # Database schema and migrations
│       └── src/
│           ├── controllers/    # Route controllers
│           ├── entities/       # Data models
│           ├── services/       # Routes logic
│           ├── routers/        # Routes
│           └── middlewares/    # Middlewares
└── documentation/         # Project documentation
```

## 🔧 Setup & Installation

1. Clone the repository:
```bash
git clone https://github.com/Azurioh/BaselHack-2024-GuideMe
cd BaselHack-2024-GuideMe
```

2. Run with Docker:
```bash
docker-compose up --build
```

## 🔄 Development Workflow

1. Features and bugs are tracked in Jira
2. Code changes are version-controlled through GitHub
3. CI/CD pipeline automatically builds and tests changes
4. Docker ensures consistent deployment across environments

## 👥 Team
- [@Antoine Grand](https://github.com/agrand2004)
- [@Kevin Glaentzlin](https://github.com/kevinGLAENTZLIN)
- [@Gabin Pinos](https://github.com/GabinP-Epitech2027)
- [@Sacha Ramstein](https://github.com/sramstein)
- [@Arthur Spiller](https://github.com/ArthurSpiller)
- [@Xavier Rognon](https://github.com/xavier-rognon)
- [@Corentin Piquet](https://github.com/Corent1P)
- [@Alan Cunin](https://github.com/Azurioh)
- [@Evan Candan](https://github.com/evancandan)

## Project developed for the BaselHack 2024 hackathon.

[![BaselHack](https://img.shields.io/badge/BaselHack-2024-FF6B6B?style=for-the-badge)](https://baselhack.ch/)