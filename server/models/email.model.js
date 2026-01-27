import { Schema, model } from 'mongoose';

const EmailSchema = Schema(
    {
        email: { type: String, required: true },
    },
    { timestamps: true },
);

export default model('Email', EmailSchema);