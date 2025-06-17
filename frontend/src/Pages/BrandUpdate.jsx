import axios from 'axios';
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
const API_URL = import.meta.env.VITE_API_URL;
const BrandUpdate = () => {
    const { id, name } = useParams();
    const navigate = useNavigate();

    const [updatedName, setUpdatedName] = useState("");

    const HandleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`${API_URL}/${id}/update`, {
                brand: updatedName
            })

            if (response.status == 200 && name != "") {
                navigate('/brands');
            }
        } catch (err) {
            alert(err.msg);
        }
    }

    return (
        <form onSubmit={HandleSubmit} className='flex flex-col gap-3 w-1/2 mx-auto my-10 text-lg'>
            <label htmlFor="brand_name">Update Brand:</label>
            <input type="text" placeholder={name} className='bg-gray-300 p-1' onChange={(e) => setUpdatedName(e.target.value)} />
            <input type="submit" value="Update" />
        </form>
    )
}

export default BrandUpdate