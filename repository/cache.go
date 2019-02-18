package repository

import (
	"github.com/aczerepinski/dbmaj7/domain"
	"sync"
	"time"
)

const nanoMultiplier = 1000000000

type cache struct {
	ttl      int64
	cleanInterval time.Duration
	mu       sync.RWMutex
	articles map[string]cacheArticle
}

type cacheArticle struct {
	article    domain.Article
	expiration int64
}

func newCache(ttlSeconds int) *cache {
	c := &cache{
		ttl:      int64(ttlSeconds) * nanoMultiplier,
		articles: map[string]cacheArticle{},
		cleanInterval: 10 * time.Second,
	}

	go c.startCleaning()
	return c
}

func (c *cache) getArticleBySlug(slug string) (*domain.Article, error) {
	c.mu.RLock()
	a, ok := c.articles[slug]
	c.mu.RUnlock()
	if !ok {
		return &domain.Article{}, ErrNotFound
	}
	return &a.article, nil
}

func (c *cache) saveArticle(a domain.Article) {
	c.mu.Lock()
	expiration := time.Now().UnixNano() + c.ttl
	ca := cacheArticle{
		article:    a,
		expiration: expiration,
	}
	c.articles[a.Slug] = ca
	c.mu.Unlock()
}

func (c *cache) startCleaning() {
	t := time.NewTicker(c.cleanInterval)
	for {
		<-t.C
		c.clean()
	}
}

func (c *cache) clean() {
	now := time.Now().UnixNano()
	c.mu.Lock()
	for k, v := range c.articles {
		if v.expiration < now {
			delete(c.articles, k)
		}
	}
	c.mu.Unlock()
}
