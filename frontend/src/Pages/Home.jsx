import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL;

import ViewRacquets from '../components/ViewRacquets'
const Home = () => {
  // filling forms
  const [fillBrands, setFillBrands] = useState([]);
  const [fillWeights, setFillWeights] = useState([]);
  const [fillGrips, setFillGrips] = useState([]);
  const [fillBalances, setFillBalances] = useState([]);
  const [racquetsData, setRacquetsData] = useState([]);

  const [filterSwitch, SetFilterSwitch] = useState(false);

  // keeping track of selections

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedWeights, setSelectedWeights] = useState([]);
  const [selectedGrips, setSelectedGrips] = useState([]);
  const [selectedBalances, setSelectedBalances] = useState([]);

  const updateSelection = (value, selected_array, set_selected_array, key) => {
    let updated;

    if (selected_array.includes(value)) {
      updated = selected_array.filter((v) => v !== value);
    } else {
      updated = [...selected_array, value]
    }

    set_selected_array(updated)
    SetFilterSwitch(true);

    localStorage.setItem(key, JSON.stringify(updated));
  }

  const fetchBrands = async () => {
    try {
      const response = await axios.get(`${API_URL}/brands`);
      setFillBrands(response.data.data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const fetchWeights = async () => {
    try {
      const response = await axios.get(`${API_URL}/racquets/weights`);
      const weights = response.data.data;
      setFillWeights(weights);
    } catch (err) {
      console.log(err);
    }
  }

  const fetchGrips = async () => {
    try {
      const response = await axios.get(`${API_URL}/racquets/grips`);
      const grips = response.data.data;
      setFillGrips(grips);
    } catch (err) {
      console.log(err);
    }
  }

  const fetchBalancePoints = async () => {
    try {
      const response = await axios.get(`${API_URL}/racquets/balance`);
      const balances = response.data.data;
      setFillBalances(balances);
    } catch (err) {
      console.log(err);
    }
  }

  const GetAllRacquets = async () => {
    const response = await axios.get(`${API_URL}/racquets/`)
    setRacquetsData(response.data.data)
  }

  const GetFilteredRacquets = async () => {
    const response = await axios.post(`${API_URL}/racquets/filter`, {
      brand: selectedBrands,
      weight: selectedWeights,
      grip: selectedGrips,
      balances: selectedBalances
    })

    setRacquetsData(response.data.data)
  }

  const OPFilter = async () => {
    if (selectedBrands.length == 0 && selectedWeights.length == 0 && selectedGrips.length == 0 && selectedBalances == 0) {
      await GetAllRacquets();
    } else {
      await GetFilteredRacquets();
    }
  }

  const ResetFilter = async () => {
    setSelectedBrands([]);
    setSelectedWeights([]);
    setSelectedGrips([]);
    setSelectedBalances([]);

    // removing localhost items
    localStorage.removeItem("selectedBrands");
    localStorage.removeItem("selectedWeights");
    localStorage.removeItem("selectedGrips");
    localStorage.removeItem("selectedBalances");

    SetFilterSwitch(true);
    await GetAllRacquets();

  }

  useEffect(() => {
    const storedBrands = JSON.parse(localStorage.getItem("selectedBrands")) || [];
    const storedWeights = JSON.parse(localStorage.getItem("selectedWeights")) || [];
    const storedGrips = JSON.parse(localStorage.getItem("selectedGrips")) || [];
    const storedBalances = JSON.parse(localStorage.getItem("selectedBalances")) || [];

    setSelectedBrands(storedBrands);
    setSelectedWeights(storedWeights);
    setSelectedGrips(storedGrips);
    setSelectedBalances(storedBalances)

    fetchBrands();
    fetchWeights();
    fetchGrips();
    fetchBalancePoints();
    SetFilterSwitch(true);
    OPFilter();
  }, []);

  const submitFilter = async (e) => {
    e.preventDefault();
    await OPFilter();
    SetFilterSwitch(false)
  }

  return (
    <section className='grid grid-cols-[20vw_auto] h-screen gap-3'>
      <form onSubmit={submitFilter} className='flex flex-col gap-10 border-r-1 border-b-1 h-min'>
        <div className='p-3'>
          <h1 className='text-xl cursor-pointer' onClick={ResetFilter}>Reset Filters</h1>
          <div className='border-b-1 my-3'></div>
          <div className="md:flex block items-center gap-3 mb-1">
            <h1 className='text-lg font-semibold'>Brands</h1>
            <Link to="/brands" className='text-md cursor-pointer underline'>Edit</Link>
          </div>
          {fillBrands.map((brand, ind) => {
            return (
              <div className='flex gap-3' key={ind}>
                <input type="checkbox" id={`brand_${ind}`} name="brand" value={brand.id} checked={selectedBrands.includes(brand.id)} onChange={() => updateSelection(brand.id, selectedBrands, setSelectedBrands, "selectedBrands")} />
                <label htmlFor={`brand_${ind}`}>{brand.name}</label>
              </div>
            )

          })}
        </div>

        <span className='border-b-1'></span>

        <div className='p-3'>
          <h1 className='text-lg font-semibold mb-1'>Weights</h1>
          <div className='grid md:grid-cols-2 grid-cols-1'>

            <div className='flex gap-3'>
              <input type="checkbox" id="F" name="weight" value="F" checked={selectedWeights.includes("F")} onChange={() => updateSelection("F", selectedWeights, setSelectedWeights, "selectedWeights")} />
              <label htmlFor="F">F</label>
            </div>
            <div className='flex gap-3'>
              <input type="checkbox" id="5U" name="weight" value="5U" checked={selectedWeights.includes("5U")} onChange={() => updateSelection("5U", selectedWeights, setSelectedWeights, "selectedWeights")} />
              <label htmlFor="F">5U</label>
            </div>
            <div className='flex gap-3'>
              <input type="checkbox" id="4U" name="weight" value="4U" checked={selectedWeights.includes("4U")} onChange={() => updateSelection("4U", selectedWeights, setSelectedWeights, "selectedWeights")} />
              <label htmlFor="F">4U</label>
            </div>
            <div className='flex gap-3'>
              <input type="checkbox" id="3U" name="weight" value="3U" checked={selectedWeights.includes("3U")} onChange={() => updateSelection("3U", selectedWeights, setSelectedWeights, "selectedWeights")} />
              <label htmlFor="F">3U</label>
            </div>
            <div className='flex gap-3'>
              <input type="checkbox" id="F" name="weight" value="2U" checked={selectedWeights.includes("2U")} onChange={() => updateSelection("2U", selectedWeights, setSelectedWeights, "selectedWeights")} />
              <label htmlFor="F">2U</label>
            </div>
            <div className='flex gap-3'>
              <input type="checkbox" id="F" name="weight" value="U" checked={selectedWeights.includes("U")} onChange={() => updateSelection("U", selectedWeights, setSelectedWeights, "selectedWeights")} />
              <label htmlFor="F">U</label>
            </div>
          </div>
        </div>

        <span className='border-b-1'></span>

        <div className='p-3'>
          <h1 className='text-lg font-semibold mb-1'>Grips</h1>
          <div className='grid md:grid-cols-2 grid-cols-1'>
            <div className='flex gap-3'>
              <input type="checkbox" id="G1" name="grip" value="G1" checked={selectedGrips.includes("G1")} onChange={() => updateSelection("G1", selectedGrips, setSelectedGrips, "selectedGrips")} />
              <label htmlFor="G1">G1</label>
            </div>

            <div className='flex gap-3'>
              <input type="checkbox" id="G2" name="grip" value="G2" checked={selectedGrips.includes("G2")} onChange={() => updateSelection("G2", selectedGrips, setSelectedGrips, "selectedGrips")} />
              <label htmlFor="G2">G2</label>
            </div>

            <div className='flex gap-3'>
              <input type="checkbox" id="G3" name="grip" value="G3" checked={selectedGrips.includes("G3")} onChange={() => updateSelection("G3", selectedGrips, setSelectedGrips, "selectedGrips")} />
              <label htmlFor="G3">G3</label>
            </div>

            <div className='flex gap-3'>
              <input type="checkbox" id="G4" name="grip" value="G4" checked={selectedGrips.includes("G4")} onChange={() => updateSelection("G4", selectedGrips, setSelectedGrips, "selectedGrips")} />
              <label htmlFor="G4">G4</label>
            </div>

            <div className='flex gap-3'>
              <input type="checkbox" id="G5" name="grip" value="G5" checked={selectedGrips.includes("G5")} onChange={() => updateSelection("G5", selectedGrips, setSelectedGrips, "selectedGrips")} />
              <label htmlFor="G5">G5</label>
            </div>

            <div className='flex gap-3'>
              <input type="checkbox" id="G6" name="grip" value="G6" checked={selectedGrips.includes("G6")} onChange={() => updateSelection("G6", selectedGrips, setSelectedGrips, "selectedGrips")} />
              <label htmlFor="G6">G6</label>
            </div>
          </div>
        </div>

        <span className='border-b-1'></span>

        <div className='p-3'>
          <h1 className='text-lg font-semibold mb-1'>Balance Point</h1>
          <div className='grid md:grid-cols-2 grid-cols-1'>
            <div className='flex gap-3'>
              <input type="checkbox" id="head-light" name="balance" value="head-light" checked={selectedBalances.includes("head-light")} onChange={() => updateSelection("head-light", selectedBalances, setSelectedBalances, "selectedBalances")} />
              <label htmlFor="head-light">head-light</label>
            </div>
            <div className='flex gap-3'>
              <input type="checkbox" id="even" name="balance" value="even" checked={selectedBalances.includes("even")} onChange={() => updateSelection("even", selectedBalances, setSelectedBalances, "selectedBalances")} />
              <label htmlFor="even">even</label>
            </div>
            <div className='flex gap-3'>
              <input type="checkbox" id="head-heavy" name="balance" value="head-heavy" checked={selectedBalances.includes("head-heavy")} onChange={() => updateSelection("head-heavy", selectedBalances, setSelectedBalances, "selectedBalances")} />
              <label htmlFor="head-heavy">head-heavy</label>
            </div>
          </div>
        </div>



        {filterSwitch && <input className='text-center p-2 bg-blue-700 hover:bg-blue-500 cursor-pointer text-white' type="submit" value="Apply" />}

      </form>

      <ViewRacquets filtered_racquets={racquetsData} />


    </section>
  );
};

export default Home;
