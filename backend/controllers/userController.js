const getUsers = (req, res) => {
    res.json({
        message: "Obtenir les utilisateurs en passant par le controlleur"
    })
}

module.exports = {
    getUsers,
}