import userModel from '../models/Contact.js';

export const registerController = async (req, res) => {
    try {
        const { name,last, email,number, message } = req.body
        if (!name || !email ||  !number ||   !message) {
            return res.send({ message: "Details are not filled" })
        }

        const useersave = await new userModel({ name,last, email,number,message , }).save()
        res.status(201).send({ success: true, message: "Thank You", useersave })

    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Internal Server Error" })
    }
}


// to edit
