import { query } from "../database/index.js";

export const listItems = async (req, res) => {
    try {
        var project_id = req.params.id;
        const data = await query('Select * from items where project_id = $1',[project_id])
        res.status(200).json({
            message: "Items retrieved",
            data: data.rows,
        })
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error });
    }

}