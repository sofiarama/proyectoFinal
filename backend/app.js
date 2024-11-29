const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;

const users = []; // Simula una base de datos para usuarios
const secretKey = "mi_secreto_super_seguro";

app.use(cors());
app.use(express.json());

// Endpoint para registro
app.post("/register", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ message: "Faltan datos: email y contraseña." });
    }

    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
        return res.status(409).send({ message: "El usuario ya está registrado." });
    }

    users.push({ email, password });
    res.status(201).send({ message: "Usuario registrado con éxito." });
});

// Endpoint para login
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ message: "Faltan datos: email y contraseña." });
    }

    const user = users.find((user) => user.email === email && user.password === password);
    if (!user) {
        return res.status(401).send({ message: "Usuario o contraseña incorrectos." });
    }

    const token = jwt.sign({ email }, secretKey, { expiresIn: "1h" });
    res.status(200).send({ token, message: "Inicio de sesión exitoso." });
});

// Endpoint para validar el token
app.post("/validateToken", (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        console.log("No se proporcionó un token.");
        return res.status(401).json({ valid: false, message: "No token provided." });
    }

    const token = authHeader.split(" ")[1];
    console.log("Token recibido en validateToken:", token);

    try {
        const decoded = jwt.verify(token, secretKey);
        res.status(200).json({ valid: true, email: decoded.email });
    } catch (error) {
        console.error("Error al verificar el token:", error.message);
        res.status(401).json({ valid: false, message: "Invalid or expired token." });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});







