cd ..

export DATABASE_URL="postgres://$POSTGRES_USER:$POSTGRES_PASSWORD@localhost:$POSTGRES_PORT/$POSTGRES_DB"

npx prisma migrave dev --schema=./prisma/schema.prisma