class ContactForm{
    //Function SendMail
    SendMail(UserMail, UserMailPassword, firstname, lastname, mobile, email, message) {
        async function main(){    
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: UserMail, // generated ethereal user
                pass: UserMailPassword // generated ethereal password
            }
            });
        
            // send mail with defined transport object
            let info = await transporter.sendMail({
            from: UserMail, // sender address
            to: email, // list of receivers
            subject: "Contact Form Email", // Subject line
            text: message, // plain text body
            html:"<p> Email from "+firstname+ " "+ lastname+"</p>" + "<b>"+message+"</b>" // html body
            });
            
            console.log("Message sent: %s", info.messageId);
            
            res.redirect('/');
        }
        
        main().catch(console.error);
    }

    //simplatech contactmail
    SaveToDB(FirstName, Lastname, Phone, Email, Message) {
        var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("simplatech");
        var query = { firstname: FirstName, lastname: Lastname,Phone: Phone, email: Email, message: Message};
            dbo.collection("contactmail").insertOne(query, function(err, res)  {
                if (err) throw err;
                console.log("one document inserted");
                db.close();
            });
        }); 
    }

    getDateTime() {

        var date = new Date();

        var hour = date.getHours();
        hour = (hour < 10 ? "0" : "") + hour;

        var min  = date.getMinutes();
        min = (min < 10 ? "0" : "") + min;

        var sec  = date.getSeconds();
        sec = (sec < 10 ? "0" : "") + sec;

        var year = date.getFullYear();

        var month = date.getMonth() + 1;
        month = (month < 10 ? "0" : "") + month;

        var day  = date.getDate();
        day = (day < 10 ? "0" : "") + day;

        return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

    }

}

module.exports = ContactForm;