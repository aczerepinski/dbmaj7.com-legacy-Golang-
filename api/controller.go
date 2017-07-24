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
	return &Controller{
		Service: service,
	}
}

// ArticleIndex returns a list of available articles
// func (c *Controller) ArticleIndex(w http.ResponseWriter, r *http.Request) {

// }

// ArticleShow returns a single article (identified by slug)
func (c *Controller) ArticleShow(w http.ResponseWriter, r *http.Request) {
	fmt.Println("path", r.URL.Path)
	slug := r.URL.Path[len("/api/articles/"):]
	fmt.Println("slug: ", slug)
	article, _ := c.Service.GetArticleBySlug(slug)
	if js, err := json.Marshal(article); err == nil {
		w.Header().Set("Content-Type", "application/json")
		w.Write(js)
	} else {
		fmt.Println(err)
	}
}

func (c *Controller) ArticleIndex(w http.ResponseWriter, r *http.Request) {
	articles, _ := c.Service.GetArticleSummaries()
	if js, err := json.Marshal(articles); err == nil {
		w.Header().Set("Content-Type", "application/json")
		w.Write(js)
	} else {
		fmt.Println(err)
	}
}
