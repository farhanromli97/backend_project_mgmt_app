import { query } from "../database/index.js";


export const projectsTable = async () => {
    try {
        await query(`CREATE TABLE IF NOT EXISTS projects (
            id SERIAL PRIMARY KEY,
            project_name VARCHAR(255) NOT NULL UNIQUE,
            user_id INT NOT NULL,
            description TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT fk_users FOREIGN KEY(user_id) REFERENCES users(id)
        );`); 
        console.log("projects table created") 
    } catch (error) {
        console.log(error)
    }
}