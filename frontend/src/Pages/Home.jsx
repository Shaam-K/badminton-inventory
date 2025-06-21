import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL;

import ViewRacquets from '../components/ViewRacquets'
const Home = () => {
  // filling forms
  const [fillBrands, setFillBrands] = useState([]);
  const [racquetsData, setRacquetsData] = useState([]);

  const [toggleMenu, setToggleMenu] = useState(false);

  const [filterSwitch, SetFilterSwitch] = useState(false);
  const [loadingContent, setLoadingContent] = useState(true);
  const [loadingBrands, setLoadingBrands] = useState(true);

  // keeping track of selections

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedWeights, setSelectedWeights] = useState([]);
  const [selectedGrips, setSelectedGrips] = useState([]);
  const [selectedBalances, setSelectedBalances] = useState([]);

  // apply loader

  const [filterLoading, setFilterLoading] = useState(false);

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
      setLoadingBrands(true)
      const response = await axios.get(`${API_URL}/brands`);
      setFillBrands(response.data.data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    } finally {
      setLoadingBrands(false)
    }
  };

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
      try {
        await GetAllRacquets();
        setLoadingContent(true);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingContent(false);
      }
    } else {
      try {
        await GetFilteredRacquets();
        setLoadingContent(true);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingContent(false);
      }
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
    SetFilterSwitch(true);
    OPFilter();
  }, []);

  const submitFilter = async (e) => {
    e.preventDefault();

    try {
      setFilterLoading(true)
      await OPFilter();
    } catch (err) {
      console.log(err);
    } finally {
      setFilterLoading(false)
      SetFilterSwitch(false)
      setToggleMenu(false);
    }
  }

  return (
    <section className='grid md:grid-cols-[20vw_auto] h-screen gap-3'>
      <button onClick={() => {setToggleMenu((prev) => !prev)}} className='cursor-pointer md:hidden block max-h-sm w-full p-3 bg-blue-400 text-white'>{toggleMenu ? "Close Filters" : "Open Filters"}</button>
      <form className={`${toggleMenu ? 'flex' : 'hidden'} md:flex h-min flex flex-col gap-4 border-r-1 border-b-1`}>
        <div className='p-3'>
          <div className='flex gap-6 items-center'>
            <h1 className='text-xl text-blue-600 cursor-pointer' onClick={ResetFilter}>Reset Filters</h1>
            <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 20q-3.35 0-5.675-2.325T4 12t2.325-5.675T12 4q1.725 0 3.3.712T18 6.75V4h2v7h-7V9h4.2q-.8-1.4-2.187-2.2T12 6Q9.5 6 7.75 7.75T6 12t1.75 4.25T12 18q1.925 0 3.475-1.1T17.65 14h2.1q-.7 2.65-2.85 4.325T12 20" /></svg>
          </div>

          <div className='border-b-1 my-3'></div>
          <div className="md:flex block items-center gap-3 mb-1">
            <h1 className='text-lg font-semibold'>Brands</h1>
            <Link to="/brands" className='text-md cursor-pointer underline'>Edit</Link>
          </div>
          {loadingBrands ? (
            <div className="flex items-center justify-left">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".14" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".29" transform="rotate(30 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".43" transform="rotate(60 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".57" transform="rotate(90 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".71" transform="rotate(120 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".86" transform="rotate(150 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" transform="rotate(180 12 12)" /><animateTransform attributeName="transform" calcMode="discrete" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12" /></g></svg>
            </div>
          )
            :
            (
              (fillBrands.map((brand, ind) => {
                return (
                  <div className='flex gap-3' key={ind}>
                    <input type="checkbox" id={`brand_${ind}`} name="brand" value={brand.id} checked={selectedBrands.includes(brand.id)} onChange={() => updateSelection(brand.id, selectedBrands, setSelectedBrands, "selectedBrands")} />
                    <label htmlFor={`brand_${ind}`}>{brand.name}</label>
                  </div>
                )

              }))
            )
          }
        </div>

        <div className='border-b-1'></div>

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

        <div className='border-b-1'></div>

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

        <div className='border-b-1'></div>

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



        {filterSwitch && <button onClick={submitFilter} disabled={filterLoading} className="w-full bg-blue-400 p-3 hover:bg-blue-500 hover:text-white cursor-pointer transition-all">{filterLoading ? (
          <div className="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".14" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".29" transform="rotate(30 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".43" transform="rotate(60 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".57" transform="rotate(90 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".71" transform="rotate(120 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".86" transform="rotate(150 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" transform="rotate(180 12 12)" /><animateTransform attributeName="transform" calcMode="discrete" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12" /></g></svg>
          </div>
        ) : 'Apply'}</button>
        }
      </form>

      <ViewRacquets filtered_racquets={racquetsData} loading={loadingContent} />


    </section>
  );
};

export default Home;
