import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const EmployeeSchema = mongoose.Schema({
    company_id:{
        type:String
    },
    name: {
        type: String
    },
    image:{
        type:String
    },
    address: {
        type: String,
    },
    phone_number:{
        type:String,
    }
}, {
    collection: 'employee',
    timestamps: true
});

let EmployeeModel = mongoose.model('employee', EmployeeSchema);

export default EmployeeModel