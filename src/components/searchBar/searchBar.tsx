import './searchBar.css'
import searchBarIcon from '../../assets/input-search-bg.png'

function SearchBar(){
    return(
        <div className="search-bar-container">
            <div className="search-bar">  
                <input type="text" id="search-input" placeholder="Name or Number"/>
                <button className="search-icon" id="search-button">
                    <img src={searchBarIcon} alt='lupa'/>
                </button>
            </div>
            <div className="text-box">zesxrdctfvyghbuj</div>
        </div>
    )
}

export {SearchBar}