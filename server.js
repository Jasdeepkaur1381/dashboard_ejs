const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');
const { kStringMaxLength } = require('buffer');

app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/customDetails');

const detailsSchema = {
    client: String,
    email: String,
    orderdate: String,
    orderitem: String,
    total: Number,
    status: String
}

const detail = mongoose.model('detail', detailsSchema);

app.get('/', (req, res) => {
    detail.find({}, function (err, details) {
        res.render('index', {
            detailsList: details
        })
    })
})
app.post("/delete", function (req, res) {
    // const checkedItemId = ;
    console.log(req.body);
    const checkedItemId = req.body.checkbox;
    detail.findByIdAndRemove(checkedItemId, function (err) {
        if (!err) {
            console.log("Successfully deleted checked item");
            res.redirect("/");
        }
    });


});
app.listen(4000, function () {
    console.log('server is running');
})