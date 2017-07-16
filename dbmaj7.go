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
	http.HandleFunc("/static/", staticHandler)
	http.HandleFunc("/", indexHandler)
	http.ListenAndServe(":8080", nil)
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("appIndex, path: ", r.URL.Path)
	http.ServeFile(w, r, "./static/dist/dbmaj7.html")
}

func staticHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("indexHandler, path: ", r.URL.Path)
	http.ServeFile(w, r, "./static/dist/js/dbmaj7.js")
}
