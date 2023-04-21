package models

import (
	"errors"
	"time"

	"github.com/alexaung/api/db"
)

type Claim struct {
	ID            uint       `gorm:"primary_key" json:"id"`
	NRIC          string     `gorm:"not null" json:"nric"`
	WalletAddress string     `gorm:"not null" json:"wallet_address"`
	Receipt       string     `gorm:"not null" json:"receipt"`
	TokenID       uint       `gorm:"not null" json:"token_id"`
	CreatedAt     time.Time  `gorm:"not null" json:"created_at"`
	UpdatedAt     time.Time  `gorm:"not null" json:"updated_at"`
}

func (c *Claim) Save() error {
	conn := db.GetDB()
	var count int
	conn.QueryRow("SELECT COUNT(*) FROM nft_claims WHERE nric = ? OR wallet_address = ?", c.NRIC, c.WalletAddress).Scan(&count)

	if count > 0 {
		return errors.New("NRIC or wallet address already exists")
	}

	_, err := conn.Exec("INSERT INTO nft_claims (nric, wallet_address, token_id, receipt) VALUES (?, ?, ?, ?)", c.NRIC, c.WalletAddress, c.TokenID, c.Receipt)
	return err
}

func GetTotalClaimsCount() (int, error) {
    conn := db.GetDB()
    var count int
    err := conn.QueryRow("SELECT COUNT(*) FROM nft_claims").Scan(&count)
    if err != nil {
        return 0, err
    }
    return count, nil
}

