"use client"
import styles from "./page.module.css"
import { useState, useEffect } from "react";
import { Carousel } from 'antd';

// Perguntas enfeite
const perguntasEnfeite = [
  { id: "horario", texto: "Que horário do dia você prefere tomar chá?", opcoes: ["Manhã", "Tarde", "Noite"] },
  { id: "temperatura", texto: "Você prefere chá quente ou gelado?", opcoes: ["Quente", "Gelado"] },
  { id: "frequencia", texto: "Com que frequência você toma chá?", opcoes: ["Diariamente", "Semanalmente", "Ocasionalmente"] },
  { id: "sabor", texto: "Qual sabor de chá você prefere?", opcoes: ["Frutado", "Herbal", "Cítrico", "Doce"] },
  { id: "beneficio", texto: "Qual benefício você busca no chá?", opcoes: ["Relaxamento", "Energização", "Digestão", "Imunidade"] },
  { id: "ingredientes", texto: "Você tem alguma preferência por ingredientes específicos?", opcoes: ["Camomila", "Hortelã", "Gengibre", "Erva-doce", "Outro"] },
  { id: "açúcar", texto: "Você prefere chá com ou sem açúcar?", opcoes: ["Com açúcar", "Sem açúcar", "Com adoçante"] },
  { id: "cafeína", texto: "Você prefere chá com ou sem cafeína?", opcoes: ["Com cafeína", "Sem cafeína"] },
  { id: "quantidade", texto: "Quantas xícaras de chá você gostaria de tomar por dia?", opcoes: ["1-2", "3-4", "5 ou mais"] },
  { id: "ocasião", texto: "Em que ocasião você costuma tomar chá?", opcoes: ["Relaxar em casa", "No trabalho", "Com amigos/família", "Outro"] },
];

export default function Home() {
  const [categorias, setCategorias] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [enfeite, setEnfeite] = useState({});
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

 useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categorias`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setCategorias(data);
      } catch {
        setErro("Erro ao buscar categorias");
      }
    };
    fetchCategorias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro("");
    setResultado(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/remedios`);
      if (!res.ok) throw new Error("Erro ao buscar chás");
      const data = await res.json();
      const cha = data.find(r => r.categoria_id === Number(categoria));
      setResultado(cha || null);
    } catch (err) {
      setErro("Não foi possível buscar o chá recomendado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleEnfeite = (id, value) => {
    setEnfeite(prev => ({ ...prev, [id]: value }));
  };

  const carouselContentStyle = {
    margin: 0,
    height: '20rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    lineHeight: '200px',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #086047ff, #224040)',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Farmácia Avena 🌿</h1>
        <p>Sua saúde em primeiro lugar!</p>
      </div>
      <div className={styles.carouselContainer}>
        <Carousel 
          arrows 
          infinite={true} 
          autoplay 
          autoplaySpeed={4000}
          dotPosition="bottom"
        >
          <div>
            <h3 style={carouselContentStyle}>🌿 Remédios Naturais</h3>
          </div>
          <div>
            <h3 style={carouselContentStyle}>🍃 Chás Medicinais</h3>
          </div>
          <div>
            <h3 style={carouselContentStyle}>💚 Sua Saúde Natural</h3>
          </div>
          <div>
            <h3 style={carouselContentStyle}>🌱 Bem-estar Completo</h3>
          </div>
        </Carousel>
      </div>
    </div>
  );
}