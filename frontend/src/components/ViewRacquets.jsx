import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

const ViewRacquets = ({ filtered_racquets, loading }) => {
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
      {loading ? (
        <div className="flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><g><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".14" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".29" transform="rotate(30 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".43" transform="rotate(60 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".57" transform="rotate(90 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".71" transform="rotate(120 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".86" transform="rotate(150 12 12)" /><rect width="2" height="5" x="11" y="1" fill="currentColor" transform="rotate(180 12 12)" /><animateTransform attributeName="transform" calcMode="discrete" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12" /></g></svg>
        </div>

      ) : (
        isEmpty ? (
          <div className="text-center text-gray-500 mt-10 text-lg">No racquets found :/</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-20 mt-5 place-items-center mx-10">
            {filtered_racquets.map((racquet, ind) => (
              <Link
                to={`/${racquet.id}/get`}
                key={ind}
                className="w-full max-h-md shadow-md rounded-md p-3 overflow-hidden flex flex-col justify-between"
              >
                <img
                  className="mx-auto w-full h-100 object-contain rounded"
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
        )
      )}
    </>
  );
};

export default ViewRacquets;
