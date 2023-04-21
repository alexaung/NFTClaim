package db

import (
    "database/sql"
    _ "github.com/go-sql-driver/mysql"
    "github.com/joho/godotenv"
    "os"
    "strings"
    _ "github.com/lib/pq"
)

var db *sql.DB

func init() {
	
    // Load environment variables from .env file
    err := godotenv.Load(".env")

    if err != nil {
        panic("Error loading .env file")
    }

    // Get the DATABASE_URL and DATABASE_DRIVER environment variables
    dbURL := os.Getenv("DATABASE_URL")
    dbDriver := os.Getenv("DATABASE_DRIVER")

    switch dbDriver {
    case "mysql":
        // Remove the "tcp://" prefix if it exists
        dbURL = strings.TrimPrefix(dbURL, "tcp://")
        // Replace "@" with "%40" in the password, if it exists
        if atIndex := strings.Index(dbURL, "@"); atIndex != -1 {
            password := dbURL[:atIndex]
            password = strings.Replace(password, "@", "%40", -1)
            dbURL = password + dbURL[atIndex:]
        }
    case "postgres":
        // Replace the "postgres://" prefix with "postgresql://" if it exists
        dbURL = strings.Replace(dbURL, "postgres://", "postgresql://", 1)
    default:
        panic("Unsupported database driver")
    }

    db, err = sql.Open(dbDriver, dbURL)
    if err != nil {
        panic(err)
    }
}


func GetDB() *sql.DB {
	return db
}
