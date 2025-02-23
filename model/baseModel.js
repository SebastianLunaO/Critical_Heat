import mysql from 'mysql2/promise'
import bt from 'bcrypt'
import z, { object } from 'zod'

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

const user = z.object({
    username: z.string(),
    email: z.string().email(),
    psswd: z.string(),
    profileP: z.string(),
})

const userLogin = z.object({
    username: z.string(),
    psswd: z.string(),
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

    static async getAll(limit=6){
        const result = await db.query(`SELECT *
            FROM Games LIMIT ?;`,limit)
        return result[0]
    }

    static async edit(game_info){
        const exists = await this.getByID(game_info.id)
            if ((exists===undefined)){
            throw new Error("Username already exists");
            return error
            }
        const result = await db.query(`UPDATE Games 
            SET
            title = ?,
            genre = ?,
            developer = ?,
            publisher = ?,
            release_date = ?,
            descp = ?,
            cover_ref = ?,
            Base_price = ?
            WHERE game_id = ?`,[game_info.title,game_info.genre,game_info.developer,game_info.publisher,game_info.release_date,game_info.descp,
                game_info.cover_ref,game_info.Base_price,game_info.id]);
        
        const row = await this.getByID(game_info.id)
        return row 
    }

}

export class User {
    static async create(user_info){ 
        const info = user.parse(user_info)

            const exists = await this.getByName(info.username)
            if (!(exists===undefined)){
            console.log("Already exist")
            throw new Error("Username already exists");
            return error
             }
        
        const id = crypto.randomUUID();
        const hashedPassword = bt.hashSync(info.psswd,10);    
        const result = await db.query(`INSERT INTO 
        Users(user_id,username,email,passwd,profile_picture_ref) VALUES 
        (?,?,?,?,?)`,[id,info.username,info.email,hashedPassword,info.profileP]);
        const aws = await this.getByID(id)
        return aws
    }

    static async getByID(id){
        const result = await db.query (`SELECT user_id,username,profile_picture_ref,join_date 
            FROM Users WHERE user_id = ?`,id);
        const row = result[0][0]
        return row
    }

    static async getByName(name){
        const result = await db.query (`SELECT user_id,username,profile_picture_ref,join_date 
            FROM Users WHERE username = ?`,name);
        const row = result[0][0]
        return row
    }

    static async login(user_login){
        const info = userLogin.parse(user_login)

            const user = await this.getByName(info.username)
            if ((user===undefined)){
            throw new Error("User does not exist");
            }
            
        const isValid = await bt.compare(info.psswd,user.passwd)
        if(!isValid) throw new Error('username or password invalid');
        const {passwd: _, ...publicUser} = user
        return user
    }
}