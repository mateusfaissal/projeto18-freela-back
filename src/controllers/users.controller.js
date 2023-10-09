import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { db } from "../database/db.connection.js";
import { getUserByEmail, createUser, loginUser, getToken } from "../repository/user.repository.js";


export async function signUp(req, res) {
    const { name, email, password, phone, cpf} = req.body

    const hash = bcrypt.hashSync(password, 10);

    try {
        if (isNaN(phone)) return res.status(404).send("Insira um telefone válido");

        const userexist = await getUserByEmail(email);
        if (userexist.rows.length > 0) return res.status(409).send("Esse email já está cadastrado");

        const newUser = await createUser(name, email, hash, phone, cpf);

        res.status(201).send("Cadastro feito com sucesso");
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function signIn(req, res) {
    const { email, password } = req.body;
    const token = uuid();


    try {
        const user = (await loginUser(email)).rows[0];

        const verifyPassword = bcrypt.compareSync(password, user.password);
        if (!verifyPassword) { return res.status(401).send("Senha incorreta") };

        if (!user) {
            return res.status(401).send("Email incorreto")
        }

        if (user.token === null) {
            await db.query(`
            INSERT INTO sessions 
                ("userId", token)
            VALUES 
                ($1, $2)
            `,[user.id, token])
            return res.send(token)
        }

        res.send(user.token);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function isLogged(req, res) {
    const { token } = req.body;

    try {
        const user = (await getToken(token)).rows[0];

        if (!user) {
            return res.status(401).send("Token incorreto")
        }

        res.send(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
}