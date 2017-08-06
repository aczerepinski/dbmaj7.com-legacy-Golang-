package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/aczerepinski/dbmaj7/api"
	"github.com/aczerepinski/dbmaj7/repository"
)

func main() {
	fmt.Println("in main")
	defaultPostgresURI := "postgresql://localhost:5432/dbmaj7?sslmode=disable"
	repo, err := repository.New(defaultPostgresURI)
	if err != nil {
		log.Fatal("could not initialize database", err)
	}
	defer repo.Close()
	apiService := api.NewService(repo.Articles)
	apiController := api.NewController(&apiService)
	http.HandleFunc("/api/articles/", apiController.ArticleShow)
	http.HandleFunc("/api/articles", apiController.ArticleIndex)
	http.HandleFunc("/static/", staticHandler)
	http.HandleFunc("/", indexHandler)
	http.ListenAndServe(":8080", nil)
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./static/dist/dbmaj7.html")
}

func staticHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./static/dist/js/dbmaj7.js")
}
