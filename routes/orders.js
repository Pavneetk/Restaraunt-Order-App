const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    let query = `SELECT orders.id, name, phone_number, CURRENT_TIMESTAMP - date AS time_in_queue, status FROM orders JOIN users ON users.id = user_id;`;
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

      //let query = `DELETE FROM orders WHERE orders.id = $1;`;
      let query = `DELETE FROM orders WHERE orders.id = $1`;

      //db.query(query, [req.body.ordersId])
      db.query(query, [req.body.ordersId])
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
