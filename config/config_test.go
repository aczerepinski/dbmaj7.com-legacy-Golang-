package config

import (
	"os"
	"testing"
)

func TestNew(t *testing.T) {
	t.Parallel()

	os.Setenv("CACHE_TTL_SECONDS", "123")
	os.Setenv("DATABASE_URL", "postgres://tacos:pizza")

	cfg := New()

	if cfg.CacheTTLSeconds != 123 {
		t.Errorf("expected ttl to be 123, got %d", cfg.CacheTTLSeconds)
	}
	if cfg.DatabaseURL != "postgres://tacos:pizza" {
		t.Errorf("expected db url to be postgres://tacos:pizza, got %s", cfg.DatabaseURL)
	}
}
