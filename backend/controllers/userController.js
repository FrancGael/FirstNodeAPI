const { hashPassword, VerifPassword } = require("../Helpers/auth")
const userModel = require("../models/usersModels")
const jwt = require("jsonwebtoken")



const getUsers = async (req, res) => {
    try {
      const { userId } = req.params;
      const post = await userModel.find({ userId });
      res.status(200).json(post);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };


const signUP = async(req, res) => {
    try {
        const {name, email, password, confirm_password} = req.body
        if(!name || !email || !password || !confirm_password){
            return res.json({status: 'error', message: "Veillez renseigner tous les champs!!"})
        }
        // Ajouter les vérifications du mot de password : caractères spéciaux etc.
        if(password.length < 8){
            return res.json({status: 'error', message: "Le mot de passe doit contenir au moins 8 caractères!!"})
        }
        if(password!== confirm_password) {
            return res.json({status: 'error', message: "Les mots de passe ne sont pas identiques!!"})
        }

        const existEmail = await userModel.findOne({email})
        if(existEmail) {
            return res.json({status: 'error', message: "Cet email existe déjà!!"})
        }

         const hashedPassword = await hashPassword(password)

        const newUser = await userModel.create({
            name, email, password:hashedPassword
        })
     

         return res.json({status: 'success', message:'Votre compte a été créé, vous pouvez désormais vous connectez'})
    }catch(err) {
        console.log('[sign-up Error]', err)
    }
}


const signIn = async(req, res,) => {
   try{

    const {email, password} = req.body

    if(!email ||!password){
        return res.json({status: 'error', message: "Veillez renseigner tous les champs!!"})
    }
     await userModel.findOne({email})
       .then(async (user) => {
        if(!user){
            return res.json({status: 'error', message: "Cet email n'existe pas!!"})
        }
          await VerifPassword(password, user.password)
          .then((match) => {
            if(!match){
                return res.json({status: 'error', message: "Mot de passe incorrecte"})
            }

            jwt.sign({_id: user._id, name: user.name, email: user.email}, process.env.JWT_SECRET, {expiresIn: '7 days'}, (err, token) => {
                if(err) throw err
                res.cookie('token', token).json({status: 'success', message:" Vous etes connceté!"})
            })
          })
       })
   }catch(err){
    console.log('[sign-in Error]', err)
   }

}

const signOut = (req, res) => {
    res.clearCookie('token').json({status: "success", message:'Vous etes déconnecté!'})
}

const getLoggedUser = async(req, res) => {
    const {token} = req.cookies
    
    if(!token) return res.json(null)
    jwt.verify(token, process.env.JWT_SECRET, async(err, data) => {
      if(err) throw err
      res.json(data)
    //   await userModel.findById({_id: data._id})
    //     .then((user) => {
    //         if(!user) res.json({status: "error", message: "User not found"})
    //         res.json(user)
    //     })
        
    })
}


module.exports = {
    getUsers,
    signUP,
    signIn,
    signOut,
    getLoggedUser,
}