// const Section=(props)=>{
//     return (
//         <section>
//             <h2>{props.title}</h2>
//             <p>
//                 {props.description}
//             </p>
//         </section>
//     )
// }
// export default Section

const Section=({data})=>{
    return (
        <section>
            <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{__html: data}}
            />
        </section>
    )
}
export default Section