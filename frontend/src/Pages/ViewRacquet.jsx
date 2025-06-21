import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL;
const ViewRacquet = () => {
    const { id } = useParams();

    const [racquetData, SetRacquetData] = useState({});
    const [loadingData, setLoadingData] = useState(true);

    const getRacquetData = async () => {
        try {
            setLoadingData(true)
            const response = await axios.get(`${API_URL}/racquets/${id}/get`);
            SetRacquetData(response.data.data)
        } catch (err) {
            console.log(err);
        } finally {
            setLoadingData(false)
        }

    }

    useEffect(() => {
        getRacquetData();
    }, [])
    return (
        <>

            {loadingData ?
                (
                    <div className="h-[100vh] flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><g><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".14" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".29" transform="rotate(30 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".43" transform="rotate(60 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".57" transform="rotate(90 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".71" transform="rotate(120 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".86" transform="rotate(150 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" transform="rotate(180 12 12)" /><animateTransform attributeName="transform" calcMode="discrete" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12" /></g></svg>
                    </div>
                )
                :
                (
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
                )

            }
        </>
    )
}

export default ViewRacquet