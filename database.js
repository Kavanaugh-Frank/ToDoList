import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()


export async function getNotes(){
    const [rows] = await pool.query("SELECT * FROM notes")
    return rows
}

export async function getNote(id){
    const [row] = await pool.query(
        `SELECT * 
        FROM notes
        WHERE id = ?` 
        , [id]  //untrusted values are ?, called a prepared statement
    )
    return row[0] //since select returns an array, and this function only gets one ID
}

export async function createNote(title, contents){
    const [result] = await pool.query(`
    INSERT INTO notes (title, contents)
    VALUES (? , ?)
    ` , [title , contents])
    const id = result.insertId
    return getNote(id)
}

export async function deleteNode(id){
    // await pool.query(`DELETE FROM notes WHERE id=?` , {id})
    await pool.query(`DELETE FROM notes where id = ?` , [id])
}
