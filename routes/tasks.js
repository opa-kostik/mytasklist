var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://'+process.env.DB_USER+':'+process.env.DB_PASSWORD+'@ds147777.mlab.com:47777/training',['tasks']);

router.get('/tasks', function(req,res,next){
    db.tasks.find(function(err,tasks){
        if(err){
            res.send(err)
        }else{
            res.json(tasks); 
        }
    });
})

router.get('/task/:id', function(req,res,next){
    db.tasks.findOne({_id : mongojs.ObjectId(req.params.id)},function(err,task){
        if(err){
            res.send(err)
        }else{
            res.json(task); 
        }
    });
})

router.post('/task', function(req,res,next){
    var newTask = req.body; 
    if(!newTask.title || !(newTask.is_done + '')){
        res.status(400);
        res.json({
                    "error": "Bad data"
                })
    }
    db.tasks.save(newTask,function(err,task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
})

router.delete('/task/:id', function(req,res,next){
    db.tasks.remove({_id : mongojs.ObjectId(req.params.id)},function(err,task){
        if(err){
            res.send(err)
        }
        res.status(200); 
    });
})

router.put('/task/:id', function(req,res,next){
    var task = req.body;
    var updTask = {};
    if(task.is_done){
        updTask.is_done = task.is_done;
    }
    if(task.title){
        updTask.title = task.title;
    }
    if(!updTask){
        res.status(400);
        res.json({
            "error": "Bad data"
        })
    }else{    
        db.tasks.update({_id : mongojs.ObjectId(req.params.id)},updTask,{},function(err,task){
            if(err){
                res.send(err)
            }
            res.json(task); 
        });

    }
})

module.exports = router;