const routes = require("express").Router()

routes.use("/user", require("./user"));
routes.use("/article", require("./article"));
routes.use("/comment", require("./comment"));

// 404
routes.use((req, res) => {
  res.status(404).json({
    message: "Page not found."
  })
})

module.exports = routes