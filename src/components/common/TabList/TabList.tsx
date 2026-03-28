import "./TabList.css"

type List = {
    key: string
    value: string
}

interface TabListProps {
    title: string
    list: List[]
}
function TabList({ title, list }: TabListProps) {
    return (
        <div className="tabList">
            <div className="tabList__title">
                <h1>{title}:</h1>
            </div>
            <div className="tabList__fake">{title}:</div>

            <div className="tabList__list">
                <div className="tabList__list__items">
                    <div className="tabList__list__items__box">
                        {list.map((value, index) => {
                            return <h2 key={index}>{value.key}</h2>
                        })}
                    </div>
                </div>
                <div className="tabList__list__values">
                    <div className="tabList__list__values__box">
                        {list.map((value, index) => {
                            return <h2 key={index}>:⠀{value.value}</h2>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TabList
