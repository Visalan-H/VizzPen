const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configure Cloudinary with your account details
cloudinary.config({
    cloud_name: process.env.CNAME,  
    api_key: process.env.CKEY, 
    api_secret: process.env.CSECRET     
});

const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);

const srcCreator = (req, res, next) => {
    const { name, html,css,js } = req.body;
    const template = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${name}</title>
            <style>${css}</style>
            </head>
            <body>
            ${html}
            <script>${js}</script>
        </body>
    </html>
    `

    cloudinary.uploader.upload_stream(
        { resource_type: 'raw', public_id: `${name+uniqueSuffix}.html`,folder:'pens' }, // Set public_id to be the `name` provided
        (err, result) => {
            if (err) {
                return res.status(500).send('Error uploading to Cloudinary');
            }
            req.body.penSrc = result.secure_url;
            next();
        }
    ).end(template);

}

module.exports=srcCreator;