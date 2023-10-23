import './searchBar.css'
import searchBarIcon from '../../assets/input-search-bg.png'

function SearchBar(){
    return(
        <div className="search-bar-container">
            <form className="search-bar">  
                <input className='search-container' type="text" id="search-input" placeholder="Name or Number"/>
                <button className="search-icon" id="search-button">
                    <img src={searchBarIcon} alt='magnifying-glass'/>
                </button>
            </form>
                <div className="text-box">Search for a Pokémon by <strong>name</strong> or using its <strong>National Pokédex number</strong>.</div>
        </div>
    )
}

export {SearchBar}