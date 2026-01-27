import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

console.log(process.env.GMAIL_HOST, process.env.GMAIL_USER, process.env.GMAIL_PASS);

export const transporter = nodemailer.createTransport({
	host: process.env.GMAIL_HOST, 
	port: 587,
	secure: false, 
	auth: {
		user: process.env.GMAIL_USER,
		pass: process.env.GMAIL_PASS,
	},
});