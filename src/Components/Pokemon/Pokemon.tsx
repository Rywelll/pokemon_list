import React, {useState, useEffect} from "react";
import axios from '../../api/axios'
import {AxiosRequestConfig, AxiosResponse} from "axios";
import Row, {IRow} from "../Row/Row";
import './Pokemon.css'


const Pokemon = () => {
    const [pokemon, setPokemon] = useState([{
        img: '',
        name: '',
        is_baby: true,
        hp: 0,
        attack: 0,
        height: 0
    }])

    const pokeFetch = async (i: number) => {
        const info = await axios.get<AxiosRequestConfig, AxiosResponse>(`pokemon/${i}`)
        const about = await  axios.get<AxiosResponse, AxiosResponse>(`evolution-chain/${i}`)
        const img = Object.keys(info.data.sprites.other).map(element => {
            return info.data.sprites.other[element].front_default
        })
        const pokeObj: IRow[] = [{
            img: img[2],
            name: info.data.name,
            is_baby: about.data.chain.is_baby,
            hp: info.data.stats[0].base_stat,
            attack: info.data.stats[1].base_stat,
            height: info.data.height
        }]
        setPokemon(pokeObj)
    }

    useEffect(() => {
        for(let i = 1; i <= 25; i++) {
            pokeFetch(i)
            console.log(i)
        }
    }, [])


    return (
        <div className='tab'>
            <div className='headTab'>
                <h3>Image</h3>
                <h3>Name</h3>
                <h3>Age</h3>
                <h3>Health</h3>
                <h3>Attack</h3>
                <h3>Height</h3>
            </div>
            {pokemon.map((element, key) => {
                return(
                    <Row key={key}
                         img={element.img}
                         name={element.name}
                         is_baby={element.is_baby}
                         hp={element.hp}
                         attack={element.attack}
                         height={element.height}/>
                )
            })}
        </div>
    )
}

export default Pokemon


// {
//     img: '',
//         name: '',
//     is_baby: true,
//     hp: 0,
//     attack: 0,
//     height: 0
// }