import React, {useEffect, useState} from "react";
import axios from '../../api/axios'
import {AxiosRequestConfig, AxiosResponse} from "axios";
import Row, {IRow} from "../../Components/Row/Row";
import './Pokemon.css'


const Pokemon = () => {
    const [pokemon, setPokemon] = useState<IRow[]>([])
    const [isFilter, setIsFilter] = useState<IRow[]>([])


    const pokeFetch = async (i: number) => {
        const info = await axios.get<AxiosRequestConfig, AxiosResponse>(`pokemon/${i}`)
        const about = await  axios.get<AxiosResponse, AxiosResponse>(`evolution-chain/${i}`)
        const img = Object.keys(info.data.sprites.other).map(element => {
            return info.data.sprites.other[element].front_default
        })

        return {info, about, img}
    }
    const showPokemon = async (): Promise<void> => {
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
        setPokemon(copyArr)
        setIsFilter(copyArr)
    }

    useEffect(() => {
        showPokemon()

    }, [])

    const sortA = {
        name: () => {
            const copyPokemon = [...pokemon]
            copyPokemon.sort((a, b) => a.name.localeCompare(b.name))
            setPokemon(copyPokemon)
        },
        age: () => {
            const copyPokemon = [...pokemon]
            copyPokemon.sort((a, b) => (a.is_baby as unknown as number) - (b.is_baby as unknown as number))
            setPokemon(copyPokemon)
        },
        hp: () => {
            const copyPokemon = [...pokemon]
            copyPokemon.sort((a, b) => a.hp - b.hp)
            setPokemon(copyPokemon)
        },
        attack: () => {
            const copyPokemon = [...pokemon]
            copyPokemon.sort((a, b) => a.attack - b.attack)
            setPokemon(copyPokemon)
        },
        height: () => {
            const copyPokemon = [...pokemon]
            copyPokemon.sort((a, b) => a.height - b.height)
            setPokemon(copyPokemon)
        }

    }
    const sortB = {
        name: () => {
            const copyPokemon = [...pokemon]
            copyPokemon.sort((a, b) => b.name.localeCompare(a.name))
            setPokemon(copyPokemon)
        },
        age: () => {
            const copyPokemon = [...pokemon]
            copyPokemon.sort((a, b) => (b.is_baby as unknown as number) - (a.is_baby as unknown as number))
            setPokemon(copyPokemon)
        },
        hp: () => {
            const copyPokemon = [...pokemon]
            copyPokemon.sort((a, b) => b.hp - a.hp)
            setPokemon(copyPokemon)
        },
        attack: () => {
            const copyPokemon = [...pokemon]
            copyPokemon.sort((a, b) => b.attack - a.attack)
            setPokemon(copyPokemon)
        },
        height: () => {
            const copyPokemon = [...pokemon]
            copyPokemon.sort((a, b) => b.height - a.height)
            setPokemon(copyPokemon)
        }
    }
    const filter = {
        all:  () => {
            const copyPokemon = [...isFilter]
            setPokemon(copyPokemon)
        },
        is_baby: () => {
            const copyPokemon = [...isFilter]
            const is_baby = copyPokemon.filter(age => age.is_baby === true)
            setPokemon(is_baby)
        },
        adult: () => {
            const copyPokemon = [...isFilter]
            const adult = copyPokemon.filter(age => age.is_baby === false)
            setPokemon(adult)
        },
        minAttack: () => {
            const copyPokemon = [...isFilter]
            const copyFilt = [...pokemon]
            const minAttack = copyPokemon.filter(attack => attack.attack < 50)
            const minAttackFilt = copyFilt.filter(attack => attack.attack < 50)
            setPokemon(minAttack)
            setPokemon(minAttackFilt)
        },
        maxAttack: () => {
            const copyPokemon = [...isFilter]
            const copyFilt = [...pokemon]
            const maxAttack = copyPokemon.filter(attack => attack.attack > 100)
            const minAttackFilt = copyFilt.filter(attack => attack.attack > 100)
            setPokemon(maxAttack)
            setPokemon(minAttackFilt)
        },

    }
    return (
        <div className='tab'>
            <div className='filter'>
                <button onClick={() => filter.all()}>All</button>
                <button onClick={() => filter.is_baby()}>Baby</button>
                <button onClick={() => filter.adult()}>Adult</button>
                <button onClick={() => filter.minAttack()}>Min Attack</button>
                <button onClick={() => filter.maxAttack()}>Max Attack</button>
            </div>
            <div className='headTab'>
                <h3>Image</h3>
                <div className='sort'>
                    <h3>Name</h3>
                    <button onClick={() => sortA.name()}>↑</button>
                    <button onClick={() => sortB.name()}>↓</button>
                </div>
                <div className='sort'>
                    <h3>Age</h3>
                    <button onClick={() => sortA.age()}>↑</button>
                    <button onClick={() => sortB.age()}>↓</button>
                </div>
                <div className='sort'>
                    <h3>Health</h3>
                    <button onClick={() => sortA.hp()}>↑</button>
                    <button onClick={() => sortB.hp()}>↓</button>
                </div>
                <div className='sort'>
                    <h3>Attack</h3>
                    <button onClick={() => sortA.attack()}>↑</button>
                    <button onClick={() => sortB.attack()}>↓</button>
                </div>
                <div className='sort'>
                    <h3>Height</h3>
                    <button onClick={() => sortA.height()}>↑</button>
                    <button onClick={() => sortB.height()}>↓</button>
                </div>




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
