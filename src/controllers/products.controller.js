import { db } from "../database/db.connection.js";
import { getAllProducts, getMyProducts, getProductsById, createNewProduct, updateProductTrue, updateProductFalse } from "../repository/products.repository.js";

export async function showProducts(req, res) {
    try {
        const products = (await getAllProducts()).rows;
        res.status(200).send(products);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function showProductsById(req, res) {
    const { id } = req.params;

    try {
        const products = (await getProductsById(id)).rows;
        res.status(200).send(products[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function showMyProducts(req, res) {
    const { id } = res.locals.session;

    try {
        const myProducts = (await getMyProducts(id)).rows;
        res.status(200).send(myProducts);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function createProduct(req, res) {
    const { id } = res.locals.session;
    const { name, description, price, category, photo, isActive } = req.body

    try {
        const newProduct = await createNewProduct(name, description, price, category, photo, isActive, id)


        res.status(201).send("Produto registrado");
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function isActive(req,res){
	const { id } = req.params;

    try{
		const findProduct = await db.query(`SELECT * FROM products WHERE id = '${id}';`)
		if(findProduct.rows.length === 0 ) return res.status(409).send("Produto não encontrado")
		
		if(findProduct.rows[0].isActive === true){
			await updateProductTrue(id);
		}else{
			await updateProductFalse(id);
		}

		res.sendStatus(200)
	} catch (err) {
		res.status(500).send(err.message)
	}
	
}
