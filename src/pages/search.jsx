import { useSearchParams } from "react-router"
import ScrollGrid from "../components/scrollGrid";
import SearchBar from "../components/searchbar";

export default function SearchPage(){

    const [searchParams] = useSearchParams();
    const param = searchParams.get('q')

    return(
        <div className="px-4 md:px-12 py-8">
            <SearchBar/>
            {param ? (
                <ScrollGrid endpoint={'post/search'} searchQuery={param}/>   
            ):(
                <div className="h-screen w-full">
                    <p>Enter a keyword</p>
                </div>
            )}
             
        </div>
    )
}