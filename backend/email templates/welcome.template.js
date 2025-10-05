const welcomeTemplate = ({ name, loginLink }) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Yaman Warda!</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #0d1117;
            font-family: 'Inter', sans-serif;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #161b22;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        }
        .header {
            background-color: #1e293b;
            padding: 30px;
            text-align: center;
            border-bottom: 3px solid #4f46e5;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            color: #ffffff;
            font-weight: 700;
        }
        .content {
            padding: 40px;
            text-align: center;
        }
        .content h2 {
            color: #ffffff;
            font-size: 22px;
            margin-bottom: 15px;
        }
        .content p {
            color: #c9d1d9;
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 25px;
        }
        .button {
            background-color: #4f46e5;
            color: #ffffff;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            font-size: 18px;
            display: inline-block;
            box-shadow: 0 4px 10px rgba(79,70,229,0.5);
            transition: background-color 0.3s;
        }
        .button:hover {
            background-color: #4338ca;
        }
        .footer {
            padding: 20px 40px;
            text-align: center;
            font-size: 12px;
            color: #6e7681;
            border-top: 1px solid #30363d;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="table-layout: fixed;">
        <tr>
            <td style="padding: 20px 0;">
                <div class="container">
                    <!-- Header -->
                    <div class="header">
                        <h1>👋 Welcome!</h1>
                    </div>

                    <!-- Content -->
                    <div class="content">
                        <h2>Thank you for joining Yaman Warda, ${name}</h2>
                        <p>Your account has been successfully activated. You can now log in and start exploring all the features.</p>
                        <p>Best regards,<br>The Yaman Warda Team</p>
                        <a href="${loginLink}" class="button">Go to Profile</a>
                    </div>

                    <!-- Footer -->
                    <div class="footer">
                        <p>&copy; ${new Date().getFullYear()} Yaman Warda. All rights reserved.</p>
                    </div>
                </div>
            </td>
        </tr>
    </table>
</body>
</html>
`;

export default welcomeTemplate;