const users = []
const bcrypt = require('bcryptjs')

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        const existing = bcrypt.compareSync(password, users[i].passwordHash)
        console.log(existing)
        console.log(users[i].passwordHash)
        if (users[i].username === username && existing === true) {
          // let userToReturn = {...users[i]}
          // delete userToReturn.passwordHash
          res.status(200).send(users[i])
          console.log('logged in')
          return
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        console.log('Registering User')
        const {username, email, firstName, lastName, password} = req.body
        
        
        let salt = bcrypt.genSaltSync(5)
        const passwordHash = bcrypt.hashSync(password, salt)

        const newUser = {
          username: username,
          email: email,
          firstName: firstName,
          lastName: lastName,
          passwordHash: passwordHash
        }
        
        users.push(newUser)
        
        // console.log(req.body)
        // users.push(req.body)
        // res.status(200).send(req.body)
        let userDisplay = {...newUser}
        delete userDisplay.passwordHash

        res.status(200).send(userDisplay)
        console.log(userDisplay)
        
    }
}