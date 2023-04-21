package controllers

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"net/http"

	"github.com/alexaung/api/models"
	"github.com/gin-gonic/gin"
)

type ClaimRequest struct {
	NRIC          string `json:"nric" binding:"required"`
	WalletAddress string `json:"wallet_address" binding:"required"`
	// Add more fields here if needed
}

func ClaimNFT(c *gin.Context) {
	var req ClaimRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	hash := sha256.Sum256([]byte(req.NRIC + req.WalletAddress))
	receipt := hex.EncodeToString(hash[:])

	claim := &models.Claim{
		NRIC:          req.NRIC,
		WalletAddress: req.WalletAddress,
		Receipt:       receipt, // Save the receipt
		// Set more fields here if needed
	}

	// Set the tokenId for the claim
	tokenID, err := generateTokenID()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	claim.TokenID = tokenID

	if err := claim.Save(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"receipt": receipt, "tokenId": claim.TokenID})
}

func generateTokenID() (uint, error) {
	// Get the total count of records in the claims table
	count, err := models.GetTotalClaimsCount()
	if err != nil {
		return 0, err
	}

	// Increment the count by 1 to get the next token ID
	tokenId := count + 1

	return uint(tokenId), nil
}

func GetMetadata(c *gin.Context) {
	tokenId := c.Param("tokenId")

	name := fmt.Sprintf("Name of the NFT %s", tokenId)
	description := fmt.Sprintf("A description of the NFT %s", tokenId)
	// Using Lorem Picsum for random images
	image := fmt.Sprintf("https://picsum.photos/id/%s/200/200", tokenId)

	metadata := gin.H{
		"name":        name,
		"description": description,
		"image":       image,
	}

	c.JSON(http.StatusOK, metadata)
}
