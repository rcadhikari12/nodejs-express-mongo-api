var express = require('express')
var router = express.Router()

var Bug = require('../models/bugModel')

/* GET bug listing. */
router.get('/', function (req, res, next) {
    Bug.find((err, bugs) => {
        if (err) throw err;

        for (var i = 0; i < bugs.length; i++) {
            let currentTime = new Date();
            let dbDate = bugs[i].date;
            let date3 = new Date();
            date3.setDate(dbDate.getDate() + 3);

            timeDiff = date3.getTime() - currentTime.getTime();
            leftDays = Math.round(timeDiff / (1000 * 3600 * 24));

            if (leftDays < 0) {
                bugs[i].daysLeft = "Unresolved";

            }
            else {
                bugs[i].daysLeft = leftDays.toString();
            }

            bugs[i].time = bugs[i].date.toLocaleTimeString();


        }

        res.render('../views/bugs/index', { bugList: bugs });
    })
});


router.get('/create', (req, res) => {
    res.render('../views/bugs/create');
})

router.post('/save', function (req, res) {
    var bug = new Bug(req.body);
    console.log(req.body);
    Bug.create(bug, (err) => {
        if (err) throw err;
        res.redirect("/bugs")
    })
})



module.exports = router;

