import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
    allowExitOnIdle: true,
});

export const getPosts = async () => {
    const { rows } = await pool.query("SELECT * FROM posts");
    return rows;
};

export const getPost = async (id) => {
    const text = "SELECT * FROM posts WHERE id = $1";
    const { rows } = await pool.query(text, [id])
    if (rows.length === 0) {
        throw { code: "404" };
    }
    return rows[0];

}

export const createPost = async ({ titulo, img, descripcion }) => {
    if (!titulo || !img || !descripcion) {
        throw { code: "400" };
    }
    const text = "INSERT INTO posts (titulo, img, descripcion, likes) values ($1, $2, $3, 0) RETURNING *";
    const { rows } = await pool.query(text, [titulo, img, descripcion]);
    return rows[0];
};

