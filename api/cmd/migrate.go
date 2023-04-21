package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/joho/godotenv"
	"github.com/rubenv/sql-migrate"
	_ "github.com/go-sql-driver/mysql"
)

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	dbURL := os.Getenv("DATABASE_URL")
	dbDriver := "mysql"

    log.Printf("DATABASE_URL: %s\n", dbURL)


	// Extract the database name from the connection string
	dbNameStart := strings.LastIndex(dbURL, "/") + 1
	dbNameEnd := strings.Index(dbURL[dbNameStart:], "?")
	dbName := dbURL[dbNameStart : dbNameStart+dbNameEnd]

	// Connect to MySQL without the database name
	dbWithoutName := dbURL[:dbNameStart] + dbURL[dbNameStart+dbNameEnd:]
	db, err := sql.Open(dbDriver, dbWithoutName)
	if err != nil {
		log.Fatalf("Error opening the database connection: %v", err)
	}
	defer db.Close()

	// Create the database if it doesn't exist
	_, err = db.Exec(fmt.Sprintf("CREATE DATABASE IF NOT EXISTS %s", dbName))
	if err != nil {
		log.Fatalf("Error creating the database: %v", err)
	}

	// Close the connection and reconnect with the database name
	db.Close()
	db, err = sql.Open(dbDriver, dbURL)
	if err != nil {
		log.Fatalf("Error opening the database connection: %v", err)
	}
	defer db.Close()

	migrations := &migrate.FileMigrationSource{
		Dir: "db/migrations",
	}

	n, err := migrate.Exec(db, "mysql", migrations, migrate.Up)
	if err != nil {
		log.Fatalf("Migration failed: %v", err)
	}
	log.Printf("Applied %d migrations!\n", n)
}
