import axios from 'axios';

const getAll = async () => {
    const url = 'http://192.168.194.54:3000/api/v1/note/getAll';
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching notes:", error);
        throw error;
    }
};

export default getAll;