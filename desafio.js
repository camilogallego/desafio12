const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const PORT = 8080;
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);
app.use(express.static("./public"));

server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
server.on("error", (error) => console.log("Error en servidor", error));

app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
  })
);

app.set("views", "./views");
app.set("view engine", "hbs");

class Producto {
  constructor(title, price, thumbnail,) {
    this.title = title, 
    this.price = price, 
    this.thumbnail = thumbnail;
    this.id = productos.length + 1;
  }
}
const productos = [];

router.get("/", (req, res) => {
  res.status(201).render("main", { productos, listExists: true });
});


io.on("connection", (socket) => {
  console.log("nuevo cliente coencetado");
  socket.emit("productos", productos);
  socket.on("newProduct", (data) => {
    console.log('datadesafio',data);
    productos.push({id:productos.length + 1,...data} );
    io.sockets.emit("productos", productos);
  });
});


