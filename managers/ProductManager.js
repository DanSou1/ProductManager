import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { error } from 'console';
import { type } from 'os';
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
    updateProduct(ide, titulo, descripcion, precio, link, codigo, disponible)
    {
        let objeto = [ide, titulo, descripcion, precio, link, codigo, disponible];
        const identificador = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
        const info = identificador.find(objeto => objeto.id === ide);
        let a = [info.id, info.title, info.description, info.price, info.thumbmail, info.code, info.stock];
        for(let i in a)
        {
            if (i >=1) 
            {
                if (objeto[i] != '' && objeto[i] != undefined ) 
                {
                    a[i] = objeto[i];
                }
            }
        }
        const objet = 
        {
            id: a[0],
            title: a[1],
            description: a[2],
            price: a[3],
            thumbmail: a[4],
            code: a[5],
            stock: a[6]
        };
        info.title = objet.title;
        info.description = objet.description;
        info.price = objet.price;
        info.thumbmail = objet.thumbmail;
        info.code = objet.code;
        info.stock = objet.stock;
        let jsonNuevo = JSON.stringify(identificador, null, 2);
        fs.writeFileSync(`${this.path}`, jsonNuevo);
    }
}