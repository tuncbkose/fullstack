const Filter = ({updateFilter}) => {
    return(
        <form>
            filter shown with <input onChange={updateFilter}/>
        </form>
    )
}

export default Filter