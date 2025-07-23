import { RequestHandler } from "express";
import nodemailer from "nodemailer";

interface EmailRequest {
  name: string;
  email: string;
  message: string;
}

export const handleSendEmail: RequestHandler = async (req, res) => {
  console.log('📧 Email sending request received');
  console.log('Request body:', req.body);
  
  try {
    const { name, email, message }: EmailRequest = req.body;

    // Validate input
    if (!name || !email || !message) {
      console.log('❌ Validation failed: Missing required fields');
      return res.status(400).json({ 
        success: false, 
        message: "All fields (name, email, message) are required" 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Validation failed: Invalid email format');
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address"
      });
    }

    console.log('✅ Validation passed. Preparing to send email...');

    // Email configuration
    const senderEmail = 'sharmaishwar970@gmail.com';
    const senderPassword = 'zwqwlqcllrhkusjk';
    const receiverEmail = 'ishwarsharma27092002@gmail.com';

    console.log(`📤 Sending from: ${senderEmail}`);
    console.log(`📥 Sending to: ${receiverEmail}`);

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: senderEmail,
        pass: senderPassword
      }
    });

    // Test the transporter
    console.log('🔄 Testing SMTP connection...');
    try {
      await transporter.verify();
      console.log('✅ SMTP connection verified successfully');
    } catch (verifyError) {
      console.error('❌ SMTP verification failed:', verifyError);
      return res.status(500).json({
        success: false,
        message: "Email service configuration error. Please try again later."
      });
    }

    // Email content
    const mailOptions = {
      from: `"Portfolio Contact Form" <${senderEmail}>`,
      to: receiverEmail,
      replyTo: email,
      subject: `🌟 New Portfolio Message from ${name}`,
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <div style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">New Portfolio Contact</h1>
          </div>
          
          <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
            <h2 style="color: #374151; margin-top: 0;">Contact Details</h2>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #3b82f6;">${email}</a></p>
            </div>
            
            <h3 style="color: #374151;">Message:</h3>
            <div style="background: #f9fafb; padding: 20px; border-left: 4px solid #3b82f6; margin: 15px 0;">
              <p style="margin: 0; line-height: 1.6; color: #4b5563;">${message.replace(/\n/g, '<br>')}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 14px;">
              <p>📧 Sent from your portfolio contact form</p>
              <p>🕒 ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
            </div>
          </div>
        </div>
      `
    };

    // Send email
    console.log('📬 Sending email...');
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);

    res.json({ 
      success: true, 
      message: "Message sent successfully! I'll get back to you soon." 
    });

  } catch (error) {
    console.error('❌ Email sending error:', error);
    
    let errorMessage = "Failed to send email. Please try again later.";
    
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      
      if (error.message.includes('Invalid login') || error.message.includes('authentication')) {
        errorMessage = "Email authentication failed. Please contact directly via email.";
      } else if (error.message.includes('ENOTFOUND') || error.message.includes('network')) {
        errorMessage = "Network error. Please check your connection and try again.";
      } else if (error.message.includes('timeout')) {
        errorMessage = "Request timeout. Please try again.";
      }
    }
    
    res.status(500).json({ 
      success: false, 
      message: errorMessage
    });
  }
};
