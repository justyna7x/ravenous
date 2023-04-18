import React from "react";
import './SearchBar.css';
import Loader from "react-loaders";


class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            term:'',
            location:'',
            sortBy:'best_match',
            loading:false
            
        };
        this.sortByOptions = {
            'Best Match': 'best_match',
            'Highest Rated': 'rating',
            'Most Reviewed': 'review_count'
        }
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }
    handleSortByChange(sortByOption){
        this.setState({sortBy:sortByOption})

    }
    getSortByClass(sortByOption){
        if(this.state.sortBy===sortByOption){
            return 'active'
        }
        else{
            return''
        }

    }
    renderSortByOptions(){

        return Object.keys(this.sortByOptions).map(sortByOption=>{

                let sortByOptionValue = this.sortByOptions[sortByOption];
                return <li onClick = {this.handleSortByChange.bind(this, sortByOptionValue)} 
                            className ={this.getSortByClass(sortByOptionValue)} 
                            key={sortByOptionValue}> 
                            {sortByOption} 
                            </li>;
        });
    }
    handleTermChange(event){
        this.setState({term : event.target.value})

    }

    handleLocationChange(event){
        this.setState({location: event.target.value})
    }

    handleSearch(event){
        this.setState({loading:true})
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy)
        event.preventDefault()
        setTimeout(() => {
            this.setState({loading:false})
          }, "2000");
    }

    render(){


        return(<>
        
            <div className="SearchBar" style ={{filter: this.state.loading ? 'blur(2px)':'blur(0px)'}} >
                <div className="SearchBar-sort-options">
                    <ul>
                        {this.renderSortByOptions()}
                    </ul>
                </div>
                <div className="SearchBar-fields">
                    <input onChange = {this.handleTermChange}placeholder="Enter the category" />
                    <input onChange={this.handleLocationChange} placeholder="Where?" />
                </div>
                <div className="SearchBar-submit">
                    <a onClick={this.handleSearch}>Let's Go</a>
                
                </div>
                
            </div>
            {this.state.loading ? <Loader type="triangle-skew-spin"/> : <></>}
           </> 
        )
    }
}

export default SearchBar;