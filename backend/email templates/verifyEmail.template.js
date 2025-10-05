const verifyEmailTemplate = ({ verificationCode, verificationLink }) => `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email Address</title>
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
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
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

        .content p {
            color: #c9d1d9;
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 25px;
        }

        .code-box {
            background-color: #4f46e5;
            color: #ffffff;
            padding: 15px 25px;
            font-size: 30px;
            font-weight: bold;
            border-radius: 8px;
            display: inline-block;
            letter-spacing: 3px;
            margin-bottom: 30px;
            box-shadow: 0 4px 10px rgba(79, 70, 229, 0.5);
        }

        .button {
            background-color: #4f46e5;
            color: #ffffff;
            padding: 12px 25px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            display: inline-block;
            margin-top: 10px;
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
                        <h1>Yaman Warda</h1>
                    </div>

                    <!-- Content -->
                    <div class="content">
                        <p>Hello!</p>
                        <p>Please use the verification code below to activate your account and complete the registration process.</p>

                        <!-- Verification Code Box -->
                        <div class="code-box">${verificationCode}</div>

                        <p>This code is valid for <strong>15 minutes</strong> only.</p>

                        <p>If you prefer, you can verify directly by clicking the button below:</p>
                        <a href="${verificationLink}" class="button">Verify Now</a>
                    </div>

                    <!-- Footer -->
                    <div class="footer">
                        <p>If you did not request this account, please ignore this email.</p>
                    </div>

                </div>
            </td>
        </tr>
    </table>
</body>
</html>
`;

export default verifyEmailTemplate;