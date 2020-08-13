import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CompanySchema = mongoose.Schema({
    name: {
        type: String
    },
    address: {
        type: String,
    },
    type:{
        type:String,
    }
}, {
    collection: 'company',
    timestamps: true
});

let CompanyModel = mongoose.model('company', CompanySchema);

export default CompanyModel