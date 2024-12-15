#!/bin/bash

# Видаляємо існуючу мережу sneakpeek-network, якщо вона є
docker network rm sneakpeek-network

# Створюємо нову мережу sneakpeek-network
docker network create sneakpeek-network

# Видаляємо контейнери sneakpeek-postgres та sneakpeek-app, якщо вони існують
docker rm -f sneakpeek-postgres
docker rm -f sneakpeek-app

# Запускаємо контейнер sneakpeek-postgres
docker run --name sneakpeek-postgres --network sneakpeek-network -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=dbprod -p 5433:5432 -d postgres:latest

# Запускаємо контейнер sneakpeek-app
docker run -it --name sneakpeek-app --network sneakpeek-network -p 9091:9091 dimkakao/sneakpeek-image --spring.profiles.active=prod

# Очікуємо натискання клавіші (для зупинки контейнерів після запуску)
read -p "Press any key to continue..."

# Видаляємо контейнер sneakpeek-postgres після завершення
docker rm -f sneakpeek-postgres
