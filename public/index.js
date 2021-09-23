const socket = io();

socket.on("productos", (data) => {
    console.log('dataindesjs',data);
  render(data);
});

let render = (data) => {
  if (data.length > 0) {
    let html = `
    <div class="container">
        <table class="table">
        <legend>Lista de Producto</legend>
        <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">nombre</th>
          <th scope="col">Precio</th>
          <th scope="col">Foto</th>
        </tr>
      </thead>
      <tbody>
      ${data
        .map(
          (p) => `<tr>
            <th scope="row">${p.id}</th>
            <td>${p.title}</td>
            <td>${p.price}</td>
            <td>${p.thumbnail}</td>
          </tr>`
        )
        .join(" ")}
      </tbody>
    </table>
    </div>`;
    document.getElementById("listProducts").innerHTML = html;
  }else{
    let html = `
    <div>
    <h2>No hay productos cargados</h2>
    </div>`;
    document.getElementById("listProducts").innerHTML = html;
  }
};

function addProduct(form){
    let newProduct = {
      title: document.getElementById("titleProduct").value,
      price: document.getElementById("pricesProduct").value,
      thumbnail: document.getElementById("thumbnailProduct").value,
    };
     socket.emit("newProduct", newProduct);
     return false;
}
