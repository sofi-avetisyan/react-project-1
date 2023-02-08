export const getCurrentUser = () =>{

    const userJSON=localStorage.getItem("user")
    const user=JSON.parse(userJSON)

    return user
}

export const generateRandomColor=()=>{
    const r=Math.round(Math.random()*255)
    const g=Math.round(Math.random()*255)
    const b=Math.round(Math.random()*255)

    return `rgb(${r}, ${g}, ${b})`
}

export const getUsers = () => {
    const usersJSONData=localStorage.getItem("users")
    const users = JSON.parse(usersJSONData)

    return  users
}
export const getUserById = (id) => {
    const users=getUsers()
    const user = users.find( user => user.id === id);

    return user;
}