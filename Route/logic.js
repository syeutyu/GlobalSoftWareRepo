exports.test = (req, res) => {
    let id = req.query.id;
    let pw = req.query.pw;

    if (id == pw) {
        res.status(200).send({ Message: '200을 축하하지' });
        res.end();
    } else {
        res.status(400).send({ Message: '400이다 개놈아' });
        res.end();
    }
};