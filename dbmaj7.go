package main

import (
	"fmt"
	"net/http"

	"github.com/aczerepinski/dbmaj7/api"
	"github.com/aczerepinski/dbmaj7/repository"
)

func main() {
	fmt.Println("in main")
	articleRepository := repository.Articles{}
	apiService := api.NewService(&articleRepository)
	apiController := api.NewController(&apiService)
	http.HandleFunc("/api/articles/this-is-such-an-awesome-article", apiController.ArticleShow)
	http.ListenAndServe(":8080", nil)
}
