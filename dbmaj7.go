package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/aczerepinski/dbmaj7/api"
	"github.com/aczerepinski/dbmaj7/repository"
)

func main() {
	fmt.Println("parsing environment variables")
	databaseURL := os.Getenv("DATABASE_URL")
	if databaseURL == "" {
		databaseURL = "postgresql://localhost:5432/dbmaj7?sslmode=disable"
	}
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	repo, err := repository.New(databaseURL)
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
	fmt.Printf("initializing server on port %v", port)
	http.ListenAndServe(":"+port, nil)
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./static/dist/dbmaj7.html")
}

func staticHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./static/dist/js/dbmaj7.js")
}
