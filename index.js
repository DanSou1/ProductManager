import ProductManager from "./managers/ProductManager.js";
const producto = new ProductManager('./folders/productos.json');
//Agrego productos
/* producto.addProduct("Mouse Gamer","Raton para video juegos.",48000,"google.com","01","3");
producto.addProduct("Boar","AMD Radeon.",439000,"google.com","02","1"); */
//Ver productos agregados
/* producto.getProducts(); */
//Ver un producto en especifico
/* producto.getProductById("9fd8b81d-a0b1-42da-9220-99971b437278"); */
//Editar producto
producto.updateProduct("9fd8b81d-a0b1-42da-9220-99971b437278", 'Ancheta Gamer','', undefined,'youtube.com', '010101', undefined);