
DROP TABLE IF EXISTS menu_items_orders CASCADE;

CREATE TABLE menu_items_orders (
  id SERIAL PRIMARY KEY NOT NULL,
  order_id INTEGER references orders(id) NOT NULL,
  menu_item_id INTEGER references menu_items(id) NOT NULL,
  quantity SMALLINT

);
