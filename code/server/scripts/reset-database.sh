#!/bin/sh

docker compose down -v
sudo rm -rf ../../.postgres
sudo rm -rf ../prisma/client
./generate-prisma.sh
docker compose up --build
