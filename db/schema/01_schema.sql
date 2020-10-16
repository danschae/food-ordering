-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS foods CASCADE;
DROP TABLE IF EXISTS food_carts CASCADE;
DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(32) NOT NULL,
  address VARCHAR(255) DEFAULT NULL,
  postal_code VARCHAR(255) DEFAULT NULL
);


CREATE TABLE foods (
  id SERIAL PRIMARY KEY NOT NULL,
  food_picture_url VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  price_cents INTEGER NOT NULL,
  type VARCHAR(255)
);

CREATE TABLE food_carts (
  id SERIAL PRIMARY KEY NOT NULL,
  food_id INTEGER REFERENCES foods(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  order_completed BOOLEAN DEFAULT FALSE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

