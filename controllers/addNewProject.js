import { query } from "../database/index.js";

export const addNewProject = async (req, res) => {
    try {
        var newProject = req.body;
        var user_id = req.userId
        if (newProject.project_name.length === 0){
            res.status(400).json({ message: "Missing project name"});
            return
        }
        await query(`
        INSERT INTO projects (project_name, user_id, description)
        VALUES ($1, $2, $3)`,
        [newProject.project_name, user_id, newProject.description]
        )
        res.status(200).json({
            message: "New project created",
            data: {project:newProject.project_name, description: newProject.description}
        })
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error });
    }

}