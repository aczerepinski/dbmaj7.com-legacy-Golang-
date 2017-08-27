package api

import (
	"fmt"

	"github.com/aczerepinski/dbmaj7/domain"
	"github.com/aczerepinski/dbmaj7/repository"
)

// Service handles interactions with the Repository
type Service struct {
	Articles repository.Articles
}

// NewService returns an initialized Service
func NewService(articles repository.Articles) Service {
	fmt.Println("initializing service")
	return Service{
		Articles: articles,
	}
}

// GetArticleBySlug delegates query request to the repository - placeholder
// for additional business logic
func (s *Service) GetArticleBySlug(slug string) (*domain.Article, error) {
	return s.Articles.GetBySlug(slug)
}

// GetArticleSummaries delegates query request to the repository - placeholder
// for additional business logic
func (s *Service) GetArticleSummaries() ([]*domain.Article, error) {
	return s.Articles.GetSummaries()
}
