const express = require('express');
const router  = express.Router();
const {sendText} = require("../helpers/sms_helpers")



module.exports = ({getOrders, getFoodItems, getFoodItemsById, updateMenuItem, deleteFoodItem, completeOrder, getPhoneNumberById}) => {

router.get("/login", (req, res) => {
  res.render("admin_login")
});

router.get("/main_page", (req, res) => {
  getOrders()
  .then(orders => {
    res.render("admin", {orders, page: "admin"})
  })
  .catch(err => console.log(err))
});


router.get("/edit_menu", (req, res) => {
  getFoodItems()
  .then(items => {
    res.render("edit_menu", {items, page: "edit_menu"})
  })
});

router.get("/edit_menu/:id/edit", (req, res) => {
  const foodID = req.params.id;
  if (req.session.isAuthenticated) {
  getFoodItemsById(foodID)
  .then(item => {
    res.render("edit_foodInfo", {item, page: "edit_foodInfo"})
  })
}
})

router.post("/login", (req, res) => {
  if (req.body.password === "food") {
    req.session.isAuthenticated = true;
    res.redirect("/admin/main_page")
  } else {
  res.redirect("/admin/login")
  }
});

router.post("/logout", (req, res) => {
  req.session.isAuthenticated = false;
  res.redirect("/admin/login")
})


router.post("/edit_menu/:id/delete", (req, res) => {
  const foodID = req.params.id;
  if (req.session.isAuthenticated) {
  deleteFoodItem(foodID)
  .then(res.redirect("/admin/edit_menu"))
  }
});

router.post("/edit_menu/:id/edit", (req, res) => {
  const foodID = req.params.id;
  const queryParams = [req.body.title, req.body.picture, req.body.price, req.body.type];
  if (req.session.isAuthenticated) {
  updateMenuItem(foodID, queryParams)
  .then(res.redirect("/admin/edit_menu"))
  }
})

router.post("/confirm", (req, res) => {
  const ID = req.body.orderID;
  const minutes = req.body.minutes;

  const message = `
  Hi! Your order has been confirmed! It will be ready in ${minutes} minutes!
  `
  if (req.session.isAuthenticated) {
  getPhoneNumberById(ID)
  .then(resolve => {sendText(message, resolve[0].phone)})
  completeOrder(ID)
  .then(() => {
    res.redirect("/admin/main_page")})
  }
});

return router
}
