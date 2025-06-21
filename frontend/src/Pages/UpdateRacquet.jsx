import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL;

const UpdateRacquet = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);

    // populate form

    const [fillBrands, setFillBrands] = useState([]);
    const [fillBPoints, setFillBPoints] = useState([]);
    const [fillWeights, setFillWeights] = useState([]);
    const [fillGrips, setFillGrips] = useState([]);

    // inputs

    const [racquetName, setRacquetName] = useState("");
    const [brand, setBrand] = useState("");
    const [weights, setWeights] = useState([]);
    const [grips, setGrips] = useState([])
    const [balpoint, setBalPoint] = useState("")

    const [uploadedImage, setUploadedImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [oldImage, setOldImage] = useState("");


    // setting inputs fetching details :)

    const fetchRacquetDetails = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${API_URL}/racquets/${id}/get`);
            const racquet = response.data.data;

            setRacquetName(racquet.racquet_name);
            setBrand(racquet.brand_id);
            setWeights(racquet.weights);
            setGrips(racquet.grip_sizes);
            setBalPoint(racquet.balance_point);

            const image_url = `${API_URL}/uploads/${racquet.image_path}`
            setUploadedImage(image_url);
            setOldImage(racquet.image_path);
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    // fetching 

    const fetchBrands = async () => {
        try {
            const response = await axios.get(`${API_URL}/brands`);
            setFillBrands(response.data.data);
        } catch (err) {
            console.log(err);

        }
    }

    const HandleOnChange = (value, state_fn) => {
        state_fn((prev) => {
            if (prev.includes(value)) {
                return prev.filter((v) => v != value)
            } else {
                return [...prev, value]
            }
        })
    }

    // handling form submission

    const [formLoading, setFormLoading] = useState(false);

    const HandleSubmit = async (e) => {
        e.preventDefault();
        try {
            setFormLoading(true)
            const formData = new FormData();

            // Append text fields
            formData.append("racquet_name", racquetName);
            formData.append("brand_id", brand);
            formData.append("balance_point", balpoint);

            // Append the image file
            formData.append("racquet_image", imageFile);
            formData.append("old_image", oldImage);

            // Append multiple weights and grips
            weights.forEach((weight) => formData.append("weights[]", weight));
            grips.forEach((grip) => formData.append("grip_sizes[]", grip));

            // Send the request
            const response = await axios.put(`${API_URL}/racquets/${id}/update`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });

            if (response.status === 200) {
                navigate(`/${id}/get`); // Redirect after success
            }

        } catch (err) {
            console.error("Upload failed", err);
        } finally {
            setFormLoading(false);
        }
    };


    useEffect(() => {
        fetchRacquetDetails();
        fetchBrands();
    }, [])


    return (

        <>
            {loading ?
                (<div className="flex items-center justify-center h-[100vh]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><g><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".14" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".29" transform="rotate(30 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".43" transform="rotate(60 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".57" transform="rotate(90 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".71" transform="rotate(120 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".86" transform="rotate(150 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" transform="rotate(180 12 12)" /><animateTransform attributeName="transform" calcMode="discrete" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12" /></g></svg>
                </div>
                )
                :
                (
                    <section className="flex flex-col justify-center items-center mt-5">
                        <h1 className="text-xl font-semibold underline">UPDATE RACQUET</h1>
                        <form method="put" encType="multipart/form-data" className="flex flex-col items-left xl:w-[40%] md:w-[60%] w-[90%]">

                            <div className="flex flex-col items-center my-3 border-5 border-blue-200 bg-blue-100 p-15 rounded-md">
                                <h1 className="my-1 font-semibold text-lg text-blue-700">Upload Image</h1>
                                <input type="file" accept="image/*" name="racquet_image" className="bg-blue-500 hover:bg-blue-400 cursor-pointer text-white font-semibold w-2/4 p-3 mb-10" onChange={(e) => {
                                    const file = e.target.files[0];
                                    setImageFile(file);

                                    const reader = new FileReader();

                                    if (file) {
                                        reader.readAsDataURL(file);
                                    }
                                    reader.onloadend = () => {
                                        setImagePreview(reader.result)
                                    };
                                }} />

                                {imagePreview ? <img src={imagePreview} alt="preview" /> : <img src={uploadedImage} alt="preview" />}
                            </div>
                            <div className="flex flex-col my-3">
                                <label htmlFor="racquet_name" className="my-1 font-semibold text-lg">Racquet Name</label>
                                <input type="text" value={racquetName} name="racquet_name" id="racquet_name" onChange={(e) => setRacquetName(e.target.value)} className="bg-blue-100 border-2 border-blue-500 p-1" />
                            </div>

                            <div className="flex flex-col my-3">
                                <label htmlFor="brand_id" className="my-1 font-semibold text-lg">Brand</label>
                                <select id="brand_id" name="brand_id" className="bg-blue-100 border-2 border-blue-500 p-1" onChange={(e) => setBrand(e.target.value)} value={brand}>
                                    <option value="">-- Select Brand --</option>
                                    {fillBrands.map((brand, ind) => {
                                        return (
                                            <option key={ind} value={brand.id}>{brand.name}</option>
                                        )
                                    })}
                                </select>
                            </div>

                            <div className="flex flex-col my-3">
                                <label htmlFor="balance_point" className="my-1 font-semibold text-lg">Balance Point</label>
                                <select name="balance_point" id="balance_point" className="bg-blue-100 border-2 border-blue-500 p-1" onChange={(e) => setBalPoint(e.target.value)} value={balpoint}>
                                    <option value="">-- Select Balance Point --</option>
                                    <option value="head-light">head-light</option>
                                    <option value="even">even</option>
                                    <option value="head-heavy">head-heavy</option>
                                </select>
                            </div>

                            <div className="flex flex-col my-3">
                                <div>
                                    <h1 className="my-1 font-semibold text-lg">Weights</h1>
                                    <div className="grid grid-cols-2 gap-3 my-3">
                                        <div className='flex gap-3'>
                                            <input type="checkbox" id="F" name="weight" value="F" checked={weights.includes("F")} onChange={() => HandleOnChange("F", setWeights)} />
                                            <label htmlFor="F" >F</label>
                                        </div>
                                        <div className='flex gap-3'>
                                            <input type="checkbox" id="5U" name="weight" value="5U" checked={weights.includes("5U")} onChange={() => HandleOnChange("5U", setWeights)} />
                                            <label htmlFor="5U" >5U</label>
                                        </div>
                                        <div className='flex gap-3'>
                                            <input type="checkbox" id="4U" name="weight" value="4U" checked={weights.includes("4U")} onChange={() => HandleOnChange("4U", setWeights)} />
                                            <label htmlFor="4U" >4U</label>
                                        </div>
                                        <div className='flex gap-3'>
                                            <input type="checkbox" id="3U" name="weight" value="3U" checked={weights.includes("3U")} onChange={() => HandleOnChange("3U", setWeights)} />
                                            <label htmlFor="3U" >3U</label>
                                        </div>
                                        <div className='flex gap-3'>
                                            <input type="checkbox" id="2U" name="weight" value="2U" checked={weights.includes("2U")} onChange={() => HandleOnChange("2U", setWeights)} />
                                            <label htmlFor="2U" >2U</label>
                                        </div>
                                        <div className='flex gap-3'>
                                            <input type="checkbox" id="U" name="weight" value="U" checked={weights.includes("U")} onChange={() => HandleOnChange("U", setWeights)} />
                                            <label htmlFor="U" >U</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col my-3">
                                <div>
                                    <h1 className="my-1 font-semibold text-lg">Grips</h1>
                                    <div className='grid grid-cols-2 gap-3 my-3'>
                                        <div className='flex gap-3'>
                                            <input type="checkbox" id="G1" name="grip" value="G1" checked={grips.includes("G1")} onChange={() => HandleOnChange("G1", setGrips)} />
                                            <label htmlFor="G1">G1</label>
                                        </div>

                                        <div className='flex gap-3'>
                                            <input type="checkbox" id="G2" name="grip" value="G2" checked={grips.includes("G2")} onChange={() => HandleOnChange("G2", setGrips)} />
                                            <label htmlFor="G2">G2</label>
                                        </div>

                                        <div className='flex gap-3'>
                                            <input type="checkbox" id="G3" name="grip" value="G3" checked={grips.includes("G3")} onChange={() => HandleOnChange("G3", setGrips)} />
                                            <label htmlFor="G3">G3</label>
                                        </div>

                                        <div className='flex gap-3'>
                                            <input type="checkbox" id="G4" name="grip" value="G4" checked={grips.includes("G4")} onChange={() => HandleOnChange("G4", setGrips)} />
                                            <label htmlFor="G4">G4</label>
                                        </div>

                                        <div className='flex gap-3'>
                                            <input type="checkbox" id="G5" name="grip" value="G5" checked={grips.includes("G5")} onChange={() => HandleOnChange("G5", setGrips)} />
                                            <label htmlFor="G5">G5</label>
                                        </div>

                                        <div className='flex gap-3'>
                                            <input type="checkbox" id="G6" name="grip" value="G6" checked={grips.includes("G6")} onChange={() => HandleOnChange("G6", setGrips)} />
                                            <label htmlFor="G6">G6</label>
                                        </div>

                                    </div>

                                </div>
                            </div>

                            <button onClick={HandleSubmit} disabled={formLoading} className="my-3 bg-blue-300 p-3 hover:bg-blue-500 hover:text-white cursor-pointer transition-all">{formLoading ? (
                                <div className="flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".14" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".29" transform="rotate(30 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".43" transform="rotate(60 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".57" transform="rotate(90 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".71" transform="rotate(120 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".86" transform="rotate(150 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" transform="rotate(180 12 12)" /><animateTransform attributeName="transform" calcMode="discrete" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12" /></g></svg>
                                </div>
                            ) : 'Update Racquet'}</button>

                        </form>
                    </section>
                )
            }
        </>


    )
}

export default UpdateRacquet