import { Schema, model, connect, SchemaTimestampsConfig } from 'mongoose';

interface Transaction {
    merchantObjectId: string;
    apiClientId: string;
    card: Card;
    marchant: Marchant;
    amount: string;
    status: string;
    reason: string;
    narrative: string;
}

interface Card {
    cardHolderName: string,
    cardNumber: string,
    expiryDate: string,
    cvc: string
}

interface Marchant {
    marchantId: string,
    marchantName: string,
    bankName: string,
    bankAddress: string,
    accountNumber: string,
    iban: string
}

const CardSchema = new Schema<Card>({
    cardHolderName: { type: String, required: true },
    cardNumber: { type: String, required: true },
    expiryDate: String,
    cvc: { type: String }
});


const MarchantSchema = new Schema<Marchant>({
    marchantId: { type: String, required: true },
    marchantName: { type: String, required: true },
    bankName: { type: String, required: true },
    bankAddress: String,
    accountNumber: { type: String },
    iban: { type: String }
});


const TransactionSchema = new Schema<Transaction>({
    merchantObjectId: { type: String, required: true },
    apiClientId: { type: String, required: true },
    card: { type: CardSchema, required: true },
    marchant: { type: MarchantSchema, required: true },
    amount: { type: String, required: true },
    status: { type: String, required: true },
    reason: String,
    narrative: { type: String }
}, { timestamps: true });

const TransactionModel = model<Transaction>('Transaction', TransactionSchema);

export default TransactionModel