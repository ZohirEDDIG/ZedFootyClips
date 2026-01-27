import Email from '../models/email.model.js';
import { transporter } from '../utils/mailer.js';

export async function addEmail(req, res) {
    try {
        const { email } = req.body;

        if (!email) return res.status(400).json({ message: 'Email is required' });
        
        const isEmailExists = await Email.find({ email });
        if (isEmailExists) {
            return res.status(400).json({ message: 'You already subscribed to our newsletter' })
        }

        const newEmail = await Email.create({ email });

        await transporter.sendMail({
        from: 'ZedFootyClips',
        to: email,
        subject: 'Welcome to Our Newsletter!',
        html: `
            <h1>Welcome!</h1>
            <p>Thanks for subscribing to ZedFootyClips newsletter. We’ll keep you updated with the latest clips!</p>
        `,
        });

        res.status(200).json({ message: 'Email added and welcome email sent!' });
    } catch (error) {
        console.error('Failed to add email:', error);
        res.status(500).json({ error: 'Failed to add email' });
    }
}