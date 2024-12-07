# Project Setup Guide

This document provides a detailed guide to setting up and running the project. Follow the steps below to ensure a smooth setup and execution process.

---

## Prerequisites

Before running the project, ensure you have the following:

1. **Database:** The project requires a PostgreSQL database. It is recommended to use [pgAdmin](https://www.pgadmin.org/) for managing the database.
2. **Node.js and npm:** Make sure you have Node.js and npm installed. You can download them [here](https://nodejs.org/).
3. **Environment Configuration:** Ensure you have a properly configured `.env` file.

---

## Steps to Set Up the Project

### 1. Start the Database

Ensure your database service is running. You can use tools like `pgAdmin` to start and manage the database.

### 2. Install Dependencies

Run the following command to install all required npm dependencies:

```bash
npm install
```

### 3. Configure the `.env` File

Create a `.env` file in the root directory of the project and configure it with the necessary environment variables.

### 4. Run Database Migrations

Run the following command to apply database migrations:

```bash
npx sequelize db:migrate
```

Verify that all necessary tables have been created in the database.

### 5. Start the Project

Start the project by running:

```bash
npm start
```

---
