

export const GenerateOtp = () => {

    const otp = Math.floor(100000 + Math.random() + 900000);
    let expiry = new Date();
    expiry.setTime( new Date().getTime() + (30 * 60 * 1000) );

    return { otp, expiry };
}

export const onRequestOtp = async( otp: number, toPhoneNumber: string ) => {

    const accountSid = "AC65a729cdb3e491b27635d8e248ff493c";
    const authToken = "5a6ea713a835da005da33b619455442b";
    const client = require('twilio')(accountSid, authToken);

    const response = await client.messages.create({
        body: `Your OTP is ${otp}`,
        from: "+18126418851",
        to: `+48${toPhoneNumber}`
    })

    return response;
}