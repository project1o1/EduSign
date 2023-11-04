import { useEffect, useState } from "react"
import TestCard from "../components/TestCard";

const api = "http://localhost:3000"
function TestHome() {
    const [types, setTypes] = useState([]);

    useEffect(() => {
        fetch(api+"/types")
            .then((res) => res.json())
            .then((data) => {
                setTypes(data)
                console.log(data)
            });
    }
    , []);

    return (
        <div>
            {types.map((type) => (
                <TestCard key={type.id} image={type.image_url} title={type.type} />
            ))
            }
        </div>
    )
}

export default TestHome