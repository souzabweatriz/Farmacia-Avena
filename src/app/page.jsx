"use client"
import styles from "./page.module.css"
import { useState, useEffect } from "react";

// Perguntas enfeite
const perguntasEnfeite = [
  { id: "horario", texto: "Que horário do dia você prefere tomar chá?", opcoes: ["Manhã", "Tarde", "Noite"] },
  { id: "temperatura", texto: "Você prefere chá quente ou gelado?", opcoes: ["Quente", "Gelado"] }
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
          <form onSubmit={handleSubmit} style={{maxWidth: 500, margin: "2rem auto", display: "flex", flexDirection: "column", gap: "2rem"}}>
            <div>
              <strong>Qual é o chá necessário?</strong>
              <div style={{display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "1rem"}}>
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
                <div style={{display: "flex", gap: "1rem", marginTop: "0.5rem"}}>
                  {perg.opcoes.map(op => (
                    <label key={op} style={{cursor: "pointer", padding: "0.5rem 1rem", border: enfeite[perg.id] === op ? "2px solid #4D8C63" : "1px solid #ccc", borderRadius: 10, background: enfeite[perg.id] === op ? "#e6f4ea" : "#fff"}}>
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
            <button type="submit" disabled={!categoria} style={{marginTop: "2rem", padding: "0.8rem 2rem", backgroundColor: categoria ? "#4D8C63" : "#ccc", color: "white", border: "none", borderRadius: "8px", fontSize: "1rem", cursor: categoria ? "pointer" : "not-allowed"}}>Ver chá recomendado</button>
          </form>
        )}
        {loading && <p>Buscando chá recomendado...</p>}
        {erro && <p style={{color: 'red'}}>{erro}</p>}
        {resultado && (
          <div style={{marginTop: '2rem', background: '#f6f6f6', padding: '1rem', borderRadius: '8px', textAlign: 'center'}}>
            <h3>Chá recomendado:</h3>
            <h4>{resultado.nome_remedio}</h4>
            {resultado.photo && <img src={resultado.photo} alt={resultado.nome_remedio} width="200" style={{borderRadius: 8}} />}
            <p><b>Efeito:</b> {resultado.efeito_remedio}</p>
            <p><b>Modo de preparo:</b> {resultado.modo_preparo}</p>
            <p><b>Contraindicações:</b> {resultado.contraindicacoes}</p>
            <button onClick={() => { setResultado(null); setCategoria(""); setEnfeite({}); }}>Escolher outro chá</button>
          </div>
        )}
      </div>
    </div>
  );
}