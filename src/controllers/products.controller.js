import { db } from "../database/db.connection.js";

export async function showProducts(req, res) {
    try {
        const products = (await db.query(`
        SELECT products.id, products."isActive",
        products.price, products.description,
        products.category, products.photo, users.name
        FROM products
        LEFT JOIN users
        ON users.id = products."userId"
        WHERE products."isActive" = true;
        `)).rows;
        res.status(200).send(products);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function showProductsById(req, res) {
    const { id } = req.params;

    try {
        const products = (await db.query(`
        SELECT products.id, products.price,
        products.name, products.category, products."isActive",
        products.description, products.photo,
        users.name AS "productsProvider", users.phone,
        users.email
        FROM products
        LEFT JOIN users
        ON users.id = products."userId"
        WHERE products.id = $1 and products."isActive" = true;
        `,[id])).rows;
        res.status(200).send(products[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function showMyProducts(req, res) {
    const { id } = res.locals.session;

    try {
        const myProducts = (await db.query(`
        SELECT products.id, products."isActive",
        products.price, products.name,
        products.photo, products.category, products.description,
        users.name
        FROM products
        LEFT JOIN users
        ON users.id = products."userId"
        WHERE products."userId" = $1;;
        `,[id])).rows;
        res.status(200).send(myProducts);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function createProduct(req, res) {
    const { id } = res.locals.session;
    const { name, description, price, category, photo, isActive } = req.body

    try {
        const newProduct = await db.query(`
        INSERT INTO products
            ( name, description, price, category, photo, "isActive", "userId")
        VALUES 
            ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id
        `,[name, description, price, category, photo, isActive, id]);


        res.status(201).send("Produto registrado");
    } catch (err) {
        res.status(500).send(err.message);
    }
}
