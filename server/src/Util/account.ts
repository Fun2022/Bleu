import * as jwt from 'jsonwebtoken';
import { Account } from '../Interface/Account';
import { JWT_KEY } from '../index';

export function random_identifiant(): Number {
    return Math.floor(Math.random() * 32058043535) + 1;
}

export function generate_token(account: Account, id: Number): String {
    return jwt.sign({
        username: account.username,
        email: account.email,
        identifiant: id,
        locked: account.locked
    }, JWT_KEY);
}