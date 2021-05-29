
DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  menu_items_order_id INTEGER references menu_items_orders(id) NOT NULL,
  user_id INTEGER references users(id) NOT NULL,
  date TIMESTAMP NOT NULL

);
