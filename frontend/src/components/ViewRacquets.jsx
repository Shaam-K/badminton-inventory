import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

const ViewRacquets = ({ filtered_racquets }) => {
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (!filtered_racquets || filtered_racquets.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [filtered_racquets]);

  return (
    <>
      {isEmpty ? (
        <div className="text-center text-gray-500 mt-10 text-lg">No racquets found :/</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-20 mt-5 place-items-stretch ml-10">
          {filtered_racquets.map((racquet, ind) => (
            <Link
              to={`/${racquet.id}/get`}
              key={ind}
              className="max-w-md h-min shadow-md rounded-md p-3 overflow-hidden md:flex flex-col gap-5"
            >
              <img
                className="w-full object-cover"
                src={`${API_URL}/uploads/${racquet.image_path}`}
                alt="Racquet"
              />
              <div className="py-2 px-4">
                <h1 className="text-lg mb-1">{racquet.racquet_name}</h1>
                <div className="flex gap-3 italic">
                  <span>{racquet.brand_name}</span>
                  <span>/</span>
                  <span>{racquet.balance_point}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default ViewRacquets;
