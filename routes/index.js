import { Router } from "express";
import { addNewProject } from "../controllers/addNewProject.js";
import { listProjects } from "../controllers/listProjects.js";
import { addNewItem } from "../controllers/addNewItem.js";
import { listItems } from "../controllers/listItems.js";
import updateItemStatus from "../controllers/updateItemStatus.js";
import auth from "../controllers/auth.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const appRoutes = Router()

// Registration and login routes
appRoutes.post("/register", auth.register)
appRoutes.post("/login", auth.login)


// Protected routes
appRoutes.get("/projects", isAuthenticated,listProjects)
appRoutes.get("/items/:id", isAuthenticated, listItems)


appRoutes.post("/project", isAuthenticated, addNewProject)
appRoutes.post("/item", isAuthenticated,addNewItem)

appRoutes.patch("/item/nextstatus/:id", isAuthenticated, updateItemStatus.updateNextStatus)
appRoutes.patch("/item/prevstatus/:id", isAuthenticated, updateItemStatus.updatePrevStatus)


export default appRoutes