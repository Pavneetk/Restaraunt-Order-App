const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    let query = `SELECT orders.id, name, phone_number, CURRENT_TIMESTAMP - date AS time_in_queue FROM orders JOIN users ON users.id = user_id;`;
    console.log(query);
    db.query(query)
      .then(data => {
        const orders = data.rows;
        res.json({ orders });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });

  router.post("/", (req, res) => {




    let query = ` INSERT INTO orders (user_id) VALUES (1);
                  INSERT INTO menu_items_orders (menu_item_id, order_id, quantity) VALUES ($1, (SELECT id FROM orders ORDER BY id DESC LIMIT 1), $2)`;
    console.log(query);
    db.query(query, [req.body.menuItemId, req.body.quantity])
      .then(data => {
        const addToOrder = data.rows;
        res.json({ addToOrder });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
}
