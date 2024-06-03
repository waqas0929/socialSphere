import express from "express"
import search from "../services/searchService.js"


const searchRouter = express.Router()


searchRouter.get('/search', search)

export default searchRouter