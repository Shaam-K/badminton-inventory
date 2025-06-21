import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL;
const Brands = () => {
    const [fillBrands, setFillBrands] = useState([]);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);
    const [addLoading, setAddLoading] = useState(false);

    const navigate = useNavigate();

    const fetchBrands = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${API_URL}/brands`);
            setFillBrands(response.data.data)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    const addBrand = async (e) => {
        e.preventDefault();
        try {
            setAddLoading(true)
            const response = await axios.post(`${API_URL}/brands/create`, {
                brand: name
            })

            if (response.status == 200) {
                setName("");
                fetchBrands();
            }
        } catch (err) {
            console.log(err);
        } finally {
            setAddLoading(false);
        }
    }


    useEffect(() => {
        fetchBrands();
    }, [])




    return (
        <>
            <form className="w-3/4 mx-auto my-3" method='post'>
                <label htmlFor="brand_name" className='text-xl underline'>Add Brand:</label>
                <br />
                <input type="text" value={name} className='bg-blue-100 border-2 border-blue-500 p-1 my-3 w-1/2' id='brand_name' name='brand_name' onChange={(e) => setName(e.target.value)} />
                <br />
                <button onClick={addBrand} disabled={addLoading} className="px-4 py-2 rounded border border-gray-500 hover:text-white hover:bg-gray-800 cursor-pointer">{addLoading ? (
                    <div className="flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".14" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".29" transform="rotate(30 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".43" transform="rotate(60 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".57" transform="rotate(90 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".71" transform="rotate(120 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".86" transform="rotate(150 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" transform="rotate(180 12 12)" /><animateTransform attributeName="transform" calcMode="discrete" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12" /></g></svg>
                    </div>
                ) : 'Add Brand'}</button>
            </form>



            <h1 className='text-center my-10 text-2xl font-semibold underline'>Brand Details</h1>

            {loading ?

                (
                    <div className="flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".14" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".29" transform="rotate(30 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".43" transform="rotate(60 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".57" transform="rotate(90 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".71" transform="rotate(120 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".86" transform="rotate(150 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" transform="rotate(180 12 12)" /><animateTransform attributeName="transform" calcMode="discrete" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12" /></g></svg>
                    </div>
                )

                :

                (
                    <table className="w-3/4 mx-auto mt-6 border border-blue-500 rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-blue-300 text-gray-700 text-lg">
                                <th className="py-2 px-4 border-b border-gray-300">Brand Name</th>
                                <th className="py-2 px-4 border-b border-gray-300">Edit</th>
                                <th className="py-2 px-4 border-b border-gray-300">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fillBrands.map((brand) => (
                                <tr
                                    key={brand.id}
                                    className=""
                                >
                                    <td className="py-2 px-4 border border-blue-300">{brand.name}</td>
                                    <td
                                        className="text-2xl py-2 px-4 border border-blue-300 text-gray-500 hover:bg-gray-100 cursor-pointer text-center"
                                        onClick={() => navigate(`/brands/${brand.id}/update/${brand.name}`)}
                                    >
                                        ✎
                                    </td>
                                    <td
                                        className="text-2xl py-2 px-4 border border-blue-300 hover:bg-gray-100 cursor-pointer text-center"
                                        onClick={() => navigate(`/brands/${brand.id}/delete/${brand.name}`)}
                                    >
                                        🗑
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )

            }

        </>
    )
}

export default Brands