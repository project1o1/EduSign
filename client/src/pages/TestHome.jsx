import { useEffect, useState } from "react"
import TestCard from "../components/TestCard";
import PreviousTests from "../components/PreviousTests";
import { v4 as uuidv4 } from "uuid";

const api = "http://localhost:3000"
function TestHome() {
    const [types, setTypes] = useState([]);

    useEffect(() => {
        fetch(api+"/types")
            .then((res) => res.json())
            .then((data) => {
                setTypes(data)
                // console.log(data)
            });
    }
    , []);

    return (
        <div>
            <div>
                <PreviousTests />
            </div>
            <div>
                {types.map((type) => (
                    <TestCard key={uuidv4()} image={type.image_url} title={type.type} />
                ))
                }
            </div>
        </div>
    )
}

export default TestHome