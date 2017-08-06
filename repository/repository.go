package repository

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

// Repository contains a connection to the database and query/insert + data mapping functionality
type Repository struct {
	db       *sql.DB
	Articles Articles
}

// New opens a database connection and returns a repository
func New(uri string) (*Repository, error) {
	fmt.Println("initializing database connection")
	var (
		db  *sql.DB
		err error
	)
	if db, err = sql.Open("postgres", uri); err != nil {
		return nil, fmt.Errorf("unable to establish connection: %v", err)
	}
	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("could not ping databasego get github.com/lib/pq, %v", err)
	}
	repo := Repository{
		db:       db,
		Articles: Articles{db},
	}
	return &repo, nil
}

// Close exposes db.Close so that the caller of r.New can defer closing
func (r *Repository) Close() {
	r.db.Close()
}
