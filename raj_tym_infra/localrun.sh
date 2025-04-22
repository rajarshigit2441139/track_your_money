#!/bin/bash

# Database setup
docker run --name postgres \
  -e POSTGRES_USER=tym_user \
  -e POSTGRES_PASSWORD=app_password \
  -e POSTGRES_DB=track_your_money \
  -p 5432:5432 \
  -d postgres

# Backend Set up
cd ../raj_tym_api

mvn clean install

# Run backend in the background
mvn spring-boot:run &

# Capture the PID of the backend process
BACKEND_PID=$!

# Frontend Set up
cd ../raj_tym_fe

npm i
npm run dev &

# Capture the frontend PID (optional, but helpful for managing processes)
FRONTEND_PID=$!

# Wait for the backend and frontend processes to finish
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT

# Wait for the processes to finish (keeping the script running until one of them is killed)
wait $BACKEND_PID $FRONTEND_PID
