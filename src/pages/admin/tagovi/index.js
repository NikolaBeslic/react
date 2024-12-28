import { useCallback, useEffect, useState } from "react";
import axiosClient from "../../../utils/axios";
import { Avatar, Button, Chip, InputLabel, NativeSelect } from "@mui/material";
import { slugify } from "../../../../lib/slugify";
import toast from "react-hot-toast";

export default function TagoviPage() {
    const [tagovi, setTagovi] = useState([]);
    const [sortBy, setSortBy] = useState(-1);

    const [text, setText] = useState("");
    const [chips, setChips] = useState([]);

    useEffect(() => {
        axiosClient
            .get("/admin/get-svi-tagovi")
            .then((res) => {
                console.log(res.data);
                setTagovi(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        handleSortTags(sortBy);
    }, [sortBy]);

    const handleDelete = () => {};

    const handleClick = () => {};

    function handlePressEnter(e) {
        // don't submit the form if the user presses 'Enter'
        if (e.key === "Enter") e.preventDefault();
        // return if the user pressed a key that is not 'Enter', or the user hasn't typed anything
        if (e.key !== "Enter" || !text) return;
        // need to show error if the user tries to add the same input more than once
        // if (chips.includes(text)) {
        //     return setValidationError(
        //         "Cannot add the same input more than once"
        //     );
        // }
        // adding the input value to chips array
        setChips((prevState) => [...prevState, e.target.value]);
        // clearing the input box
        setText("");
        // clearing error message
        //setValidationError("");
    }

    const saveTagsToDb = () => {
        const tagArr = new Array();
        chips.forEach((x) => {
            const tagObj = {
                tag_naziv: x,
                tag_slug: slugify(x),
            };
            tagArr.push(tagObj);
        });
        axiosClient
            .post("/admin/tagovi/store", tagArr)
            .then((res) => {
                if (res.status == 200) toast.success("Tagovi uspesno sacuvani");
            })
            .catch((err) => console.error(err));
    };

    const handleChangeSortSelect = useCallback((e) => {
        setSortBy(e.target.value);
    });

    const handleSortTags = (sortBy) => {
        let ts = tagovi;
        if (sortBy == 1) {
            ts = [...tagovi].sort(
                (a, b) => b.tekstovi_count - a.tekstovi_count
            );
        } else {
            ts = [...tagovi].sort((a, b) =>
                a.tag_naziv.localeCompare(b.tag_naziv)
            );
        }

        setTagovi(ts);
    };

    return (
        <>
            <h1>Tagovi</h1>
            <div className="row mb-3">
                <div className="col-lg-6">
                    <div>
                        <label htmlFor="tags">Tags</label>
                        <div className="input-container">
                            <ul className="chips">
                                {chips.map((chip) => (
                                    <Chip
                                        key={chip}
                                        label={chip}
                                        onClick={handleClick}
                                        onDelete={handleDelete}
                                        sx={{ mr: 2 }}
                                    />
                                ))}
                            </ul>
                            <input
                                type="text"
                                id="tags"
                                placeholder="Press Enter to add tag"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                onKeyDown={handlePressEnter}
                                className="form-control mb-2"
                            />
                        </div>
                        {/* {validationError && (
                            <p className="error-message">{validationError}</p>
                        )} */}
                    </div>

                    <Button onClick={saveTagsToDb} variant="contained">
                        Dodaj tagove
                    </Button>
                </div>
                <div className="col-lg-6">
                    <InputLabel id="select-label">
                        Sortiraj tagove po
                    </InputLabel>
                    <NativeSelect
                        // labelId="select-label"
                        name="sortTags"
                        onChange={handleChangeSortSelect}
                        sx={{ mb: 2 }}
                        variant="outlined"
                        fullWidth
                    >
                        <option key={0} value={0}>
                            Nazivu
                        </option>
                        <option key={1} value={1}>
                            Broju tekstova
                        </option>
                    </NativeSelect>
                </div>
            </div>
            <div className="admin-tagovi-all-wrapper">
                {tagovi.map((tag) => (
                    <Chip
                        key={tag.tagid}
                        label={tag.tag_naziv}
                        onClick={handleClick}
                        onDelete={handleDelete}
                        sx={{ mr: 2 }}
                        avatar={<Avatar>{tag.tekstovi_count}</Avatar>}
                    />
                ))}
            </div>
        </>
    );
}
