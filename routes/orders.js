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

      // let obj = {
      //            burger: 2,
      //            fries: 3,
      //            pop: 4
      //           }

    // CHANGE THE USER ID TO COOKIES (REQ.SESSION?)
    let query = ` INSERT INTO orders (user_id) VALUES (1); `

    for (let key of Object.keys(req.body)) {
      console.log("key", key)
      query += `INSERT INTO menu_items_orders (menu_item_id, order_id, quantity) VALUES ((SELECT menu_items.id FROM menu_items JOIN menu_items_orders ON menu_items.id = menu_item_id GROUP BY menu_items.id HAVING menu_items.name = 'pop'), (SELECT id FROM orders ORDER BY id DESC LIMIT 1), ${req.body[key]});`
    }

    console.log(query);
    db.query(query)
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

    router.delete("/", (req, res) => {
    let query = `DELETE FROM orders WHERE orders.id = ${req.body.ordersId};`;

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

  return router;
}
