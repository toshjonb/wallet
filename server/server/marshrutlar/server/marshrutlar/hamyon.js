const router = require("express").Router()
const pool = require("../db")

router.get("/balances", async (req,res)=>{
  const data = await pool.query("SELECT * FROM balances")
  res.json(data.rows)
})

router.post("/deposit", async (req,res)=>{
  const {user_id,currency,amount} = req.body

  await pool.query(`
    INSERT INTO balances(user_id,currency,amount)
    VALUES($1,$2,$3)
    ON CONFLICT (user_id,currency)
    DO UPDATE SET amount = balances.amount + $3
  `,[user_id,currency,amount])

  res.json({msg:"deposit ok"})
})

module.exports = router
