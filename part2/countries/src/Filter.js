const Filter = ({updateFilter}) => {
    return(
        <form>
            find countries <input onChange={updateFilter}/>
        </form>
    )
}

export default Filter