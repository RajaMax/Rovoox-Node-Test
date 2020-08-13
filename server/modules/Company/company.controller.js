import CompanyService from "./company.service";
import settings from '../../../settings';
let config = require('./../../../config/' + settings.environment + '.config').default;
let mkdirp = require('mkdirp');


const CompanyController = {
    getCompany: async (req, res) => {
        try {
            const company = await CompanyService.getCompanies();
            res.status(200).send(company);
        } catch (error) {
            res.status(400).send({
                error: 'server error'
            });
        }
    },
    createCompany: async (req, res) => {
        try {
            let name = req.body.name;
            console.log(req.body)
            if (name) {
                const company = await CompanyService.getCompanyByName(name);
                if (company.length > 0) {
                    res.status(500).send({
                        error: 'Company is already here'
                    });
                } else {
                    var obj = {
                        name: req.body.name,
                        address: req.body.address,
                        type: req.body.type
                    }
                    const token = await CompanyService.createCompany(obj);
                    res.status(200).send({
                        token: token
                    });
                }
            } else {
                return res.status(500).send({
                    error: 'Company Name is Required'
                });
            }

        } catch (error) {
            console.log(error)
            res.status(400).send({
                error: 'server error'
            });
        }
    },
    getEmployees: async (req, res) => {
        try {
            var companyId = req.params.companyId;
            const employees = await CompanyService.getEmployees(companyId);
            res.status(200).send(employees);
        } catch (error) {
            res.status(400).send({
                error: 'server error'
            });
        }
    },
    createEmployee: async (req, res) => {
        try {
            var profileImage = ''
            console.log(req.files)
            if (req.files && req.files.profile) {

                let imageFile = req.files.profile;
                console.log(imageFile)
                if (imageFile) {

                    let extension = imageFile.mimetype.split("/")[1];

                    let filePath = __dirname + "/profile_image" + "/";
                    let file_name = Date.now() + '.' + extension;
                    console.log(file_name)
                    profileImage ="/profile_image" + "/" + file_name;
                    console.log(profileImage)

                    await moveFile(imageFile, filePath, file_name)
                        .catch((error) => {
                            console.log(error)
                            res.status(400).send({
                                error: 'server error'
                            });
                        });

                } else {
                    console.log('no file')
                }
            }
            if (!profileImage) {
                console.log('noooo')
                res.status(500).send({
                    error: 'Please add profile image'
                });
            }
            var bodyData = req.body;
            bodyData.image = profileImage;
            console.log(bodyData)
            const employees = await CompanyService.createEmployee(bodyData);
            res.status(200).send(employees);
        } catch (error) {
            console.log(error)
            res.status(400).send({
                error: 'server error'
            });
        }
    }
};
let moveFile = async (media_file, filePath, file_name) => {
    console.log("move file")
    console.log(media_file) 
    console.log(filePath)
    console.log(file_name)
    return await new Promise((resolve, reject) => {
        media_file.mv('./profile_image/' + file_name, function (err) {
            if (err) {
                console.log(err);
                reject({
                    code: 400,
                    status: "error",
                    message: "Error in Uploading file",
                    data: []
                });
            } else {
                console.log("File Moved")
                resolve({
                    code: 200,
                    status: "success",
                    message: "Uploaded Successfully",
                    data: []
                })
            }
        });
    });
}
export default CompanyController;