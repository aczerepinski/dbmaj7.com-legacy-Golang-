package domain

import (
	"time"
)

// Album represents a recorded album. A collection of songs and metadata.
type Album struct {
	Artist      Musician   `json:"artist"`
	Personnel   []Musician `json:"personnel"`
	ReleaseDate time.Time  `json:"releaseDate"`
	Title       string     `json:"title"`
	Tracks      []Song     `json:"tracks"`
}
