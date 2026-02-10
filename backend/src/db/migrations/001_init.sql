CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE hero_slides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    title TEXT NOT NULL,
    description TEXT,
    media_url TEXT NOT NULL,
    media_type TEXT CHECK (media_type IN ('image', 'video')) NOT NULL,

    cta_text TEXT,
    cta_link TEXT,

    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,

    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_hero_active ON hero_slides(is_active);
CREATE INDEX idx_hero_order ON hero_slides(display_order);

CREATE TABLE blogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,

    content TEXT NOT NULL, 
    meta_title TEXT,
    meta_description TEXT,
    featured_image TEXT,

    status TEXT CHECK (status IN ('draft', 'published')) DEFAULT 'draft',

    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

CREATE UNIQUE INDEX idx_blog_slug ON blogs(slug);
CREATE INDEX idx_blog_status ON blogs(status);
CREATE INDEX idx_blog_published_created ON blogs(status, created_at DESC);

-- Postgres doesn’t auto-update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_hero_updated_at
BEFORE UPDATE ON hero_slides
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_updated_at
BEFORE UPDATE ON blogs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

