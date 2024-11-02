#!/bin/sh

cd ..

npx prisma generate --schema="./prisma/schema.prisma"
