import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL;
const ViewRacquet = () => {
    const { id } = useParams();

    const [racquetData, SetRacquetData] = useState({});

    const getRacquetData = async () => {
        try {
            const response = await axios.get(`${API_URL}/racquets/${id}/get`);
            SetRacquetData(response.data.data)
        } catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        getRacquetData();
    }, [])
    return (
        <>
            <div className='grid md:grid-cols-2 grid-cols-1 md:place-items-center p-3 w-full md:h-[80vh]'>
                <img
                    className="md:max-w-md max-w-sm my-5 md:block mx-auto md:mx-0"
                    src={`${API_URL}/uploads/${racquetData.image_path}`}
                    alt="pic of racquet"
                />
                <div>
                    <div className='flex flex-col gap-3 text-lg'>
                        <h1 className='text-xl font-semibold'>{racquetData.racquet_name}</h1>
                        <h2>Brand: {racquetData.brand_name}</h2>
                        <h2>Balance Point: {racquetData.balance_point}</h2>
                        <h2 className='underline font-semibold'>Grip sizes</h2>
                        <div className='flex gap-3'>
                            {racquetData.grip_sizes?.map((grip, ind) => {
                                return (
                                    <p key={ind}>{grip}</p>
                                )
                            })}

                        </div>
                        <h2 className='underline font-semibold'>Weights</h2>
                        <div className='flex gap-3'>
                            {racquetData.weights?.map((weight, ind) => {
                                return (
                                    <p key={ind}>{weight}</p>
                                )
                            })}
                        </div>
                    </div>

                    <div className='flex gap-3 my-5'>
                        <Link className='border-2 p-3 text-green-300 hover:text-white hover:bg-green-300 transition-all rounded-sm' to={`/${id}/update`}>Update Racquet</Link>
                        <Link className='border-2 p-3 text-red-300 hover:text-white hover:bg-red-300 transition-all rounded-sm' to={`/${id}/delete`}>Delete Racquet</Link>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ViewRacquet