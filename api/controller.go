package api

import (
	"encoding/json"
	"fmt"
	"net/http"
)

// Controller handles http requests to api endpoints
type Controller struct {
	Service *Service
}

// NewController returns an initialized Controller
func NewController(service *Service) *Controller {
	fmt.Println("initializing controller")
	return &Controller{
		Service: service,
	}
}

// ArticleShow returns a single article (identified by slug)
func (c *Controller) ArticleShow(w http.ResponseWriter, r *http.Request) {
	fmt.Println("path", r.URL.Path)
	slug := r.URL.Path[len("/api/articles/"):]
	fmt.Println("slug: ", slug)
	article, err := c.Service.GetArticleBySlug(slug)
	if err != nil {
		fmt.Printf("error from article service: %v", err)
	}
	if js, err := json.Marshal(article); err == nil {
		w.Header().Set("Content-Type", "application/json")
		w.Write(js)
	} else {
		fmt.Println(err)
	}
}

// ArticleIndex returns meta information (everything except body) for all articles
func (c *Controller) ArticleIndex(w http.ResponseWriter, r *http.Request) {
	articles, err := c.Service.GetArticleSummaries()
	if err != nil {
		fmt.Printf("error retrieving article summaries: %v ", err)
	}
	if js, err := json.Marshal(articles); err == nil {
		w.Header().Set("Content-Type", "application/json")
		w.Write(js)
	} else {
		fmt.Println(err)
	}
}
