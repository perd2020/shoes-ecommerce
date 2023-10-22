
const pintarCarrito =() => {
    modalContainer.innerHTML =" ";
    modalContainer.style.display ="block";
    
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";    
    modalHeader.innerHTML =
    `<h1 class="modal-header-title"> carrito</h1>`;
    modalContainer.append(modalHeader);

    const modalButton = document.createElement("h1");
    modalButton.innerText ="ocultar";
    modalButton.className = "modal-header-button";
    modalButton.addEventListener("click", () =>{
        modalContainer.style.display = "none";
    });

    modalHeader.append(modalButton);

    

    carrito.forEach((product) =>{
        let carritoContent = document.createElement("div");
        carritoContent.className ="modal-content";
        carritoContent.innerHTML =`
                        <img src="${product.img}">
                        <h3>${product.nombre}</h3>
                        <p>$ ${product.precio}</p>
                        
                        <p><span class ="sumar" > ➕ </span> Cantidad: ${product.cantidad} <span class ="restar" > ➖ </span></p>
                        
                        <p> Sub-Total: ${product.cantidad*product.precio} $</p>
                        <span class="delete-product"> borrar producto</span>
                        
        `;
        modalContainer.append(carritoContent);

        console.log(carrito.length);

        let restar = carritoContent.querySelector(".restar"); 

        restar.addEventListener("click", () => {
            if (product.cantidad !== 1){  
                product.cantidad--;
                saveLocal();  
                pintarCarrito();  
            }
        });

        let sumar = carritoContent.querySelector(".sumar");  

        sumar.addEventListener("click", () => {
            if (product.cantidad !== 100){  
                product.cantidad++;
                saveLocal(); 
                pintarCarrito(); 
            }
        });

        let eliminar = carritoContent.querySelector(".delete-product");
        eliminar.addEventListener("click", () => {
            eliminarProducto(product.id);
        })
    });

    
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    
    const totalBuying = document.createElement("div");
    totalBuying.className ="total-content";
    totalBuying.innerHTML =
    `total a pagar : ${total}`;
    modalContainer.append(totalBuying);
};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = (id) =>{  
    const foundId = carrito.find((element) => element.id === id);
    console.log("el producto a eliminar es "+foundId);

    carrito= carrito.filter((carritoId) => {  
        return carritoId !== foundId;
    });

    carritoCounter();
    saveLocal();
    pintarCarrito();
}

const carritoCounter =() =>{
    cantidadCarrito.style.display = "block";
    
    const carritoLength = carrito.length;

    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
    cantidadCarrito.innerText = carrito.length;
}