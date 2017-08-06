CREATE TABLE IF NOT EXISTS articles (
    id SERIAL PRIMARY KEY,
    author_id INT,
    body JSON,
    is_published BOOL,
    publication_date TIMESTAMP WITHOUT TIME ZONE,
    slug TEXT NOT NULL,
    summary TEXT,
    title TEXT
);

CREATE INDEX articles_slug_idx ON articles USING btree(slug);

CREATE TABLE IF NOT EXISTS authors (
    id SERIAL PRIMARY KEY,
    bio TEXT,
    first_name TEXT,
    last_name TEXT,
    photo_url TEXT,
    website TEXT
);