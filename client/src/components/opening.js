function JobOpening(props) {
    return (
        <div>
            <p>{props.job.title}</p>
            <p>{props.job.position}</p>
            <p>{props.job.department}</p>
        </div>
    )
}

export default JobOpening;