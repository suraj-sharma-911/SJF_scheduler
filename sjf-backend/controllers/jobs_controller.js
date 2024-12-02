const jobsModel = require('../models/job_service');

exports.getAllJobs = async (req, res) => {
    try {
        const data = jobsModel.getAllJobs();
        return res.status(200).json({
            status: "success",
            message: "",
            statusCode: 200,
            data: data
        })
    } catch (err) {
        return res.status(400).json({
            status: "success",
            statusCode: 200,
            data: err,
        });
    }
};


// exports.getAllJobs = async (req, res) => {
//     const { ticketId } = req.params;
//     const data = req.body;

//     try {
//         if (isNaN(ticketId) || typeof parseInt(ticketId) !== 'number') {
//             throw new Error("Enter valid ticketId")
//         } else {
//             const responseData = await jobsModel.getAllJobs(req.db, ticketId, data);
//             return res.status(200).json({
//                 status: "success",
//                 message: responseData.length > 0 ? "success" : "No data found",
//                 statusCode: 200,
//                 data: responseData,
//             });
//         }

//     } catch (err) {
//         console.log(err)
//         return res.status(400).json({
//             status: "success",
//             statusCode: 200,
//             data: err,
//         });
//     }
// };