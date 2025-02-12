import mysql from 'mysql2/promise'
import bt from 'bcrypt'
import z from 'zod'

const game = z.object({
    title: z.string(),
    genre: z.string(),
    developer: z.string(),
    publisher: z.string(),
    release_date: z.string().date(),
    descp: z.string(),
    cover_ref: z.string(),
    Base_price: z.number(),
    tags: z.string().array()
});

const passwordSQL = process.env.PASSWORD_MYSQL
const SALT = process.env.SALT_ROUND

const optionsConnection={
    host:'localhost',
    port: 3306,
    user: 'root',
    password: passwordSQL,
    database: 'Critical_Heat'
}

const db = mysql.createPool(optionsConnection);

export class Games {
    static async create(game_info){ 
        const info = game.parse(game_info)
        const id = crypto.randomUUID();
        const result = await db.query(`INSERT INTO 
        Games VALUES 
        (?,?,?,?,?,?,?,?,?)`,[id,info.title,info.genre,info.developer,
            info.publisher,info.release_date,info.descp,info.cover_ref,info.Base_price]);

        return this.getByID(id)
    }

    static async getByID(id){
        const result = await db.query (`SELECT * 
            FROM Games WHERE game_id = ?`,id);
        const row = result[0]
        return row
    }

    static async getByName(name){
        const result = await db.query(`SELECT *
            FROM Games WHERE title LIKE (%?%)`,name);
        return result[0]
    }

}