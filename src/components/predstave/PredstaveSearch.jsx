import { useCallback, useState } from "react";
import { Form } from "react-bootstrap"

const PredstaveSearch = ({ predstave, zanrovi }) => {

    const [selectedValues, setSelectedValues] = useState([]);

    const handleZanroviChange = useCallback((e) => {
        const { id, checked } = e.target;
        const value = parseInt(id);
        setSelectedValues(prevSelectedValues =>
            checked
                ? [...prevSelectedValues, value]
                : prevSelectedValues.filter(selectedValue => selectedValue !== value)
        );
    });

    const filteredData = selectedValues.length === 0
        ? predstave
        : predstave.filter(predstava =>
            predstava.zanrovi.some(zanr => selectedValues.includes(zanr.zanrid))
        );

    return (
        <>
            <h3>Filter</h3>
            <Form name="zanrovi">
                <div key="default-zanrovi" id="zanrovi-checkboxgroup" className=" mb-3">
                    {zanrovi.map((zanr) => (
                        <>
                            <Form.Check inline type="checkbox" id={`${zanr.zanrid}`} label={`${zanr.naziv_zanra}`} onChange={handleZanroviChange} />
                        </>
                    ))}
                </div>
            </Form>

            {filteredData.map((predstava) => <p className="text-danger" key={predstava.predstavaid}>{predstava.naziv_predstave} - {predstava.zanrovi.map(z => z.naziv_zanra)}</p>)}

        </>
    )

}



export default PredstaveSearch;