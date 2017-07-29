package repository

import (
	"time"

	"github.com/aczerepinski/dbmaj7/domain"
)

type Articles struct{}

func (a *Articles) GetArticleSummaries() ([]*domain.Article, error) {
	var articles []*domain.Article
	threeTricks := domain.Article{
		Slug:    "three-weird-tricks-to-reharmonize-a-twelve-bar-blues",
		Summary: "Step up your harmony game with reharmonization techniques utilized by Joe Henderson, Charles Mingus, and Charlie Parker",
		Title:   "Three Weird Tricks to Reharmonize a 12 Bar Blues",
	}
	articles = append(articles, &threeTricks)
	return articles, nil
}

func (a *Articles) GetArticleBySlug(slug string) (*domain.Article, error) {
	pubDate, _ := time.Parse("Jan 2, 2006", "Jan 29, 2017")
	article := domain.Article{
		Author: domain.Author{
			FirstName: "Adam",
			LastName:  "Czerepinski",
			PhotoURL:  "https://www.gravatar.com/avatar/acd5a68afdf05b06e4286d39d502083b?s=100",
			Website:   "http://www.adamcz.com",
		},
		Body: []domain.ArticleComponent{
			domain.ArticleComponent{
				Body:         "If you aren't familiar with reharmonization, it essentially means to replace some of the chords in a song. Typically this is done without requiring any changes to the original melody, although small chromatic adjustments aren't unheard of.",
				TemplateName: "articleParagraph",
			},
			domain.ArticleComponent{
				Body:         "The 12 bar blues is a particularly good vehicle for exploring reharmonization techniques because it's a universally known song form, and reasonably close to a blank canvas. In fact, the 12 bar blues gets reharmonized so frequently that it would be difficult to pin down what the actual \"standard\" chords are. There's definitely a subdominant chordin the 5th bar and a dominant in the 9th - but beyond that, it's anybody's call. As such, the \"Standard Blues\" chords in this article may vary from one example to the next.",
				TemplateName: "articleParagraph",
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
		IsPublished:     false,
		PublicationDate: pubDate,
		Slug:            "three-weird-tricks-to-reharmonize-a-twelve-bar-blues",
		Title:           "Three Weird Tricks to Reharmonize a 12 Bar Blues",
	}
	return &article, nil
}
