import { Router } from 'express';
import { RegistryAccount, ReturnAccountResult } from '../../Interface/Account';
import { db } from '../../index';

const router: Router = Router();

router.post('/', async (req, res) => {

    if(!req.body || Object.keys(req.body).length <= 0) return res.status(401).json({ "code": "401", "message": "BODY_NOT_FOUND" });
    
    const bodyAccount: RegistryAccount = (req.body as RegistryAccount);
    if(!bodyAccount.username || !bodyAccount.email || !bodyAccount.password || !bodyAccount.confirmpassword) return res.status(401).json({ "code": "401", "message": "INVALID_BODY" });

    const emailRegex: RegExp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    const passwordRegex: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

    if(bodyAccount.username.length < 4 || bodyAccount.username.length > 16) return res.status(401).json({ "code": "401", "message": "INVALID_USERNAME" });
    if((await db.get_all_account(bodyAccount.username)).length >= 3) return res.status(401).json({ "code": "401", "message": "TOO_MANY_PEOPLE_USE_THIS_NAME" });
    if(!emailRegex.test(bodyAccount.email)) return res.status(401).json({ "code": "401", "message": "INVALID_EMAIL" });
    if((await db.verify_email(bodyAccount.email))) return res.status(401).json({ "code": "401", "message": "EMAIL_ALREADY_USED" });
    if(!passwordRegex.test(bodyAccount.password)) return res.status(401).json({ "code": "401", "message": "INVALID_PASSWORD" });
    if(bodyAccount.password != bodyAccount.confirmpassword) return res.status(401).json({ "code": "401", "message": "INVALID_CONFIRM_PASSWORD" });

    const createAccount: Boolean|ReturnAccountResult = await db.add_account({
        username: String(bodyAccount.username),
        email: String(bodyAccount.email),
        password: String(bodyAccount.password),
        locked: false
    });

    if(createAccount)
        return res.status(200).json({ "code": "200", "message": "ACCOUNT_CREATED", "token": (createAccount as ReturnAccountResult).token });
    else 
        return res.status(500).json({ "code": "500", "message": "ERROR_CREATE_ACCOUNT" });
});

export default router;