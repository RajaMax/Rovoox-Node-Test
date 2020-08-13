import CompanyModel from "./company.model";
import EmployeeModel from "./employee.model";

const fs = require('fs');
var mongoose = require('mongoose');
import settings from '../../../settings';
let config = require('./../../../config/' + settings.environment + '.config').default;
const jwt = require('jsonwebtoken');
const CompanyService = {
    getCompanies: async () => {
    try {
      const Company = await CompanyModel.find({ });
      return Company;
    } catch (error) {
      console.log(error)
      throw error;
    }
  },
  getCompanyByName: async (name) => {
    try {
      const Company = await CompanyModel.find({name:name });
      return Company;
    } catch (error) {
      console.log(error)
      throw error;
    }
  },
  createCompany: async (obj) => {
    try {
      var company = await new CompanyModel(obj).save();
      return company;
    } catch (error) {
      console.log(error)
      throw error;
    }
  },
  getEmployees: async (companyId) => {
    try {
      const employees = await EmployeeModel.find({company_id:companyId});
      return employees;
    } catch (error) {
      console.log(error)
      throw error;
    }
  },
  createEmployee: async (obj) => {
    try {
      var employee = await new EmployeeModel(obj).save();
      return employee;
    } catch (error) {
      console.log(error)
      throw error;
    }
  },
};
export default CompanyService;