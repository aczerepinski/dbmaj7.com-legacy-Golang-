package api

import (
	"github.com/aczerepinski/dbmaj7/domain"
	"github.com/aczerepinski/dbmaj7/repository"
)

// Service handles interactions with the Repository
type Service struct {
	Articles repository.Articles
}

// NewService returns an initialized Service
func NewService(articles repository.Articles) Service {
	return Service{
		Articles: articles,
	}
}

// GetArticleBySlug delgates query request to the repository - placeholder
// for additional business logic
func (s *Service) GetArticleBySlug(slug string) (*domain.Article, error) {
	return s.Articles.GetBySlug(slug)
}

// GetArticleSummaries delgates query request to the repository - placeholder
// for additional business logic
func (s *Service) GetArticleSummaries() ([]*domain.Article, error) {
	// TODO sort them here
	return s.Articles.GetSummaries()
}
