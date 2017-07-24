package domain

import (
	"time"
)

// Article represents an article to be published at /articles.
type Article struct {
	Author          Author             `json:"author"`
	Body            []ArticleComponent `json:"body"`
	IsPublished     bool               `json:"isPublished"`
	PublicationDate time.Time          `json:"publicationDate"`
	Slug            string             `json:"slug"`
	Summary         string             `json:"summary"`
	Title           string             `json:"title"`
}
