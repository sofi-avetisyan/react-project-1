import axios from 'axios';
const userService = {
    getFakeUsers : function (){
        try{
            return axios.get('https://jsonplaceholder.typicode.com/users');
        }
        catch(error){
            console.log("errors>>>" ,error);
        }
     
    },
    getFakeUser : function (id) {
        try{
            return axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        }
        catch(error){
            console.log("errors>>>" ,error);
        }
    },
    getUserPosts : function () {
        try{
            return axios.get("https://jsonplaceholder.typicode.com/posts")
        }
        catch(error){
            console.log("errors>>>" ,error);
        }

    },
    getPostsComments: function (id) {
        try{
            return  axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        }
        catch(error){
            console.log("errors>>>" ,error);
        }
    }

}

export default userService