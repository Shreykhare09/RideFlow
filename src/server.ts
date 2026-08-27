import express from "express";
import pool from "./config/db";

const app = express();

app.get("/db-test", async(req,res)=>{
    try{
        const result = await pool.query("SELECT current_database()");

        res.status(200).json({
            message:"Database connected successfully",
            databse: result.rows[0].current_database,
        });
    }
    catch(error){
        console.error("Database connection eerror:", error);

        res.status(500).json({
            message: "Database connection failed",
        });
    }
});

app.get("/health",(req,res)=>{
    res.status(200).json({
        status: "OK",
        message: "Server is running",
    });
});

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});