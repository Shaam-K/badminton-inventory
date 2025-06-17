import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL;
const Brands = () => {
    const [fillBrands, setFillBrands] = useState([]);
    const [name, setName] = useState("");

    const navigate = useNavigate();

    const fetchBrands = async () => {
        const response = await axios.get(`${API_URL}/brands`);
        setFillBrands(response.data.data)
    }

    const addBrand = async (e) => {
        e.preventDefault();
        const response = await axios.post(`${API_URL}/brands/create`, {
            brand: name
        })

        if (response.status == 200) {
            setName("");
            fetchBrands();
        }
    }


    useEffect(() => {
        fetchBrands();
    }, [])




    return (
        <>
            <form className="w-3/4 mx-auto my-3" onSubmit={addBrand} method='post'>
                <label htmlFor="brand_name" className='text-xl underline'>Add Brand:</label>
                <br />
                <input type="text" value={name} className='bg-gray-300 p-1 my-3 w-1/2' id='brand_name' name='brand_name' onChange={(e) => setName(e.target.value)} />
                <br />
                <input type="submit" className='border border-gray-500 p-2 cursor-pointer rounded-md hover:text-white hover:bg-gray-800' value="Create" />
            </form>



            <h1 className='text-center my-10 text-2xl font-semibold underline'>Brand Details</h1>
            <table className="w-3/4 mx-auto mt-6 border border-gray-300 rounded-lg shadow-md">
                <thead>
                    <tr className="bg-gray-200 text-gray-700">
                        <th className="py-2 px-4 border-b border-gray-300">Brand Name</th>
                        <th className="py-2 px-4 border-b border-gray-300">Edit</th>
                        <th className="py-2 px-4 border-b border-gray-300">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {fillBrands.map((brand) => (
                        <tr
                            key={brand.id}
                            className="hover:bg-gray-100 transition-colors duration-200"
                        >
                            <td className="py-2 px-4 border border-gray-300">{brand.name}</td>
                            <td
                                className="text-2xl py-2 px-4 border border-gray-300 text-blue-600 hover:text-blue-800 cursor-pointer text-center"
                                onClick={() => navigate(`/brands/${brand.id}/update/${brand.name}`)}
                            >
                                ✎
                            </td>
                            <td
                                className="text-2xl py-2 px-4 border border-gray-300 text-red-600 hover:text-red-800 cursor-pointer text-center"
                                onClick={() => navigate(`/brands/${brand.id}/delete/${brand.name}`)}
                            >
                                🗑
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </>
    )
}

export default Brands