import React, {useState, useEffect} from "react";
import axios from '../../api/axios'
import {AxiosRequestConfig, AxiosResponse} from "axios";
import Row, {IRow} from "../Row/Row";
import './Pokemon.css'


const Pokemon = () => {
    const [pokemon, setPokemon] = useState<IRow[]>([])


    const pokeFetch = async (i: number) => {
        const info = await axios.get<AxiosRequestConfig, AxiosResponse>(`pokemon/${i}`)
        const about = await  axios.get<AxiosResponse, AxiosResponse>(`evolution-chain/${i}`)
        const img = Object.keys(info.data.sprites.other).map(element => {
            return info.data.sprites.other[element].front_default
        })

        return {info, about, img}
    }

    const click = async (): Promise<void> => {
        const copyArr = [...pokemon]
        for(let i = 1; i < 60; i++) {
            const pokeObj = {
                img: await pokeFetch(i).then(res => res.img[1]),
                name: await pokeFetch(i).then(res => res.info.data.name),
                is_baby: await pokeFetch(i).then(res => res.about.data.chain.is_baby),
                hp: await pokeFetch(i).then(res => res.info.data.stats[0].base_stat),
                attack: await pokeFetch(i).then(res => res.info.data.stats[1].base_stat),
                height: await pokeFetch(i).then(res => res.info.data.height)
            }
            copyArr.push(pokeObj)
        }
        console.log(copyArr)
        setPokemon(copyArr)
    }

    return (
        <div className='tab'>
            <button onClick={() => click()}>Show Pokemon</button>
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
