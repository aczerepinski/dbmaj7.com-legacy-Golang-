package repository

import (
	"errors"
)

// ErrNotFound indicates that the requested item was not found
var ErrNotFound = errors.New("requested item not found")
