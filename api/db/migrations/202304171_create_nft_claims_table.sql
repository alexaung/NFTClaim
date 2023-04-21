-- +migrate Up
CREATE TABLE nft_claims (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nric VARCHAR(255) NOT NULL UNIQUE,
  wallet_address VARCHAR(255) NOT NULL UNIQUE,
  receipt VARCHAR(255) NOT NULL,
  token_id INT NOT NULL
);

-- +migrate Down
DROP TABLE nft_claims;
