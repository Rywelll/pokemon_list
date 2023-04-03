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
            <img className='size' src={img} alt="pokemon"/>
            <h3 className='size'>{name}</h3>
            <p className='size'>{is_baby ? 'Baby' : 'Adult' }</p>
            <p className='size'>health point: {hp}</p>
            <p className='size'>attack: {attack}</p>
            <p className='size'>height: {height}</p>
        </div>
    )
}

export default Row