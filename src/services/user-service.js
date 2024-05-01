let data = [];


exports.getAll = () => {
    return data;
}


exports.getById = (id) => {
    return data.find(e=>e.id == id)
}


exports.create = (student)=>{
    const newStudent = {...student, id: Date.now().toString()}
    data.push(newStudent)
    return newStudent
}


exports.alreadyExists = (username) => {
    return data.find(e=>e.username == username)? true: false
}


exports.delete = (id) => {
    data = data.filter(e=>e.id !== id)
}


exports.update = (id, student) => {
    const index = data.findIndex(e=>e.id == id)
    if(index != -1){
        data[index] = {...student, id}
    } else throw new Error('User not found')
}