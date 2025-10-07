"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProductPage({ params }) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (params?.id) {
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}remedios/${id}`)
                .then(response => {
                    console.log("API response:", response.data);
                    setProduct(response.data);
                })
                .catch(error => {
                    console.error("Error fetching product:", error);
                    setProduct(null);
                })
                .finally(() => setLoading(false));
        }
    }, [params?.id]);

    if (loading) return <div>Loading...</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <div>
            <h2>{product.nome_remedio}</h2>
            <img src={product.photo} alt={product.nome_remedio} style={{ maxWidth: "300px", borderRadius: "8px" }} />
            <p><strong>Effect:</strong> {product.efeito_remedio}</p>
            <p><strong>Preparation method:</strong> {product.modo_preparo}</p>
            <p><strong>Contraindications:</strong> {product.contraindicacoes}</p>
        </div>
    );
}