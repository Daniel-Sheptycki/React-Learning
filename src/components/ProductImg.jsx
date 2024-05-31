/* eslint-disable react/prop-types */
export default function ProductImg(props) {
    return (
        <div className="img-container">
            <img src={props.src} alt={props.alt} />
        </div>
    )
}