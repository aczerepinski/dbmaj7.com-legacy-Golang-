package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/aczerepinski/dbmaj7/api"
	"github.com/aczerepinski/dbmaj7/config"
	"github.com/aczerepinski/dbmaj7/repository"
)

func main() {
	appConfig := config.New()
	fmt.Printf("application configuration initialized:\n%s", appConfig)

	repo, err := repository.New(appConfig.DatabaseURL, appConfig.CacheTTLSeconds)
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
	http.ListenAndServe(":"+appConfig.Port, nil)
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./static/dist/dbmaj7.html")
}

func staticHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./static/dist/js/dbmaj7.js")
}
