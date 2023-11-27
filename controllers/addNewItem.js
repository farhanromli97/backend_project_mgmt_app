import { query } from "../database/index.js";

export const addNewItem = async (req, res) => {
    try {
        var newItem = req.body;
        await query(`
        INSERT INTO items (item, project_id)
        VALUES ($1, $2)`,
        [newItem.item, newItem.project_id]
        )
        res.status(200).json({
            message: `New item created for project with id=${newItem.project_id}`,
            data: {item:newItem.item}
        })
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error });
    }

}