import { useEffect, useState } from "react";


function Test() {
    const [courses, setCourses] = useState([]);
    const [reload, setReload] = useState(false);
    useEffect(() => {
        fetch('http://localhost:8010/api/courses')
        .then(response => response.json())
        .then(data => {
            setCourses(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    },  [reload]);

    return (
        <div>
        Nombre de cours : {courses.length}

        <button onClick={() => setReload(!reload)}>Reload</button>
        </div>
    );
    }

export default Test;