package repository

import (
	"github.com/aczerepinski/dbmaj7/domain"
	"testing"
	"time"
)

const testSlug = "coltrane-is-the-best"

func TestGetArticleBySlug(t *testing.T) {
	t.Parallel()

	tests := []struct {
		slug        string
		expectedErr error
	}{
		{testSlug, nil},
		{"go-testing-best-practices", ErrNotFound},
	}

	halfSecond := int64(500000000)
	c := newTestCache(halfSecond)

	for i, test := range tests {
		if _, err := c.getArticleBySlug(test.slug); err != test.expectedErr {
			t.Errorf("test %d: expected error to be %v, got %v",
				i, test.expectedErr, err)
		}
	}
}

func TestSaveArticle(t *testing.T) {
	t.Parallel()

	halfSecond := int64(500000000)
	c := newTestCache(halfSecond)
	article := domain.Article{Slug: "a-love-supreme"}
	c.saveArticle(article)

	a, err := c.getArticleBySlug("a-love-supreme")
	if err != nil {
		t.Fatalf("expected err to be nil, got %v", err)
	}
	if a.Slug != "a-love-supreme" {
		t.Errorf("expected slug to be a-love-supreme, got %s", a.Slug)
	}
}

func TestClean(t *testing.T) {
	t.Parallel()

	oneNanoSecond := int64(1)
	c := newTestCache(oneNanoSecond)

	if _, err := c.getArticleBySlug(testSlug); err != nil {
		t.Fatal("test setup failed, document not found prior to cleaning")
	}

	c.clean()

	if _, err := c.getArticleBySlug(testSlug); err != ErrNotFound {
		t.Errorf("expected ErrNotFound, got %v", err)
	}
}

func TestStartCleaning(t *testing.T) {
	t.Parallel()
	if testing.Short() {
		t.Skip()
	}

	oneNanoSecond := int64(1)
	c := newTestCache(oneNanoSecond)

	if _, err := c.getArticleBySlug(testSlug); err != nil {
		t.Fatal("test setup failed, document not found prior to cleaning")
	}

	c.cleanInterval = 100 * time.Millisecond
	go c.startCleaning()
	time.Sleep(300 * time.Millisecond)

	if _, err := c.getArticleBySlug(testSlug); err != ErrNotFound {
		t.Errorf("expected ErrNotFound, got %v", err)
	}
}

func newTestCache(ttl int64) *cache {
	return &cache{
		ttl: ttl,
		articles: map[string]cacheArticle{
			testSlug: cacheArticle{
				article:    domain.Article{Title: "Coltrane"},
				expiration: time.Now().UnixNano() + ttl,
			},
		},
	}
}
