const getLogOut = (req, res) => {
    req.logOut()
    req.flash('success_msg', 'Loged out successfully')
    res.redirect('/test/home')
}

module.exports = { getLogOut }