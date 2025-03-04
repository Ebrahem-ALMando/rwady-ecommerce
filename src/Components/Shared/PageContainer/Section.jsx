const Section=(props)=>{
    return (
        <section>
            <h2>{props.title}</h2>
            <p>
                {props.description}
            </p>
        </section>
    )
}
export default Section