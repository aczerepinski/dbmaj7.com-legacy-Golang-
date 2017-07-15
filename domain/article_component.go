package domain

// ArticleComponent represents a fragment of an article. The TemplateName string
// informs the front end how the data should be parsed and presented.
type ArticleComponent struct {
	Body            string           `json:"body"`
	MusicalExamples []MusicalExample `json:"elements"`
	TemplateName    string           `json:"templateName"`
}

// MusicalExample represents a fragment of a song.
// Example usage - in a ReharmWidget, original and reharmonized chord progressions
// are both represented as MusicalExamples
type MusicalExample struct {
	Chords        []string `json:"chords"`
	DefaultKey    string   `json:"defaultKey"`
	MeasureNumber int      `json:"measureNumber"`
	Title         string   `json:"title"`
}
