type HeaderProps = {
    name: string
}

const HeaderElement = ({name}: HeaderProps) => {
    return(
        <div className="header-element">
            {name}
        </div>
    )
}
export default HeaderElement