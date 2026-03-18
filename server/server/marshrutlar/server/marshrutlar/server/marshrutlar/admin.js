const router = require("express").Router()
const pool = require("../db")

// USERS
router.get("/users", async (req,res)=>{
  const data = await pool.query("SELECT id,email FROM users")
  res.json(data.rows)
})

// TRANSACTIONS
router.get("/transactions", async (req,res)=>{
  const data = await pool.query("SELECT * FROM transactions")
  res.json(data.rows)
})

// ADD MONEY (ADMIN)
router.post("/add", async (req,res)=>{
  const {user_id,amount,currency} = req.body

  await pool.query(`
    INSERT INTO balances(user_id,currency,amount)
    VALUES($1,$2,$3)
    ON CONFLICT (user_id,currency)
    DO UPDATE SET amount = balances.amount + $3
  `,[user_id,currency,amount])

  res.json({msg:"qo‘shildi"})
})

module.exports = router
