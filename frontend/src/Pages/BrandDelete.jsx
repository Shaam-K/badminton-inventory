import axios from 'axios';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react';
const API_URL = import.meta.env.VITE_API_URL;

const BrandDelete = () => {
  const { id, name } = useParams();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const HandleSubmit = async () => {
    try {
      setLoading(true)
      const response = await axios.delete(`${API_URL}/brands/${id}/delete`);

      if (response.status == 200) {
        navigate('/brands')
      }
    } catch (err) {

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='text-lg w-3/4 mx-auto'>
      <h1 className='my-3'>Are you sure you want to delete <span className='font-semibold'>{name}</span> with id =  <span className='font-semibold'>{id}</span>?</h1>
                  <button onClick={HandleSubmit} disabled={loading} className="px-4 py-2 rounded border border-gray-500 hover:text-white hover:bg-gray-800 cursor-pointer">{loading ? (
                <div className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".14" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".29" transform="rotate(30 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".43" transform="rotate(60 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".57" transform="rotate(90 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".71" transform="rotate(120 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".86" transform="rotate(150 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" transform="rotate(180 12 12)" /><animateTransform attributeName="transform" calcMode="discrete" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12" /></g></svg>
                </div>
            ) : 'Delete Brand'}</button>
    </div>
  )
}

export default BrandDelete