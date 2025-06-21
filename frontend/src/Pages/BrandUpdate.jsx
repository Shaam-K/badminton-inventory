import axios from 'axios';
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
const API_URL = import.meta.env.VITE_API_URL;
const BrandUpdate = () => {
    const { id, name } = useParams();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [updatedName, setUpdatedName] = useState("");

    const HandleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            const response = await axios.put(`${API_URL}/brands/${id}/update`, {
                brand: updatedName
            })

            if (response.status == 200 && name != "") {
                navigate('/brands');
            }
        } catch (err) {
            alert(err.msg);
        } finally {
            setLoading(false)
        }
    }

    return (
        <form className='flex flex-col gap-3 w-1/2 mx-auto my-10 text-lg'>
            <label htmlFor="brand_name">Update Brand:</label>
            <input type="text" placeholder={name} className='bg-gray-300 p-1' onChange={(e) => setUpdatedName(e.target.value)} />
            <button onClick={HandleSubmit} disabled={loading} className="my-3 bg-blue-300 p-3 hover:bg-blue-500 hover:text-white cursor-pointer transition-all">{loading ? (
                <div className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".14" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".29" transform="rotate(30 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".43" transform="rotate(60 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".57" transform="rotate(90 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".71" transform="rotate(120 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".86" transform="rotate(150 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" transform="rotate(180 12 12)" /><animateTransform attributeName="transform" calcMode="discrete" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12" /></g></svg>
                </div>
            ) : 'Update Racquet'}</button>
        </form>
    )
}

export default BrandUpdate