import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
    allowExitOnIdle: true,
});

const debug = (result) => {
    console.log("---------------------------------------------------------------")
    console.log("Objeto devuelto de la consulta: ", result)
    console.log("Instrucción procesada: ", result.command)
    console.log("Filas procesadas: ", result.rowCount)
    console.log("Información ingresada: ", result.rows[0])
    console.log("----------------------------------------------------------------")
}

export const getPosts = async () => {
    try {
        const result = await pool.query("SELECT * FROM posts");
        debug(result)
        return result.rows;
    } catch (error) {
        console.log(error)
        throw error
    }
};

export const getPost = async (id) => {
    try {
        const text = "SELECT * FROM posts WHERE id = $1";
        const result = await pool.query(text, [id]);
        debug(result);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


export const createPost = async ({ titulo, img, descripcion }) => {
    try {
        const text = "INSERT INTO posts (titulo, img, descripcion, likes) values ($1, $2, $3, 0) RETURNING *";
        const result = await pool.query(text, [titulo, img, descripcion]);
        debug(result)
        return result.rows[0];
    } catch (error) {
        console.log(error)
        throw error
    }
}

