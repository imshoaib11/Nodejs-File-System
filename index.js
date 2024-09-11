const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = 8005

app.use(express.json()) //Middleware to parse JSON bodies

const FILE_DIR = path.join(__dirname,'files')

app.post('/createFile',(req,res)=>{
        const currentDate = new Date()
        const timeStamp = currentDate.toISOString()
        const fileName = `${currentDate.toISOString().replace(/:/g,'-')}.txt`
        const filePath = path.join(FILE_DIR,fileName)
    
    fs.writeFile(filePath,timeStamp, (err)=>{
            if(err){
                res.status(500).send('Error creating file')
            }
            res.json({ message: 'File created', filename: fileName })
    })
})

app.get('/listFiles', (req, res) => {
    fs.readdir(FILE_DIR, (err, files) => {
        if (err) {
            res.status(500).send('Error reading files')
        }
        const textFiles = files.filter(file => file.endsWith('.txt'))
        res.json({files: textFiles})
    })
})

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));