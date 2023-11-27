import { query } from "../database/index.js";

export const listProjects = async (req, res) => {
    try {
        var user_id = req.userId;
        const data = await query('Select * from projects where user_id = $1',[user_id])
        res.status(200).json({
            message: "Projects retrieved",
            data: data.rows,
        })
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error });
    }

}