import { Schema, model, connect, SchemaTimestampsConfig } from 'mongoose';

interface Bank {
    bankNamme: string,
    bankAddress: string,
    bankContact: string,
    bankAPIPoint: string,
    bankUserName: string,
    bankPassword: string,
    bankCardDigit: Number
}


const BankSchema = new Schema<Bank>({
    bankNamme: { type: String, required: true },
    bankAddress: { type: String, required: true },
    bankContact: String,
    bankAPIPoint: { type: String, required: true },
    bankUserName: { type: String, required: true },
    bankPassword: { type: String, required: true },
    bankCardDigit: Number
}, { timestamps: true });


const BankModel = model<Bank>('Bank', BankSchema);

export default BankModel

