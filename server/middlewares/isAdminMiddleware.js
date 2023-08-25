module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
        const role = req.user.role;
        if (role.includes("admin")) next();
        else { res.status(403).json({ message: "Forbidden" }) }
    }
    else {
        res.status(401).json({ message: "Unauthorized" });
    }
}