const Joi = require('joi')

const { createAppointment, checkAppointmentByEmail} = require('../models/query')

const booking = (req, res) => {

    const schema = Joi.object({

        name: Joi.string().min(3).required(),
        location: Joi.string().min(3).required(),
        time: Joi.string().min(3).required(),
        messages: Joi.string().min(3).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
       
     })
       
    
    //error == undefined is input is valid
   



    // const { name, email, location, time, messages } = req.body
    
    // if (!name || !email || !location || !time || !messages) {
        
    //     res.status(400).json({
    //         status:false,
    //         message: "All fields required"
    //     })
    // }

    try {

        const { error, value } = schema.validate(req.body)
    
        if (error != undefined) {
    
            throw new Error(error.details[0].message)
        }
      
          const { name, email, location, time, messages } = req.body

        checkAppointmentByEmail(email)
        .then(responseFromCheckEmail => {
            if (responseFromCheckEmail.length > 0) {
               throw new Error("You booked already.Booking is on a weekly basis")
            }

            return createAppointment(name, email, location, time, messages)
           
         })
        .then(appointmentResult => {
                
            res.status(201).json({
                status:true,
                message: "Appointment booked"
            })

        })
        .catch(error => {
            console.log(error.message)
            res.status(400).json({
                status:false,
                message: error.message
            })
        })


    
} catch (error) {
    
        res.status(400).json({
            status : false,
            message: error.message
        })
}
   





   




}



module.exports  =  { booking }