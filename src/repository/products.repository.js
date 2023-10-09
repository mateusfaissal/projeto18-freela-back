import { db } from "../database/db.connection.js";

export function getAllProducts() {
    return db.query(`
    SELECT products.id, products."isActive",
    products.price, products.description,
    products.category, products.photo, users.name
    FROM products
    LEFT JOIN users
    ON users.id = products."userId"
    WHERE products."isActive" = true;
    `);
}

export function getProductsById(id) {
    return db.query(`
    SELECT products.id, products.price,
    products.name, products.category, products."isActive",
    products.description, products.photo,
    users.name AS "productsProvider", users.phone,
    users.email
    FROM products
    LEFT JOIN users
    ON users.id = products."userId"
    WHERE products.id = $1 and products."isActive" = true;
    `,[id])
}

export function getMyProducts(id) {
    return db.query(`
    SELECT products.id, products."isActive",
    products.price, products.name,
    products.photo, products.category, products.description,
    users.name
    FROM products
    LEFT JOIN users
    ON users.id = products."userId"
    WHERE products."userId" = $1;;
    `,[id])
}

export function createNewProduct(name, description, price, category, photo, isActive, id) {
    return db.query(`
    INSERT INTO products
        ( name, description, price, category, photo, "isActive", "userId")
    VALUES 
        ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id
    `,[name, description, price, category, photo, isActive, id]);
}

export function updateProductTrue(id) {
   return db.query(`UPDATE products SET "isActive"= false  WHERE id = $1;`,[id])
}

export function updateProductFalse(id) {
    return db.query(`UPDATE products SET "isActive"= true  WHERE id = $1;`,[id])
 }