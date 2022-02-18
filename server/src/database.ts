import * as db from 'better-sqlite3';
import * as UtilsAccount from './Util/account';
import { Account as AccountInterface, ReturnAccountResult } from './Interface/Account';



export default class DataBase {

    private data: db.Database;

    constructor(path: string) {
        this.data = new db(path);
        this.initDB();
    }

    private initDB(): void {
        this.data.exec(
            "CREATE TABLE IF NOT EXISTS `users` ("
            + "`id` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,"
            + "`identifiant` INTEGER NOT NULL default '0',"
            + "`username` varchar(16) NOT NULL default '',"
            + "`email` text NOT NULL default '',"
            + "`password` text NOT NULL default '',"
            + "`token` text NOT NULL default '',"
            + "`locked` bool NOT NULL default 'false'"
            + ");"
        );
    }

    public verify_email(email: string): Promise<Boolean> {
        return new Promise<Boolean>((resolve, rej) => {
            const prepare: db.RunResult = this.data.prepare("SELECT * FROM users WHERE email = ?").get(email);
            resolve(prepare ? true : false);
        });
    }

    public add_account(account: AccountInterface): Promise<Boolean|ReturnAccountResult> {
        return new Promise<Boolean|ReturnAccountResult>((resolve, rej) => {
            const new_id: Number = UtilsAccount.random_identifiant();
            const new_token: String = UtilsAccount.generate_token(account, new_id);

            const prepare: db.RunResult = this.data.prepare("INSERT INTO users VALUES(?,?,?,?,?,?,?);")
                .run([
                    null, 
                    new_id,
                    String(account.username),
                    String(account.email),
                    String(account.password),
                    String(new_token),
                    String(account.locked)
                ]);
            
            resolve(prepare ? { result: true, token: new_token } : false);
        });
    }

    public get_all_account(username: string): Promise<Array<AccountInterface>> {
        return new Promise<Array<AccountInterface>>((resolve, rej) => {
            const prepare = this.data.prepare("SELECT * FROM users WHERE username = ?").all(username);
            resolve(prepare);
        });
    }

}