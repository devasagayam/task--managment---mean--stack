const express = require('express');
const router = express.Router();
const { List } = require('../models/lists.model');
const { Task } = require('../models/tasks.model');

module.exports = router;


router.get('/lists', (req, res) => {
    
    List.find({
        _userId: req.user_id
    }).then((lists) => {
        res.send(lists);
    }).catch((e) => {
        res.send(e);
    });
})


router.post('/lists', (req, res) => {
    let title = req.body.title;

    let newList = new List({
        title,
        _userId: req.user_id
    });
    newList.save().then((listDoc) => {
        res.send(listDoc);
    })
});

router.patch('/lists/:id', (req, res) => {
     List.findOneAndUpdate({ _id: req.params.id, _userId: req.user_id }, {
        $set: req.body
    }).then((data) => {
        res.send({ 'message': 'updated successfully',"data":data});
    });
});

router.delete('/lists/:id', (req, res) => {
    List.findOneAndRemove({
        _id: req.params.id,
        _userId: req.user_id
    }).then((removedListDoc) => {
        res.send(removedListDoc);
        deleteTasksFromList(removedListDoc._id);
    })
});

let deleteTasksFromList = (_listId) => {
    Task.deleteMany({
        _listId
    }).then(() => {
        console.log("Tasks from " + _listId + " were deleted!");
    })
}