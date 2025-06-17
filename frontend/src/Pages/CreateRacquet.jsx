import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
const CreateRacquet = () => {
    const navigate = useNavigate();
    
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
    const [imageFile, setImageFile] = useState(null);

    // img preview

    const [imagePreview, setImagePreview] = useState(null);

    // fetching

    const fetchBrands = async () => {
        try {
            const response = await axios.get(`${API_URL}/brands`);
            setFillBrands(response.data.data);
        } catch (err) {
            console.log(err);

        }
    }

    const fetchBalancePoints = async () => {
        try {
            const response = await axios.get(`${API_URL}/racquets/balance`);
            setFillBPoints(response.data.data);
        } catch (err) {
            console.log(err);
        }
    }

    const fetchWeights = async () => {
        try {
            const response = await axios.get(`${API_URL}/racquets/weights`);
            setFillWeights(response.data.data);
        } catch (err) {
            console.log(err);
        }
    }

    const fetchGrips = async () => {
        try {
            const response = await axios.get(`${API_URL}/racquets/grips`);
            setFillGrips(response.data.data);
        } catch (err) {
            console.log(err);
        }
    }

    // handling weights and grip inputs

    const HandleOnChange = (value, state_fn) => {
        state_fn((prev) => {
            if (prev.includes(value)) {
                return prev.filter((v) => v != value)
            } else {
                return [...prev, value]
            }
        })
    }

    // handling submit

    const HandleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            // Append text fields
            formData.append("racquet_name", racquetName);
            formData.append("brand_id", brand);
            formData.append("balance_point", balpoint);

            // Append the image file
            formData.append("racquet_image", imageFile);

            // Append multiple weights and grips
            weights.forEach((weight) => formData.append("weights[]", weight));
            grips.forEach((grip) => formData.append("grip_sizes[]", grip));

            // Send the request
            const response = await axios.post(`${API_URL}/racquets/create`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });

            if (response.status === 200) {
                navigate('/'); // Redirect after success
            }

        } catch (err) {
            console.error("Upload failed", err);
        }
    };

    // loading 

    useEffect(() => {
        fetchBrands();
        fetchBalancePoints();
        fetchWeights();
        fetchGrips();
    }, [])

    // testing

    useEffect(() => {

    }, [balpoint])

    return (
        <section className="flex flex-col justify-center items-center mt-5">
            <h1 className="text-xl font-semibold underline">CREATE RACQUET</h1>
            <form onSubmit={HandleSubmit} method="post" encType="multipart/form-data" className="flex flex-col items-left xl:w-[40%] md:w-[60%] w-[90%]">

                <div className="flex flex-col items-center my-3 border-5 border-blue-200 bg-blue-100 p-15 rounded-md">
                    <h1 className="my-3 font-semibold text-lg text-blue-700">Upload Image</h1>
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

                    {imagePreview && <img src={imagePreview} alt="preview" />}
                </div>
                <div className="flex flex-col my-3">
                    <label htmlFor="racquet_name" className="my-1 font-semibold text-lg">Racquet Name</label>
                    <input type="text" placeholder="Enter name" name="racquet_name" id="racquet_name" onChange={(e) => setRacquetName(e.target.value)} className="bg-blue-100 border-2 border-blue-500 p-1" />
                </div>

                <div className="flex flex-col my-3">
                    <label htmlFor="brand_id" className="my-1 font-semibold text-lg">Brand</label>
                    <select id="brand_id" name="brand_id" className="bg-blue-100 border-2 border-blue-500 p-1" onChange={(e) => setBrand(e.target.value)}>
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
                    <select name="balance_point" id="balance_point" className="bg-blue-100 border-2 border-blue-500 p-1" onChange={(e) => setBalPoint(e.target.value)}>
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
                                    <input type="checkbox" id="U" name="weight" value="U" onChange={() => HandleOnChange("U", setWeights)} />
                                    <label htmlFor="U" >U</label>
                            </div>
                            <div className='flex gap-3'>
                                    <input type="checkbox" id="2U" name="weight" value="2U" onChange={() => HandleOnChange("2U", setWeights)} />
                                    <label htmlFor="2U" >2U</label>
                            </div>
                            <div className='flex gap-3'>
                                    <input type="checkbox" id="3U" name="weight" value="3U" onChange={() => HandleOnChange("3U", setWeights)} />
                                    <label htmlFor="3U" >3U</label>
                            </div>
                            <div className='flex gap-3'>
                                    <input type="checkbox" id="4U" name="weight" value="4U" onChange={() => HandleOnChange("4U", setWeights)} />
                                    <label htmlFor="4U" >4U</label>
                            </div>
                            <div className='flex gap-3'>
                                    <input type="checkbox" id="5U" name="weight" value="5U" onChange={() => HandleOnChange("5U", setWeights)} />
                                    <label htmlFor="5U" >5U</label>
                            </div>
                            <div className='flex gap-3'>
                                    <input type="checkbox" id="F" name="weight" value="F" onChange={() => HandleOnChange("F", setWeights)} />
                                    <label htmlFor="F" >F</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col my-3">
                    <div>
                        <h1 className="my-1 font-semibold text-lg">Grips</h1>
                        <div className='grid grid-cols-2 gap-3 my-3'>

                            <div className='flex gap-3'>
                                <input type="checkbox" id="G1" name="grip" value="G1" onChange={() => HandleOnChange("G1", setGrips)} />
                                <label htmlFor="G1">G1</label>
                            </div>

                            <div className='flex gap-3'>
                                <input type="checkbox" id="G2" name="grip" value="G2" onChange={() => HandleOnChange("G2", setGrips)} />
                                <label htmlFor="G2">G2</label>
                            </div>

                            <div className='flex gap-3'>
                                <input type="checkbox" id="G3" name="grip" value="G3" onChange={() => HandleOnChange("G3", setGrips)} />
                                <label htmlFor="G3">G3</label>
                            </div>

                            <div className='flex gap-3'>
                                <input type="checkbox" id="G4" name="grip" value="G4" onChange={() => HandleOnChange("G4", setGrips)} />
                                <label htmlFor="G4">G4</label>
                            </div>

                            <div className='flex gap-3'>
                                <input type="checkbox" id="G5" name="grip" value="G5" onChange={() => HandleOnChange("G5", setGrips)} />
                                <label htmlFor="G5">G5</label>
                            </div>

                            <div className='flex gap-3'>
                                <input type="checkbox" id="G6" name="grip" value="G6" onChange={() => HandleOnChange("G6", setGrips)} />
                                <label htmlFor="G6">G6</label>
                            </div>
                        </div>

                    </div>
                </div>

                <input type="submit" value="Create Racquet" className="my-3 bg-blue-300 p-3 hover:bg-blue-500 hover:text-white cursor-pointer transition-all" />

            </form>
        </section>
    )
}

export default CreateRacquet