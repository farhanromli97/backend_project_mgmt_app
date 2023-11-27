import pkg from "pg";
import { usersTable } from "../models/user.model.js";
import { projectsTable } from "../models/project.model.js";
import { itemsTable } from "../models/item.model.js";
const {Pool} = pkg;


const config = {
    host: "db.cxsqlpmmmzlthsvvexcq.supabase.co",
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: "PecPqrtlnlWIEh4j",
};

const pool = new Pool(config);

export const dbInit = async () => {
    try {
        const result = await pool.query("Select NOW()")
        console.log("Database connected", result.rows[0].now)
        await usersTable()
        await projectsTable()
        await itemsTable()
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

export const query = async (text, params) => {
    const start = Date.now()
    const res = await pool.query(text, params)
    const duration = Date.now() - start
    console.log('executed query', {text, duration, rows:res.rowCount})
    return res
}