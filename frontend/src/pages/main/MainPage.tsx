import Table from "./Table"

const MainPage = () => {
    const DUMMY_DATA = [
        ['id', 'meno', 'priezvisko', 'skolenie1', 'skolenie2', 'VZV', 'bufetka'],
        ['1', 'Adam', 'Maly', '1.2.2020', '1.2.2020', 'AB', 'ano'],
        ['2', 'Anna', 'Dlha', '12.5.2021', '23.6.2019', 'A', 'nie'],
        ['3', 'Filip', 'Kovac', '', '12.5.2021', '', 'ano'],
        ['4', 'Jozef', 'Mrkva', '23.6.2019', '1.2.2020', 'ABCD', 'ano'],
    ]
    return(
        <div>
            This is main page
            <Table data={DUMMY_DATA}/>
        </div>
    )
}
export default MainPage