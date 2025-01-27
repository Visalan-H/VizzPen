const express = require('express')
const Pen = require('../models/Pen')
const penRouter = express.Router();
const srcCreator = require('../middleware/srcCreator')

penRouter.get('/:id', async (req, res) => {
    try {
        const pen = await Pen.findById(req.params.id);
        if (pen) res.status(200).json(pen);
    } catch (error) {
        res.json(error.message);
    }
})

penRouter.get('/all/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        const pen= await Pen.find({user:id});
        res.status(200).json(pen);
    }
    catch(err){
        res.json(err.message)
    }
})

penRouter.post('/add', srcCreator, async (req, res) => {
    try {
        const { name, penSrc, user, html, css, js } = req.body;
        const newPen = new Pen({ name, penSrc, user, html, css, js })
        const pen = await newPen.save();
        if (pen) res.status(201).json(pen);
    } catch (error) {
        console.log(error.message);
        res.json(error.message);
    }
})

penRouter.put('/:id', async (req, res) => {
    try {
        const { name, penSrc, user, html, css, js } = req.body;
        const pen = await Pen.findByIdAndUpdate(req.params.id, { name, penSrc, user, html, css, js });
        if (pen) res.status(200).json(pen);
    } catch (error) {
        res.json(error.message)
    }
})

penRouter.delete('/:id', async (req, res) => {
    try {
        const pen = await Pen.findByIdAndDelete(req.params.id);
        if (pen) res.status(200).json({ msg: "deleted successfully", deletedPen: pen });
        else res.status(404).json({ msg: "document not found" })
    } catch (error) {
        res.json(error.message)
    }
})
module.exports = penRouter;