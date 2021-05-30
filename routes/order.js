const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    let query = `SELECT menu_items.name, quantity FROM menu_items_orders JOIN menu_items ON menu_items.id = menu_item_id WHERE order_id = $1;`
    console.log(query);
    db.query(query, [req.params.id])
      .then(data => {
        const order = data.rows;
        res.json({ order });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });



  return router;
};
