const resetPasswordTemplate = ({ resetPasswordLink }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset Your Password</title>
  <style>
    body { margin: 0; padding: 0; background-color: #0d1117; font-family: 'Inter', sans-serif; }
    .container { max-width: 600px; margin: 0 auto; background-color: #161b22; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.4); }
    .header { background-color: #1e293b; padding: 30px; text-align: center; border-bottom: 3px solid #4f46e5; }
    .header h1 { margin: 0; font-size: 28px; color: #ffffff; font-weight: 700; }
    .content { padding: 40px; text-align: center; }
    .content p { color: #c9d1d9; font-size: 16px; line-height: 1.6; margin-bottom: 25px; }
    .button { background-color: #4f46e5; color: #ffffff; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 18px; display: inline-block; box-shadow: 0 4px 10px rgba(79,70,229,0.5); transition: background-color 0.3s; }
    .button:hover { background-color: #4338ca; }
    .footer { padding: 20px 40px; text-align: center; font-size: 12px; color: #6e7681; border-top: 1px solid #30363d; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Reset Your Password</h1>
    </div>
    <div class="content">
      <p>Someone requested to reset the password for your account. If you did not request this, please ignore this email.</p>
      <p>To reset your password, click the button below. This link is valid for <strong>30 minutes</strong> only.</p>
      <a href="${resetPasswordLink}" class="button">Reset Password</a>
      <p style="color: #6e7681; font-size: 14px; margin-top: 30px; word-break: break-all;">
        If the button does not work, copy and paste this link into your browser:<br>${resetPasswordLink}
      </p>
    </div>
    <div class="footer">
      <p>For security reasons, do not share this link with anyone.</p>
    </div>
  </div>
</body>
</html>`;
export default resetPasswordTemplate;