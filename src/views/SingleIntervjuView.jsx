import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../utils/axios";

export default function SingleIntervjuView() {
    const { slug } = useParams();

    useEffect(() => {

        axiosClient
            .get(`intervju/${slug}`)
            .then(({ data }) => {

                setSurvey(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);
}