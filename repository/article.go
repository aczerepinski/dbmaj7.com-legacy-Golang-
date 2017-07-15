package repository

import (
	"github.com/aczerepinski/dbmaj7/domain"
)

type Articles struct{}

func (a *Articles) GetArticleBySlug(slug string) (*domain.Article, error) {
	article := domain.Article{
		Author: domain.Author{
			FirstName: "Adam",
			LastName:  "Czerepinski",
		},
		Body: []domain.ArticleComponent{
			domain.ArticleComponent{
				Body:         "this is the body of the first component",
				TemplateName: "standardParagraph",
			},
			domain.ArticleComponent{
				MusicalExamples: []domain.MusicalExample{
					domain.MusicalExample{
						Chords: []string{
							"IMaj7",
							"V7",
						},
						DefaultKey:    "C",
						MeasureNumber: 4,
						Title:         "Song with a 1 chord and a 4 chord",
					},
				},
			},
		},
		IsPublished: false,
		Slug:        "this-is-such-an-awesome-article",
		Title:       "This is Such an Awesome Article",
	}
	return &article, nil
}
