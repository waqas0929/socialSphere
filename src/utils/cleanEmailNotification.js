import { Op } from "sequelize"
import emailModel from "../models/emailModel.js"


const cleanEmailNotification = async() => {
    const twentyFourHourAgo = new Date(ate.now() - 24 * 60 * 60 * 1000)

    try{
        await emailModel.destroy({
            where:{
                createdAt:{
                    [Op.lt]: twentyFourHourAgo
                }
            }
        })
        console.log('Old email notification deleted successfully')

    }catch(error){
        console.error('Error deleting old email notification')
    }
}

export default cleanEmailNotification