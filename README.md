# PedalStart Task Manager Assignment

## Introduction
This is the solution to the assignment provided by PedalStart. This is a simple Task Manager Webapp that allows user to create new task, get all the list of created task, view the details of a specific task, edit 
an existing task and as well as delete a task.

## Technologies Used

### 01) For Frontend
NextJS, TailwindCSS, ShadcnUI

### 02) For Backend
ExpressJS

### 03) For Database
MongoDB

## 04) Running the Project locally

### Step 1

Atfirst create an account in MongoDB atlas: https://www.mongodb.com/cloud/atlas/register and then setup a database. After the database is setup, copy the `MONGO_URI` string of `NodeJS` into the clipboard.

### Step 2

Clone the github repo of this project into your local system

### Step 3 (Setting up the Backend)

After the project is cloned successfully, get inside the folder of the project. Inside the project folder, you will see two subfolders named `frontend` and `backend`. Atfirst, get inside the `backend` folder, then, open
command prompt inside the folder and type:
```
npm i
```
This will install all the necessary dependencies required to run the backend of the application.

After all the necessary dependencies are installed, open an IDE of your choice (VSCode Preffered) inside the backend folder. After the IDE is opened inside the backend folder, create a `.env` file in the root location of the folder, then,
inside the `.env` file, paste the `MONGO_URI` like this:
```
MONGO_URI=your_mongo_uri
```
NOTE: Make sure to paste the password as well in the `MONGO_URI` and provide a database name as well.

After everything is done, again open terminal inside the `backend` folder and type: 
```
npm run dev
```
This will start the development server for the ExpressJS at `PORT: 5000` 

### Step 4 (Setting up the Frontend)

After the `backend` is setup successfully, get inside the `frontend` folder. Inside the `frontend` folder, open command prompt and type:
```
npm i
```
This will install all the necessary dependencies required to run the frontend web app of the application.

After all the necessary dependencies are installed, open an IDE of your choice (VSCode Preffered) inside the backend folder. After the IDE is opened inside the backend folder, create a `.env.local` file, then,
inside the `.env` file in the root location of the folder, paste the `BACKEND_NODEJS_BASE_URL` like this:
```
NEXT_PUBLIC_BACKEND_NODEJS_URL=http://localhost:5000
```

This will connect the frontend NextJS app with that of the expressJS backend.

After everything is setup, open the terminal again inside `frontend` folder and type:
```
npm run dev
```

This will start the NextJS application at `http://localhost:3000`.

## Links

01) Live Preview: https://task-manager-pedalstart.vercel.app/
02) Deployed Backend URL of the ExpressJS app: https://task-manager-pedalstart-assignment.onrender.com/
3) Postman documentation of the Backend ExpressJS API: https://documenter.getpostman.com/view/14623339/2sA3XQggic
