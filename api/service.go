package api

import (
	"github.com/aczerepinski/dbmaj7/domain"
	"github.com/aczerepinski/dbmaj7/repository"
)

// Service handles interactions with the Repository
type Service struct {
	Articles *repository.Articles
}

// NewService returns an initialized Service
func NewService(articles *repository.Articles) Service {
	return Service{
		Articles: articles,
	}
}

// GetArticleBySlug delgates query request to the repository, and
// formats response if needed
func (s *Service) GetArticleBySlug(slug string) (*domain.Article, error) {
	return s.Articles.GetArticleBySlug(slug)
}
