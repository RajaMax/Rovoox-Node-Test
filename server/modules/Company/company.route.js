import express from "express";
import CompanyController from "./company.controller";
let config = require('./../../../config/' + settings.environment + '.config').default;
import settings from '../../../settings';

const CompanyRouter = express.Router();

CompanyRouter.get('/companies', CompanyController.getCompany);
CompanyRouter.post('/company', CompanyController.createCompany);
CompanyRouter.get('/:companyId/employees',CompanyController.getEmployees);
CompanyRouter.post('/employee', CompanyController.createEmployee);


export default CompanyRouter;