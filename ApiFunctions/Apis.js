const Teachers = require('../model/Teachers');
const classes = require('../model/classes');
const students= require('../model/Student');

exports.saveTeacher= async (req,res)=>{
    const {fName,lName,user,pass}=req.body;
    if(!fName||!lName||!user||!pass){
        res.status(401).json(error);
    }
    else{
        try {
            const preUser= await Teachers.findOne({user:user})

            if(preUser){
                res.status(401).json("user name already exists!!")
            }
            else{
                const teacher=new Teachers(
                    {fName,lName,user,pass}
                )
                await teacher.save();        
                res.status(201).json(teacher)  
            } 
        } catch (error) {
            res.status(401).json("Something went wrong !!")
        }
    }
}

exports.Login=async (req,res)=>{
    const {user,pass}=req.body;
    try {
        const User= await Teachers.findOne({user:user})
        if(User){
            if(User.pass===pass){
                res.status(201).json(User)
            }
            else{
                res.status(401).json("Incorrect password !!")
            }
        }
        else{
            res.status(401).json("Incorrect username !!")
        }
    } catch (error) {
        res.status(401).json("Something went wrong !!")
    }
}

exports.userClasses=async(req,res)=>{
    const {id} =req.params;
    try {
        const user=(await Teachers.findOne({_id:id})).user;
        const Classes=await classes.find({user:user});
        res.status(201).json(Classes)
    } catch (error) {
        res.status(401).json(error);
    }
}

exports.saveClass=async(req,res)=>{
    const {user,className,Total,data}=req.body;
    try {
        const isUser=await Teachers.findOne({user:user})
        if(!isUser){
            res.status(401).json('user not found')
        }
        else{
            const preClass= await classes.findOne({user:user ,className:className});
            if(preClass){
                console.log(preClass)
                res.status(401).json('Class already exists')
            }
            else{
                const clas=new classes({ 
                    user,className,Total
                })
                await clas.save();
                
                if(data.length>0){
                    for(let i=0;i<data.length;i++){
                        if(data[i].Name!=''&&data[i].Roll!=undefined){
                            let student=new students({
                                classId:clas._id,
                                name:data[i].Name,
                                roll:data[i].Roll,
                                count:data[i].Count
                            })
                            await student.save();
                        } 
                    }
                }
                const classe1=await classes.find({user:user});
                res.status(201).json(classe1)
            }
            
        }
    } catch (error) {
        res.status(401).json('something went wrong')
    }
}
exports.getStudents=async (req,res)=>{
    try {
        const {id}=req.params;
        const allStudent = await students.find({classId:id})
        res.status(201).json(allStudent);
    } catch (error) {
        res.status(401).json(error)
    }
}
exports.saveAttendance=async(req,res)=>{
    const {stds}=req.body;

    try {
        const cls=await classes.findOne({_id:stds[0].classId})
        await classes.findByIdAndUpdate(stds[0].classId,{
            user:cls.user,
            className:cls.className,
            Total:cls.Total+1,
            dateCreated:cls.dateCreated
        },{new:true})
        for(let i=0;i<stds.length;i++){
            let c;
            if(stds[i].isPresent){
                c=stds[i].count+1;
            }
            else{
                c=stds[i].count;
            }
            await students.findByIdAndUpdate(stds[i]._id,{
                classId:stds[i].classId,
                name:stds[i].name,
                roll:stds[i].roll,
                count:c
            },{ new: true })
        }
        res.status(201).json(stds);
    } catch (error) {
        console.log(error)
    }

}
exports.saveStudents=async(req,res)=>{
    const {classId,data}=req.body;
    try {
        if(data.length>0){
            for(let i=0;i<data.length;i++){
                if(data[i].Name!=''&&data[i].Roll!=undefined){
                    let student=new students({
                        classId,
                        name:data[i].Name,
                        roll:data[i].Roll,
                        count:data[i].Count
                    })
                    await student.save();
                } 
            }
        }
        res.status(201).json("Everything is fine")
    } catch (error) {
        console.log(error);
    }
}