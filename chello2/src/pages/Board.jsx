import { useParams } from "react-router-dom"

export default function Board(){
    const id = useParams();
    console.log(id.id)
    return (
        <div>
            <h1>testingggg</h1>
        </div>

    )
}