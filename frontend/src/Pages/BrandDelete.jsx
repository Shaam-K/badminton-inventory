import axios from 'axios';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
const API_URL = import.meta.env.VITE_API_URL;

const BrandDelete = () => {
    const { id, name } = useParams();

    const navigate = useNavigate();

    const HandleSubmit = async () => {
        const response = await axios.delete(`${API_URL}/brands/${id}/delete`);

        if (response.status == 200) {
            navigate('/brands')
        }
    }

  return (
    <div className='text-lg w-3/4 mx-auto'>
        <h1 className='my-3'>Are you sure you want to delete <span className='font-semibold'>{name}</span> with id =  <span className='font-semibold'>{id}</span>?</h1>
        <button className='px-4 py-2 rounded border border-gray-500 hover:text-white hover:bg-gray-800 cursor-pointer' onClick={() => HandleSubmit()}>Yes</button>
    </div>
  )
}

export default BrandDelete