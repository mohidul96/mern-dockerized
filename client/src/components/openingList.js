import React from 'react';
import JobOpening from './opening'

function OpeningList() {

    const [jobs, setjobs] = React.useState([])

    React.useEffect( () => {
        const url = 'http://127.0.0.1:5000/openings';

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                console.log(json);
                setjobs(json);
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchData();
    }, [])

    const job_openings = jobs?.map(job => <JobOpening key={job.id} job={job}/>)

    return (
        <div>
            {job_openings} 
        </div>
    )
}

export default OpeningList;