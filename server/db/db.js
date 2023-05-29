import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
    allowExitOnIdle: true,
});

const debug = (result) => {
    console.log("---------------------------------------------------------------")
    console.log("Objeto devuelto de la consulta: ", result)
    console.log("Instruccion procesada: ", result.command)
    console.log("Filas procesadas: ", result.rowCount)
    console.log("Informacion ingresada: ", result.rows[0])
    console.log("----------------------------------------------------------------")
}

export const getPosts = async () => {
    const result = await pool.query("SELECT * FROM posts");
    debug(result)
    return result.rows;
};

export const getPost = async (id) => {
    if (!id.trim()) {
        throw { code: "402" };
    }
    const text = "SELECT * FROM posts WHERE id = $1";
    const result = await pool.query(text, [id])
    if (result.rows.length === 0) {
        throw { code: "404" };
    }
    debug(result)
    return result.rows[0];
}

export const createPost = async ({ titulo, img, descripcion }) => {
    if (!titulo || !img || !descripcion) {
        throw { code: "400" };
    }
    const text = "INSERT INTO posts (titulo, img, descripcion, likes) values ($1, $2, $3, 0) RETURNING *";
    const result = await pool.query(text, [titulo, img, descripcion]);
    debug(result)
    return result.rows[0];
};

