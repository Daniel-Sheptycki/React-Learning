/* eslint-disable react/prop-types */
export default function Recipt(props) {
    const product = props.product;
    return (
        <li>{product.title} - {product.price}</li>
    )
}