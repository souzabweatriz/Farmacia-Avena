"use client"
import styles from "./page.module.css"
import { useState, useEffect } from "react";

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

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Farmácia Avena 🌿</h1>
        <p>Sua saúde em primeiro lugar!</p>
      </div>
      <div className={styles.content}>
        {!resultado && (
          <form 
          onSubmit={handleSubmit} 
          className={styles.form}>
            <div>
              <p>O que você está sentindo?</p>
              <div className={styles.categorias}>
                {categorias.map(cat => (
                  <label key={cat.id} style={{cursor: "pointer", padding: "0.7rem 1.2rem", border: categoria == cat.id ? "2px solid #4D8C63" : "1px solid #ccc", borderRadius: 12, background: categoria == cat.id ? "#e6f4ea" : "#fff", fontWeight: 500}}>
                    <input
                      type="radio"
                      name="categoria"
                      value={cat.id}
                      checked={categoria == cat.id}
                      onChange={() => setCategoria(cat.id)}
                      style={{display: "none"}}
                    />
                    {cat.nome_categoria}
                  </label>
                ))}
              </div>
            </div>
            {perguntasEnfeite.map(perg => (
              <div key={perg.id}>
                <strong>{perg.texto}</strong>
                <div className={styles.enfeites}>
                  {perg.opcoes.map(op => (
                    <label key={op} className={styles.label + " " + (enfeite[perg.id] === op ? styles.enfeiteLabelSelecionada : "")}>
                      <input
                        type="radio"
                        name={perg.id}
                        value={op}
                        checked={enfeite[perg.id] === op}
                        onChange={() => handleEnfeite(perg.id, op)}
                        style={{display: "none"}}
                      />
                      {op}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button type="submit" disabled={!categoria} className={styles.submitButton}>Ver chá recomendado</button>
          </form>
        )}
        {loading && <p className={styles.loadingMessage}>Buscando chá recomendado...</p>}
        {erro && <p className={styles.errorMessage}>{erro}</p>}
        {resultado && (
          <div className={styles.resultadoBox}>
            <h3 className={styles.resultTitle}>Chá recomendado:</h3>
            <h4 className={styles.resultSubtitle}>{resultado.nome_remedio}</h4>
            {resultado.photo && (
              <img 
                src={resultado.photo} 
                alt={resultado.nome_remedio} 
                width="200" 
                className={styles.resultImage}
              />
            )}
            <p className={styles.resultText}><b>Efeito:</b> {resultado.efeito_remedio}</p>
            <p className={styles.resultText}><b>Modo de preparo:</b> {resultado.modo_preparo}</p>
            <p className={styles.resultText}><b>Contraindicações:</b> {resultado.contraindicacoes}</p>
            <button 
              className={styles.resetButton}
              onClick={() => { setResultado(null); setCategoria(""); setEnfeite({}); }}
            >
              Escolher outro chá
            </button>
          </div>
        )}
      </div>
    </div>
  );
}