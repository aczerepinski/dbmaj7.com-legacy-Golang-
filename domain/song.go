package domain

// Song represents an audio track on an album or a composition in printed form
type Song struct {
	Composer Musician `json:"composer"`
	Title    string   `json:"title"`
}
