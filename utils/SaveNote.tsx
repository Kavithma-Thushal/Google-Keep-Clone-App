import axios from 'axios';

const saveNote = async ({ title, content, color }) => {
    const url = 'http://192.168.168.208:8080/api/v1/note/save';
    try {
        const response = await axios.post(url, { title, content, color });
        return response.data;
    } catch (error) {
        console.error("Error saving note:", error);
        throw error;
    }
};

export default saveNote;