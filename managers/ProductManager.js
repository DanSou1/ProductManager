import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { error } from 'console';
export default class ProductManager
{
    constructor(path)
    {
        this.path = path;
        this.products = [];
        this.id = 1;
    }
    async getProducts() 
    {
        try
        {
            const productos = await fs.promises.readFile(this.path, 'utf-8');
            console.log('Sus productos son: \n' + productos);
            return this.products;
        }
        catch (err) 
        {
        console.error('Error al leer el archivo: ' + err);
        }
    }
    async addProduct (titulo,descripcion, precio, link, codigo, disponible)
    {
        const ide = uuidv4();
        const objet = 
        {
            id: ide,
            title: titulo,
            description: descripcion,
            price: precio,
            thumbmail: link,
            code: codigo,
            stock: disponible
        }
        try 
        {
            if (titulo === '' || descripcion === '' || precio === '' || link === '' || disponible === '' || codigo === '') 
            {
                console.log('Su producto no puede ser cargado');
            } 
            else
            {
                this.products.push(objet);
                const information = JSON.stringify(this.products, null, 2);
                fs.writeFileSync(`${this.path}`, information);
                console.log('Su archivo subió con exito.');
            } 
        }
        catch (error)
        {
            console.warn(error + ' Error al agregar el producto.')
        }
    }
    getProductById(ide) {
        try 
        {
            const identificador = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
            const info = identificador.find(objeto => objeto.id === ide);
            if (info)
            {
                console.log(info);
            }
            else
            {
                console.log('Objeto no encontrado.');
            }
        }
        catch (error) 
        {
            console.log('Error al obtener el producto:', error);
        }
    }
    updateProduct(ide){
        const identificador = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
        const info = identificador.find(objeto => objeto.id === ide);
    }
}


