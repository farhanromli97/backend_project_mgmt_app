import { query } from "../database/index.js";


export const itemsTable = async () => {
    try {
        await query(`CREATE TABLE IF NOT EXISTS items (
            id SERIAL PRIMARY KEY,
            item TEXT NOT NULL,
            project_id INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            status VARCHAR(15) DEFAULT 'New' NOT NULL,
            CONSTRAINT fk_projects FOREIGN KEY(project_id) REFERENCES projects(id)
        );`); 
        console.log("items table created") 
    } catch (error) {
        console.log(error)
    }
}