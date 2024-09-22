import '../../styles/Main.css';
import PrimiseList from './PrimiseList';
import axios from 'axios';
import { useState, useEffect } from 'react';
const accessToken = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");

function MainArea() {
    const [typesPremies, setTypesPremies] = useState([]);
    const [premises, setPremises] = useState([]);
    const [filteredPremises, setFilteredPremises] = useState([]);
    const [filters, setFilters] = useState({
        pool : false,
        billiards: false,
        furniture: false,
        repair: false,
        minArea: '',
        maxArea: '',
        minPrice: '',
        maxPrice: '',
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:3441/premise/all', {
                    headers: {
                        'Authorization': `${accessToken}; ${refreshToken}`
                    }
                });
                setPremises(response.data);
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            }

            try {
                const response = await axios.get('https://localhost:3441/type_premise/all', {
                    headers: {
                        'Authorization': `${accessToken}; ${refreshToken}`
                    }
                });
                setTypesPremies(response.data);
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            }
        };

        // Загрузка данных с сервера при монтировании компонента
        fetchData();
    }, []);

    const setAllPremises = async (e) => {
        try {
            const response = await axios.get('https://localhost:3441/premise/all', {
                headers: {
                    'Authorization': `${accessToken}; ${refreshToken}`
                }
            });
            setPremises(response.data);
            setFilters({
                pool : false,
                billiards: false,
                furniture: false,
                repair: false,
                minArea: '',
                maxArea: '',
                minPrice: '',
                maxPrice: '',
            })
            setFilteredPremises([]);
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
        }
    }

    const changeTypePremise = (id) => async (e) => {
        try {
            const response = await axios.get(`https://localhost:3441/premise/all?id=${id}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            setPremises(response.data);
            setFilters({
                pool : false,
                billiards: false,
                furniture: false,
                repair: false,
                minArea: '',
                maxArea: '',
                minPrice: '',
                maxPrice: '',
            })
            setFilteredPremises([]);
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
        }
    };

    const changeNumbersFilters = async (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => {
            const updatedFilters = {
                ...prevFilters,
                [name]: value,
            };

            let filteredPremises2 = !filters.repair && !filters.pool && !filters.billiards && !filters.furniture ? premises : filteredPremises

            if(updatedFilters.minArea !== '' )
            {
                setFilteredPremises(filteredPremises2.filter(premise => {
                    // Проверяем каждый объект premises
                    return premise.DescriptionCharacteristicRef.some(description => {
                        // Проверяем каждый объект DescriptionCharacteristicRef внутри premises
                        return description.Characteristic.Name === 'Площадь' && description.Description >= parseFloat(updatedFilters.minArea);
                    });
                }));
            }

            if(updatedFilters.maxArea !== '' )
            {
                setFilteredPremises(filteredPremises2.filter(premise => {
                    // Проверяем каждый объект premises
                    return premise.DescriptionCharacteristicRef.some(description => {
                        // Проверяем каждый объект DescriptionCharacteristicRef внутри premises
                        return description.Characteristic.Name === 'Площадь' && description.Description <= parseFloat(updatedFilters.maxArea);
                    });
                }));
            }

            if(updatedFilters.minPrice !== '' )
            {
                setFilteredPremises(filteredPremises2.filter(premise => {
                    return  parseFloat(premise.Price) >= parseFloat(updatedFilters.minPrice)
                }));
            }

            if(updatedFilters.maxPrice !== '' )
            {
                setFilteredPremises(filteredPremises2.filter(premise => {
                    return parseFloat(premise.Price) <= parseFloat(updatedFilters.maxPrice)
                }));
            }

            return updatedFilters; // Возвращаем обновленные фильтры из колбэка
        });
    };

    const changeFilters = (e) => {
        const { name, checked } = e.target;
        setFilters((prevFilters) => {
            const updatedFilters = {
                ...prevFilters,
                [name]: checked,
            };

            let filteredPremises = premises;
            
            if(updatedFilters.pool) {
                setFilteredPremises(filteredPremises.filter(premise => {
                    // Проверяем каждый объект premises
                    return premise.DescriptionCharacteristicRef.some(description => {
                        // Проверяем каждый объект DescriptionCharacteristicRef внутри premises
                        return description.Characteristic.Name === 'Бассейн';
                    });
                }));
            }

            if(updatedFilters.billiards) {
                setFilteredPremises(filteredPremises.filter(premise => {
                    // Проверяем каждый объект premises
                    return premise.DescriptionCharacteristicRef.some(description => {
                        // Проверяем каждый объект DescriptionCharacteristicRef внутри premises
                        return description.Characteristic.Name === 'Бильярд';
                    });
                }));
            }
            
            if(updatedFilters.furniture) {
                setFilteredPremises(filteredPremises.filter(premise => {
                    // Проверяем каждый объект premises
                    return premise.DescriptionCharacteristicRef.some(description => {
                        // Проверяем каждый объект DescriptionCharacteristicRef внутри premises
                        return description.Characteristic.Name === 'Мебель';
                    });
                }));
            }

            if(updatedFilters.repair) {
                setFilteredPremises(filteredPremises.filter(premise => {
                    // Проверяем каждый объект premises
                    return premise.DescriptionCharacteristicRef.some(description => {
                        // Проверяем каждый объект DescriptionCharacteristicRef внутри premises
                        return description.Characteristic.Name === 'Ремонт';
                    });
                }));
            }

            

            return updatedFilters; // Возвращаем обновленные фильтры из колбэка
        });
    };

	return (
	    <div className="mainArea">
            <div className="filters">
                <div className="typesPremies">
                    <button onClick={setAllPremises}><p>Все</p></button>
                    {typesPremies.map((typePremies) => (
                        <button onClick={changeTypePremise(typePremies.ID)}><p>{typePremies.Name}</p></button>
                    ))}
                </div>
                <form className="mainFilters">
                    <div className="filterElement">
                        <p>Цена аренды:</p>
                        <div className="inputFilter">
                            <input type="number" name="minPrice" placeholder="От" onChange={changeNumbersFilters}/>
                            <input type="number" name="maxPrice" placeholder="До" style={{marginLeft: '10px'}} onChange={changeNumbersFilters}/>
                        </div>
                    </div>
                    <div className="filterElement">
                        <p>Площадь помещения:</p>
                        <div className="inputFilter">
                            <input type="number" name="minArea" placeholder="От" onChange={changeNumbersFilters}/>
                            <input type="number" name="maxArea" placeholder="До" style={{marginLeft: '10px'}} onChange={changeNumbersFilters}/>
                        </div>
                    </div>
                    <div className="filterElement">
                        <div className="selectTypesPremiesElement">
                            <input type="checkbox" name="repair" checked={filters.repair} onChange={changeFilters}/>
                            <label for="no">Ремонт</label>
                        </div>
                        <div className="selectTypesPremiesElement">
                            <input type="checkbox" name="pool" checked={filters.pool} onChange={changeFilters}/>
                            <label for="no">Бассейн</label>
                        </div>
                        <div className="selectTypesPremiesElement">
                            <input type="checkbox" name="billiards" checked={filters.billiards} onChange={changeFilters}/>
                            <label for="no">Бильярд</label>
                        </div>
                        <div className="selectTypesPremiesElement">
                            <input type="checkbox" name="furniture" checked={filters.furniture} onChange={changeFilters}/>
                            <label for="no">Мебель</label>
                        </div>
                    </div>
                </form>
            </div>

            <PrimiseList premises={!filters.repair && !filters.pool && !filters.billiards && !filters.furniture && filters.maxArea === '' && filters.minArea === '' && filters.minPrice === '' && filters.maxPrice === '' ? premises : filteredPremises}/>
        </div>
  	);
}

export default MainArea;