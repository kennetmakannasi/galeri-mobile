import axios from "axios";
import ScrollGrid from "../components/scrollGrid";
import { useEffect, useState } from "react";
import { UseToken } from "../helpers/useToken";
import { Link } from "react-router";

export default function ImageScrollSection() {

  const baseUrl = import.meta.env.VITE_API_URL;
  const [data, setData] = useState();

  async function fetchData() {
    const res = await axios.get(`${baseUrl}/api/post?page=1&from=trending`,{
       headers: {
        Authorization: `Bearer ${UseToken()}`
      }
    });
    setData(res.data.content);
  }

  useEffect(()=>{
    fetchData();
  },[])

  return (
    <div className="w-full px-4 md:px-12 py-6">
      <h2 className="text-xl font-bold mb-4 text-bright-yellow">
        Tren<span className="text-white">ding</span>
      </h2>
      {/* Scroll horizontal gambar */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 w-full gap-6">
        {data?.map((item, index) => (
          <Link to={`/post/${item.id}`}>
            <div className="w-full h-64 relative">
              <div className="absolute size-full inset-0 rounded-lg bg-black opacity-0 hover:opacity-30 transition-all duration-150"></div>
              <img
                src={baseUrl + item.image_url}
                alt={`Gambar ${index + 1}`}
                className="size-full h-64 object-cover rounded-lg"
              /> 
            </div>

          </Link>
        )) || [...Array(10)].map((index)=>(
          <div className="w-full h-64 bg-dark-gray rounded-lg animate-pulse"></div>
        ))}
      </div>

      <div className="my-10">
        <div>
          <h2 className="text-xl font-bold mb-4 text-white">
            See What's <span className="text-bright-yellow">New</span> on
          </h2>
        </div>
        <ScrollGrid endpoint={'post'}/>
      </div>
    </div>
  );
}
