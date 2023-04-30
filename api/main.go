
// api/main.go

package main

import (
	"log"

	"github.com/alexaung/api/controllers"
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
)

func main() {
	gin.SetMode(gin.ReleaseMode)
	router := gin.Default()

	// Add CORS middleware
	corsConfig := cors.DefaultConfig()
	corsConfig.AllowAllOrigins = true
	router.Use(cors.New(corsConfig))

	router.POST("/claim", controllers.ClaimNFT)

	router.GET("/metadata/:tokenId", controllers.GetMetadata)

	port := ":8080"
	log.Printf("Server listening on port %s", port)

	if err := router.Run(port); err != nil {
		log.Fatalf("Error starting server: %v", err)
	}
}
