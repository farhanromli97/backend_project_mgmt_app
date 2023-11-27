import { query } from "../database/index.js";

const updateNextStatus = async (req, res) => {
    const item_id = req.params.id;
    try {
        const data = await query("SELECT status FROM items where id = $1", [item_id])
        if(data.rowCount === 0){
            res.status(400).json({message:"Item does not exist"})
            return
        }
        if(data.rows[0].status === 'New'){
            await query("UPDATE items SET status = 'In Progress' where id = $1", [item_id])
            res.status(200).json({message: "Record updated to In Progress"})
        }else if(data.rows[0].status === 'In Progress'){
            await query("UPDATE items SET status = 'Done' where id = $1", [item_id])
            res.status(200).json({message: "Record updated to Done"})
        }else{
            res.status(400).json({message:"Invalid status"})
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error });
    }

}

const updatePrevStatus = async (req, res) => {
    const item_id = req.params.id;
    try {
        const data = await query("SELECT status FROM items where id = $1", [item_id])
        if(data.rowCount === 0){
            res.status(400).json({message:"Item does not exist"})
            return
        }
        if(data.rows[0].status === 'Done'){
            await query("UPDATE items SET status = 'In Progress' where id = $1", [item_id])
            res.status(200).json({message: "Record updated to In Progress"})
        }else if(data.rows[0].status === 'In Progress'){
            await query("UPDATE items SET status = 'New' where id = $1", [item_id])
            res.status(200).json({message: "Record updated to New"})
        }else{
            res.status(400).json({message:"Invalid status"})
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error });
    }

}

const updateItemStatus = {updateNextStatus, updatePrevStatus}

export default updateItemStatus