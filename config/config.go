package config

import (
	"fmt"
	"os"
	"strconv"
)

// Config holds config settings parsed from the environment
type Config struct {
	CacheTTLSeconds int
	DatabaseURL     string
	Port            string
}

// New returns an initialized Config
func New() Config {
	dbURL := fromEnv("DATABASE_URL",
		"postgresql://localhost:5432/dbmaj7?sslmode=disable")

	cacheTTL, _ := strconv.Atoi(fromEnv("CACHE_TTL_SECONDS", "60"))

	return Config{
		CacheTTLSeconds: cacheTTL,
		DatabaseURL:     dbURL,
		Port:            fromEnv("PORT", "8080"),
	}
}

// String is a prettier version of %+v for the Config struct
func (c Config) String() string {
	return fmt.Sprintf("Cache TTL: %ds\nDatabase URL: %s\nPort: %s\n\n",
		c.CacheTTLSeconds, c.DatabaseURL, c.Port)
}

func fromEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
