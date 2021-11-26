import HeaderElement from "./HeaderElement"

type HeaderProps = {
    headers: string[]
}

const Header = ({headers}: HeaderProps) => {
   
    return(
        <div className='table-header'>
            {headers.map((header, index) => {
                return <HeaderElement key={index} name={header}/>
            })}
        </div>
    )
}

export default Header