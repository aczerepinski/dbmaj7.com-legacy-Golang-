package repository

import (
	"database/sql"
	"encoding/json"
	"fmt"

	"github.com/aczerepinski/dbmaj7/domain"
	"github.com/lib/pq"
)

// Articles contains functions for retreiving articles from the database and mapping them to Go structs
type Articles struct {
	db    *sql.DB
	cache *cache
}

// GetSummaries returns all articles and related authors, excluding article bodies.
func (a *Articles) GetSummaries() ([]*domain.Article, error) {
	var articles []*domain.Article

	all := `SELECT ar.is_published, ar.publication_date, ar.slug, ar.summary, ar.title,
		au.bio, au.first_name, au.last_name, au.photo_url, au.website
		FROM articles AS ar
		JOIN authors AS au
		ON ar.author_id = au.id`

	rows, err := a.db.Query(all)

	if err != nil {
		return articles, fmt.Errorf("unable to query database: %v", err)
	}

	defer rows.Close()

	for rows.Next() {
		var (
			isPublished     sql.NullBool
			publicationDate pq.NullTime
			slug            sql.NullString
			summary         sql.NullString
			title           sql.NullString
			bio             sql.NullString
			firstName       sql.NullString
			lastName        sql.NullString
			photoURL        sql.NullString
			website         sql.NullString
		)
		if err := rows.Scan(&isPublished, &publicationDate, &slug, &summary, &title, &bio, &firstName, &lastName, &photoURL, &website); err != nil {
			fmt.Printf("unable to scan row: %v", err)
			continue
		}
		article := domain.Article{
			Author: domain.Author{
				Bio:       bio.String,
				FirstName: firstName.String,
				LastName:  lastName.String,
				PhotoURL:  photoURL.String,
				Website:   website.String,
			},
			IsPublished:     isPublished.Bool,
			PublicationDate: publicationDate.Time,
			Slug:            slug.String,
			Summary:         summary.String,
			Title:           title.String,
		}
		articles = append(articles, &article)
	}
	return articles, nil
}

// GetBySlug returns a single article
func (a *Articles) GetBySlug(slug string) (*domain.Article, error) {
	cached, err := a.cache.getArticleBySlug(slug)
	if err == nil {
		return cached, nil
	}

	var article domain.Article

	bySlug := `SELECT ar.body, ar.is_published, ar.publication_date, ar.summary, ar.title,
		au.bio, au.first_name, au.last_name, au.photo_url, au.website
		FROM articles AS ar
		JOIN authors AS au
		ON ar.author_id = au.id
		WHERE ar.slug = $1
		LIMIT 1
	`

	row := a.db.QueryRow(bySlug, slug)

	var (
		body            sql.NullString
		isPublished     sql.NullBool
		publicationDate pq.NullTime
		summary         sql.NullString
		title           sql.NullString
		bio             sql.NullString
		firstName       sql.NullString
		lastName        sql.NullString
		photoURL        sql.NullString
		website         sql.NullString
	)

	if err := row.Scan(&body, &isPublished, &publicationDate, &summary, &title, &bio, &firstName, &lastName, &photoURL, &website); err != nil {
		return &article, fmt.Errorf("unable to scan row: %v", err)
	}

	var articleBody []domain.ArticleComponent
	if err := json.Unmarshal([]byte(body.String), &articleBody); err != nil {
		return &article, fmt.Errorf("unable to unmarshal article body: %v", err)
	}

	article = domain.Article{
		Author: domain.Author{
			Bio:       bio.String,
			FirstName: firstName.String,
			LastName:  lastName.String,
			PhotoURL:  photoURL.String,
			Website:   website.String,
		},
		Body:            articleBody,
		IsPublished:     isPublished.Bool,
		PublicationDate: publicationDate.Time,
		Slug:            slug,
		Summary:         summary.String,
		Title:           title.String,
	}

	a.cache.saveArticle(article)
	return &article, nil
}
