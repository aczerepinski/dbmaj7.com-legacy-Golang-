package domain

// ArticleComponent represents a fragment of an article. The TemplateName string
// informs the front end how the data should be parsed and presented.
type ArticleComponent struct {
	Body            string           `json:"body"`
	MusicalExamples []MusicalExample `json:"musicalExamples"`
	Order           int              `json:"order"`
	TemplateName    string           `json:"templateName"`
}

// MusicalExample represents a fragment of a song.
// Example usage - in a ReharmWidget, original and reharmonized chord progressions
// are both represented as MusicalExamples
type MusicalExample struct {
	Measures      []Measure `json:"chords"`
	DefaultKey    string    `json:"defaultKey"`
	MeasureNumber int       `json:"measureNumber"`
	Title         string    `json:"title"`
}

// Measure represents one measure (aka bar) of a musical chord progression.
// Generally if there is one chord in the Measure, it occupies all 4 beats
// (assuming 4/4 time signature). If there are two chords in the measure they
// are assumed to be 2 beats each, etc.
type Measure []string
