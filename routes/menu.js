/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM menu_items`;
    console.log(query);
    db.query(query)
      .then(data => {
        const menu = data.rows;
        res.json({ menu });
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
    let query = ` INSERT INTO menu_items (name, price, thumbnail_picture_url, description, category) VALUES ($1, $2, $3, $4, $5);`

    console.log(query);
    db.query(query, [req.body.name, req.body.price, req.body.thumbnailPictureUrl, req.body.description, req.body.category])
      .then(data => {
        const addToMenu = data.rows;
        res.json({ addToMenu });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
/*
  router.put("/", (req, res) => {


    let query = `DELETE FROM menu_items WHERE menu_items.id = ${req.body.menuItemId};`;


    console.log(req.body);
    db.query(query)
      .then(data => {
        const menu_items = data.rows;
        res.json({ menu_items });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });
*/
  router.delete("/", (req, res) => {
    let query = `DELETE FROM menu_items WHERE menu_items.id = ${req.body.menuItemId};`;
    console.log(req.body);
    db.query(query)
      .then(data => {
        const menu_items = data.rows;
        res.json({ menu_items });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });
  return router;

};
