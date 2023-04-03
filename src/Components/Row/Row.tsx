import React from "react";
import './Row.css'

export interface IRow {
    img: string
    name: string
    is_baby: boolean
    hp: number
    attack: number
    height: number

}

const Row = ({img, name, hp, attack, height, is_baby}: IRow) => {
    return (
        <div className='row'>
            <img src={img} alt="picture"/>
            <h3>{name}</h3>
            <p>{is_baby ? 'Baby' : 'Adult' }</p>
            <p>health point: {hp}</p>
            <p>attack: {attack}</p>
            <p>height: {height}</p>
        </div>
    )
}

export default Row