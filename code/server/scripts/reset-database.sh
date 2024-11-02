#!/bin/sh

sudo docker compose down -v
rm -rf ../../.postgres
rm -rf ../prisma/client
./generate-prisma.sh
sudo docker compose up --build
