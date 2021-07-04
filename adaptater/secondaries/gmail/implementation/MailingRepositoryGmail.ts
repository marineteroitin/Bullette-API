import MailingRepository from "../../../../core/ports/mailing/Mailing.repository";
import {smtpTransport} from "../config/Gmail.config";
import User from "../../../../core/domain/User.domain";

export default class MailingRepositoryGmail implements MailingRepository {
    sendMailForgettenPassword(data: any): void {
    }

    sendMailRegister(user: User, link: any): void {
        const mailOptions = {
                from: process.env.AUTH_USER,
                to: user.email,
                subject: "Finalise ton inscription sur Bullette",
                html:
                    "<div class='card text-center'>" +
                    "Hello " +
                    user.firstName +
                    "! " +
                    "<br>" +
                    "<br>" +
                    "Tu t'es récement inscrit sur l'application Bullette, valide ton mail en cliquant sur le lien suivant:" +
                    "<br>" +
                    "<br>" +
                    link +
                    "<br>" +
                    "<br>" +
                    "Douce journée," +
                    "<br>" +
                    "<br>" +
                    "Marine." +
                    "</div>"

            }
        ;

        smtpTransport.sendMail(mailOptions, (err: any, info: any) => {
            if (err) return err;
            return info;
        });
    }
}
