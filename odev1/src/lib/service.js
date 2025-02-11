import axios from 'axios';

export async function getData(user_id) {
    try {
        const userResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${user_id}`);
        const postResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${user_id}`);

        return {
            user: userResponse.data,
            posts: postResponse.data
        };
    } catch (error) {
        console.error("Hata oluştu:", error);
        return null;
    }
}
