import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL;

const DeleteRacquet = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [racquet, setRacquet] = useState({});
    const fetchRacquetDetails = async () => {
        const response = await axios.get(`${API_URL}/racquets/${id}/get`)
        setRacquet(response.data.data)
    }

    useEffect(() => {
        fetchRacquetDetails();
    }, [])

    const HandleSumbit = async () => {
        const response = await axios.delete(`${API_URL}/racquets/${id}/delete`);

        if (response.status == 200) {
            navigate('/');
        }
    }
    
    return (
        <div className='flex justify-center my-9'>
            <div className='w-3/4'>
                <h1 className='my-3 text-xl'>Are you sure you want to delete this racquet?</h1>
                <div className='text-lg'>
                    <h1>Racquet Name: {racquet.racquet_name}</h1>
                    <h1>Brand: {racquet.brand_name}</h1>
                    <h1>Balance Point: {racquet.balance_point}</h1>
                    <button onClick={HandleSumbit} className='my-9 font-semibold text-red-500 p-3 bg-red-400 text-white rounded-md hover:bg-red-500 cursor-pointer'>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteRacquet